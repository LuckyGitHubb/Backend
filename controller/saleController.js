const Sale = require('../model/saleModel');

const addSale = async(req,res)=>{
    try {
        const createSale = req.body;
        const saleData = await new Sale(createSale);
        await saleData.save();
        res.status(200).json({msg:'Sale is created successfully',saleData})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Internal Server Error',error})
    }
}

const allSale = async(req,res)=>{
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 3;
        const skip = (page - 1) * limit;
        const saleData = await Sale.find()
        .populate("productName")
        .populate("clientName")
        .skip(skip)
        .limit(limit)
        .sort({_id:-1});
        const totalSale = await Sale.countDocuments();
        const totalPage = Math.ceil(totalSale / limit);
        return res.status(200).json({msg:'All Sales fetched successfully',
            saleData,
            totalSale,
            totalPage})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Internal Server Error',error})
    }
}

const singleSale = async(req,res)=>{
    try {
        const { id } = req.query;
        if(!id){
            return res.status(400).json({msg:'please provide the id'})
        } 
        const saleData = await Sale.findById(id)
        .populate("productName")
        .populate("clientName")
        return res.status(200).json({msg:'Sale fetched succesfully',saleData});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Internal Server Error',error})
    }
}

const updateSale = async(req,res)=>{
    try {
        const { id,...updateSale } = req.body; 
        if(!id){
            return res.status(400).json({msg:'please provide the id'})
        }
        const saleData = await Sale.findByIdAndUpdate(id,{...updateSale})
        return res.status(200).json({msg:'Sale updated successfully',saleData})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Internal Server Error',error})
    }
}

const deleteSale = async (req,res) => {
    try {
        const { id } = req.body;
        if(!id){
            return res.status(400).json({msg:'please provide the id'})
        }
        const saleData = await Sale.findByIdAndDelete(id)
        return res.status(200).json({msg:'Sale deleted successfully',saleData})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Internal Server Error',error})
    }
}

const searchSale = async(req,res)=>{
    try {
        let search = '';
    if(req.query.search){
        search = req.query.search
    }
    const saleData = await Sale.find({
        $or:[
            {saleId: {$regex: '.*'  +search+ '*.',$options:'i'}},
            {price: {$regex: '.*'  +search+ '*.',$options:'i'}}
        ]
    })
    return res.status(200).json({msg:'Sale fetched successfully',saleData})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Internal Server Error',error})
    }
}
module.exports = {
    addSale,
    allSale,
    singleSale,
    updateSale,
    deleteSale,
    searchSale
}