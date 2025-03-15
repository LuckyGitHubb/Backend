const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    projectName:{type:String},
    clientName:{type:mongoose.Schema.Types.ObjectId,ref:'client'},
    employee:{type:mongoose.Schema.Types.ObjectId,ref:'employee'},
    startDate:{type:String},
    endDate:{type:String}, 
    cost:{type:String},
    status:{type:String},
    description:{type:String},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})
const projectModel = mongoose.model('project',projectSchema);
module.exports = projectModel;