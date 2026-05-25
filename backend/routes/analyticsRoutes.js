const express = require('express');
const router = express.Router();
const Log = require('../models/log');
const Lead = require('../models/lead');

router.get('/:id/analytics', async (req, res) => {
    try {
        const campaignId = req.params.id;
        
        // Find all leads for this campaign
        const leads = await Lead.find({ campaignId }, '_id');
        const leadIds = leads.map(l => l._id);

        // Aggregate logs for these leads
        const stats = await Log.aggregate([
            { $match: { leadId: { $in: leadIds } } },
            { $group: { _id: "$event", count: { $sum: 1 } } }
        ]);

        const result = {
            sent: 0,
            opened: 0,
            clicked: 0,
            replied: 0,
            bounced: 0,
            failed: 0
        };

        stats.forEach(stat => {
            if (result.hasOwnProperty(stat._id)) {
                result[stat._id] = stat.count;
            }
        });

        res.json({ success: true, analytics: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
