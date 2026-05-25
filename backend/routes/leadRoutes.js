const express = require('express');
const router = express.Router();
const Lead = require('../models/lead');
const Email = require('../models/email');

// Get single lead with generated email
router.get('/:id', async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ error: "Lead not found" });
        const email = await Email.findOne({ leadId: lead._id }).sort({ createdAt: -1 });
        res.json({ lead, email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Approve email
router.post('/:id/approve', async (req, res) => {
    try {
        const email = await Email.findOneAndUpdate(
            { leadId: req.params.id },
            { approved: true },
            { sort: { createdAt: -1 }, new: true }
        );
        if (!email) return res.status(404).json({ error: "Email not found for this lead" });
        res.json({ success: true, email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Reject email (and conceptually trigger regeneration)
router.post('/:id/reject', async (req, res) => {
    try {
        const email = await Email.findOneAndUpdate(
            { leadId: req.params.id },
            { approved: false },
            { sort: { createdAt: -1 }, new: true }
        );
        res.json({ success: true, message: "Email rejected. Re-generation requested.", email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
