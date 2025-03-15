const product = require('../model/productModel');

// Add a Product
const addProduct = async(req,res)=>{
    try {
        const productData = req.body;
        const Product = await new product(productData);
        await Product.save();
        return res.status(200).json({msg:'Product added successfully',Product})
    } catch (error) {
        return res.status(400).json({msg:'Internal server error',error})
    }
}

// Get All Product
const allProduct = async(req,res)=>{ 
    try {
        let page = Number(req.query.page);
        let limit = Number(req.query.limit);
        let skip = (page - 1) * limit;
        const Product = await product.find()
        .skip(skip)
        .limit(limit)
        .sort({_id:-1})
        const totalProduct = await product.countDocuments();
        const totalPage = Math.ceil( totalProduct / limit );
        return res.status(200).json({
            msg:'All Product fetched successfully',
            Product,
            totalProduct,
            totalPage
        })
    } catch (error) {
        return res.status(400).json({msg:'Internal server error',error})
    }
}

// Get a Single Product By Id
const singleProduct = async(req,res)=>{
    try {
        const { id } = req.query
        if(!id){
            return res.status(400).json({msg:'please provide the id'})
        }
        const Product = await product.findById(id)
        return res.status(200).json({msg:'Product fetched successfully',Product})
    } catch (error) {
        return res.status(400).json({msg:'Internal server error',error})
    }
}

// Update The Product By Id
const updateProduct = async(req,res)=>{
    try {
        const { id , ...productData } = req.body
        if(!id){
            return res.status(400).json({msg:'please provide the id'})
        }
        const Product = await product.findByIdAndUpdate(id,
            { $set: productData },  // Use `$set` to update fields properly
            { new: true, runValidators: true }  // Ensure updated doc is returned
        )
        return res.status(200).json({msg:'Product updated successfully',Product})
    } catch (error) {
        return res.status(400).json({msg:'Internal server error',error})
    }
}

// Delete The Product By Id
const deleteProduct = async(req,res)=>{
    try {
        const { id } = req.body
        if(!id){
            return res.status(400).json({msg:'please provide the id'})
        }
        const Product = await product.findByIdAndDelete(id)
        return res.status(200).json({msg:'Product fetched successfully',Product})
    } catch (error) {
        return res.status(400).json({msg:'Internal server error',error})
    }
}

const searchProduct = async(req,res)=>{
    try{
    let search = req.query.search;
    // if(search){
    //     search = req.query.search
    // }
    const searchedProduct = await product.find({
        $or:[
            {productName:{$regex:'.*'+search+'.*',$options:'i'}},
            {totalPrice:{$regex:'.*'+search+'.*',$options:'i'}}
        ]
    })
    if(!searchedProduct){
        return res.status(400).json({msg:'Product not found'})
    } 
    return res.status(200).json({msg:'Product fetched successfully',searchedProduct})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Internal server error',error})
    }
}

module.exports = {
    addProduct,
    allProduct,
    singleProduct,
    updateProduct,
    deleteProduct,
    searchProduct
}