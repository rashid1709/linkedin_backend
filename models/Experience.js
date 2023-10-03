const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    startData:{
        type:Date,
        required:false
    },
    endData:{
        type:DataTransfer,
        required:false
    },
    description:{
        type:String,
        required:false
    }
});

const Experience = mongoose.model("Experience",ExperienceSchema);
module.exports = Experience;