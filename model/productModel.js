const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName:{type:String},
    pricePerUnit:{type:String},
    totalPrice:{type:String},
    stockQuantity:{type:String},
    units:{type:String},
    status:{type:String},
    purchaseDate:{type:String},
    description:{type:String}
})
const productModel = mongoose.model('product',productSchema)
module.exports = productModel;