const Lead = require('../models/lead');
const axios = require('axios');

/**
 * Parse AI response into subject and body.
 * Supports:
 * 1. { subject: "...", body: "..." }
 * 2. { content: "[SUBJECT] ... [BODY] ..." }
 * 3. { response: "[SUBJECT] ... [BODY] ..." }
 * 4. Plain text response
 */
const parseAIEmail = (aiResponse) => {
    let text = "";

    // Case 1: AI already returns clean subject and body
    if (aiResponse?.subject && aiResponse?.body) {
        return {
            subject: String(aiResponse.subject).trim(),
            body: String(aiResponse.body).trim()
        };
    }

    // Case 2: AI response is plain string
    if (typeof aiResponse === "string") {
        text = aiResponse;
    }

    // Case 3: Common response keys from AI APIs
    else if (aiResponse?.content) {
        text = aiResponse.content;
    } else if (aiResponse?.response) {
        text = aiResponse.response;
    } else if (aiResponse?.message) {
        text = aiResponse.message;
    } else if (aiResponse?.output) {
        text = aiResponse.output;
    } else if (aiResponse?.data) {
        text = aiResponse.data;
    } else {
        text = JSON.stringify(aiResponse);
    }

    text = String(text || "").trim();

    // Extract [SUBJECT] and [BODY]
    const subjectMatch = text.match(/\[SUBJECT\]\s*(.*?)(?=\n\s*\[BODY\]|\[BODY\]|$)/is);
    const bodyMatch = text.match(/\[BODY\]\s*([\s\S]*)/i);

    const subject = subjectMatch
        ? subjectMatch[1].trim()
        : "No Subject";

    const body = bodyMatch
        ? bodyMatch[1].trim()
        : text || "No Content Generated";

    return {
        subject,
        body
    };
};

/**
 * Service to handle batched AI email generation.
 */
const generateBatch = async (campaignId) => {
    try {

        const pendingLeads = await Lead.find({
            campaignId,
            $or: [
                { generatedEmail: { $exists: false } },
                { "generatedEmail.body": { $exists: false } },
                { "generatedEmail.body": "" },
                { "generatedEmail.subject": { $exists: false } },
                { "generatedEmail.subject": "" }
            ]
        }).limit(100);


        if (pendingLeads.length === 0) {
            return [];
        }

        const results = [];

        for (const lead of pendingLeads) {
            try {

                const response = await axios.post(
                    "http://localhost:8001/api/agents/generate",
                    {
                        niche: lead.niche || "other",

                        // Supports both old and new field names
                        description:
                            lead.info ||
                            lead.personalizationDescription ||
                            "N/A",

                        instruction:
                            lead.goal ||
                            lead.personalizationInstruction ||
                            "Generate a professional outreach email.",

                        lead_name: lead.name || "there",
                        email: lead.email || ""
                    },
                    {
                        timeout: 120000
                    }
                );


                // 2. Parse the AI response
                const parsedEmail = parseAIEmail(response.data);

                // Check if we actually got content, regardless of format warnings
                if (!parsedEmail.body || parsedEmail.body === "No Content Generated") {
                    if (response.data?.error) {
                        console.error(`AI returned a critical error for ${lead.name}:`, response.data.error);
                        results.push({
                            id: lead._id,
                            name: lead.name,
                            success: false,
                            error: response.data.error
                        });
                        continue;
                    }
                }

                // If we have content, save it!
                lead.generatedEmail = {
                    subject: parsedEmail.subject || "No Subject",
                    body: parsedEmail.body || "No Content Generated"
                };

                // Mark lead as active/ready
                if (!lead.status) {
                    lead.status = "active";
                }

                await lead.save();

                results.push({
                    id: lead._id,
                    name: lead.name,
                    success: true,
                    generatedEmail: lead.generatedEmail,
                    warning: response.data?.error // Keep the warning info if any
                });

            } catch (err) {
                console.error(
                    `Axios Error for lead ${lead._id}:`,
                    err.response?.data || err.message
                );

                results.push({
                    id: lead._id,
                    name: lead.name,
                    success: false,
                    error: err.response?.data?.message || err.message
                });
            }
        }

        return results;

    } catch (err) {
        console.error("Batch generation failed:", err.message);
        throw err;
    }
};

module.exports = {
    generateBatch
};