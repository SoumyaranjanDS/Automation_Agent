const mongoose = require("mongoose")

const campaignSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ['active', 'inactive']
    },
    emails : {
        type : []
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    strategy: {
        type: Object,
        default: null
    }
    
}, { timestamps: true})

module.exports = mongoose.model('Campaign', campaignSchema);