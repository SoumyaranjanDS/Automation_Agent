const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    leadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead',
        required: true,
        index: true
    },
    subject: {
        type: String,
        required: true
    },
    bodyHtml: {
        type: String,
        required: true
    },
    bodyText: {
        type: String
    },
    score: {
        type: Number,
        min: 0,
        max: 100
    },
    approved: {
        type: Boolean,
        default: false
    },
    sentAt: {
        type: Date
    },
    openedAt: {
        type: Date
    },
    repliedAt: {
        type: Date
    },
    iteration: {
        type: Number,
        default: 1
    }
}, { timestamps: true });

module.exports = mongoose.model('Email', emailSchema);
