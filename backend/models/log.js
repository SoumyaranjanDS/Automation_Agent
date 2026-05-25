const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    leadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead',
        required: true
    },
    emailId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Email'
    },
    event: {
        type: String,
        enum: ['sent', 'opened', 'clicked', 'replied', 'bounced', 'failed'],
        required: true
    },
    metadata: {
        type: Object
    }
}, { timestamps: true });

// Create TTL index for 90-day retention
logSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 });

module.exports = mongoose.model('Log', logSchema);
