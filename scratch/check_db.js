const mongoose = require('mongoose');
const Campaign = require('./backend/models/campaign');

async function check() {
    await mongoose.connect('mongodb://localhost:27017/leadAutomation');
    const latest = await Campaign.findOne().sort({ createdAt: -1 });
    console.log('Latest Campaign:', JSON.stringify(latest, null, 2));
    await mongoose.disconnect();
}

check();
