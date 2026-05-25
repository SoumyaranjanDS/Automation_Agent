const express = require('express');
const router = express.Router();
const Log = require('../models/log');

// Inbound n8n delivery events
router.post('/n8n', async (req, res) => {
    try {
        // Event data expected from n8n webhook
        const { event, leadId, emailId, metadata } = req.body;
        
        if (!event || !leadId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const log = new Log({
            leadId,
            emailId,
            event,
            metadata
        });
        await log.save();

        res.json({ success: true, logId: log._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
