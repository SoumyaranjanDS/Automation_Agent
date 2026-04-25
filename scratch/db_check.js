const mongoose = require('mongoose');
const Lead = require('../backend/models/lead');
const Campaign = require('../backend/models/campaign');

async function checkDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/AutomationAgent');
        console.log("Connected to DB");

        const totalLeads = await Lead.countDocuments();
        console.log(`Total Leads in DB: ${totalLeads}`);

        const sampleLeads = await Lead.find().limit(5);
        console.log("Sample Leads Campaign IDs:");
        sampleLeads.forEach(l => console.log(`- Lead: ${l.name}, CampaignId: ${l.campaignId}`));

        const campaigns = await Campaign.find().select('name');
        console.log("Existing Campaigns:");
        campaigns.forEach(c => console.log(`- ${c.name} (ID: ${c._id})`));

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkDB();
