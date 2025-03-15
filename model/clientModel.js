const mongoose = require('mongoose');
const clientSchema = new mongoose.Schema({
  clientName:{type:String},
  clientEmail:{type:String},
  address:{type:String},
  phone:{type:String}, 
  status:{type:String},
  description:{type:String},
  date:{type:String},
  company:{type:String},  
},{
    timestamps:true,
})
const clientModel = mongoose.model('client',clientSchema);
module.exports = clientModel;