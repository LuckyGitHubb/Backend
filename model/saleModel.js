const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    saleId:{type:String},
    productName:{type: mongoose.Schema.Types.ObjectId,ref:"product"},
    clientName:{type: mongoose.Schema.Types.ObjectId,ref:"client"},
    price:{type:String},
    quantity:{type:String},
    discountInPerc:{type:String},
    discountInRupee:{type:String},
    totalAmount:{type:String},
    tax:{type:String},
    grandTotal:{type:String}
})

const saleModel = mongoose.model('sale',saleSchema);
module.exports = saleModel;