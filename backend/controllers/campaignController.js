const Campaign = require("../models/campaign");
const Lead = require("../models/lead");
const Papa = require("papaparse");
const fs = require("fs");
const { processLeads } = require("../utils/leadService");

const createCampaign = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCampaign = await Campaign.create({
            name,
            description,
            owner: req.user.id,
            status: 'inactive'
        });

        // Trigger AI Campaign Planning (Phase 3)
        try {
            const axios = require('axios');
            const aiResponse = await axios.post('http://localhost:8001/api/agents/plan', {
                name: newCampaign.name,
                description: newCampaign.description
            });

            // Save the AI-generated strategy to the database
            newCampaign.strategy = aiResponse.data;
            await newCampaign.save();
        } catch (aiError) {
            console.error("AI Planning failed, but campaign was created:", aiError.message);
        }

        res.status(201).json(newCampaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({ owner: req.user.id });
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findOne({ _id: req.params.id, owner: req.user.id });
        if (!campaign) return res.status(404).json({ message: "Campaign not found" });
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
        if (!campaign) return res.status(404).json({ message: "Campaign not found" });

        // Also delete associated leads
        await Lead.deleteMany({ campaignId: req.params.id });

        res.status(200).json({ message: "Campaign and associated leads deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const uploadCSVPreview = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const filePath = req.file.path;
        const fileContent = fs.readFileSync(filePath, "utf8");

        Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true,
            preview: 5,
            complete: (results) => {
                // Delete the file after parsing preview to keep uploads/ clean
                fs.unlinkSync(filePath);

                res.status(200).json({
                    headers: results.meta.fields,
                    previewData: results.data
                });
            },
            error: (error) => {
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                res.status(500).json({ message: "Error parsing CSV" });
            }
        });
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(500).json({ message: error.message });
    }
};

const confirmCSVUpload = async (req, res) => {
    let filePath = "";
    try {
        const { id } = req.params;
        const { mapping } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "No CSV file provided" });
        }

        filePath = req.file.path;
        const parsedMapping = typeof mapping === 'string' ? JSON.parse(mapping) : mapping;

        const campaign = await Campaign.findOne({ _id: id, owner: req.user.id });
        if (!campaign) {
            fs.unlinkSync(filePath);
            return res.status(404).json({ message: "Campaign not found" });
        }

        const fileContent = fs.readFileSync(filePath, "utf8");

        Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                try {
                    const { leads, errors } = processLeads(results.data, parsedMapping, id);

                    // Deduplicate against existing leads in the database for this campaign
                    const existingLeads = await Lead.find({ campaignId: id }).select('email');

                    const existingEmails = new Set(existingLeads.map(l => l.email));
                    const uniqueLeads = leads.filter(lead => !existingEmails.has(lead.email));
                    const duplicatesInDB = leads.length - uniqueLeads.length;

                    if (uniqueLeads.length > 0) {
                        const savedLeads = await Lead.insertMany(uniqueLeads, { ordered: false });

                        // Update campaign emails array
                        const newEmails = uniqueLeads.map(l => l.email);
                        await Campaign.findByIdAndUpdate(id, {
                            $addToSet: { emails: { $each: newEmails } }
                        });
                    }

                    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

                    res.status(200).json({
                        totalProcessed: results.data.length,
                        successfullyImported: uniqueLeads.length,
                        duplicatesSkipped: duplicatesInDB,
                        errorsFound: errors.length,
                        errorDetails: errors.slice(0, 10)
                    });
                } catch (innerError) {
                    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                    res.status(500).json({ message: innerError.message });
                }
            },
            error: (error) => {
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                res.status(500).json({ message: "Error parsing CSV" });
            }
        });
    } catch (error) {
        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
        res.status(500).json({ message: error.message });
    }
};

async function getLeadById(req, res) {
    try {
        const { leadId } = req.params;
        const lead = await Lead.findById(leadId);
        if (!lead) return res.status(404).json({ message: "Lead not found" });
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getCampaignLeads(req, res) {
    try {
        const { id } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const campaign = await Campaign.findOne({ _id: id, owner: req.user.id });
        if (!campaign) return res.status(404).json({ message: "Campaign not found" });

        const leads = await Lead.find({ campaignId: id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Lead.countDocuments({ campaignId: id });

        res.status(200).json({
            leads,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const { generateBatch } = require("../utils/generationService");

const startGeneration = async (req, res) => {
    try {
        const { id } = req.params;
        const results = await generateBatch(id);
        res.json({ success: true, results });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createCampaign,
    getCampaigns,
    getCampaignById,
    deleteCampaign,
    uploadCSVPreview,
    confirmCSVUpload,
    getCampaignLeads,
    getLeadById,
    startGeneration
};