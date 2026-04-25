const mongoose = require("mongoose")

const leadSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : false
    },
    campaignId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Campaign'
    },
    status : {
        type : String,
        enum : ['active', 'inactive'],
        default : 'active'
    },
    niche: {
        type: String,
        enum: ['real_estate', 'investment_banker', 'financial_advisor', 'other'],
        default: 'other'
    },
    personalizationDescription: String,
    personalizationInstruction: String,
    generatedEmail: {
        subject: String,
        body: String
    }
    
}, { timestamps: true})

module.exports = mongoose.model('Lead', leadSchema);