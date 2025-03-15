const client = require('../model/clientModel');

const addClient = async (req, res) => {
    try {
        const createClient = req.body;
        const clientData = await new client(createClient);
        await clientData.save();
       
        return res.status(200).json({ msg: 'Client created successfully', clientData })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Internal server error', error }) 
    }
}
const allClient = async (req, res) => { 
    try {
        let page = Number(req.query.page)
        let limit = Number(req.query.limit)
        let skip = (page-1) * limit
        const clientData = await client.find()
        .skip(skip)
        .limit(limit)
        .sort({_id:-1})
        const totalClient = await client.countDocuments();
        const totalPage = Math.ceil(totalClient / limit);
        return res.status(200).json({ msg: 'All Client fetched successfully', 
            clientData,
            totalClient,
            totalPage  
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Internal server error', error })
    }
}
const singleClient = async (req, res) => {
    try {
        const { id } = req.query;
        if(!id){
            return res.status(400).json({ msg: 'Id is required'}) 
        }
        const clientData = await client.findById(id);
        return res.status(200).json({ msg: 'Client fetched successfully', clientData })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Internal server error', error })
    }
}
const updateClient = async (req, res) => {
    try {
        const { id,...updatedClient } = req.body;
        if(!id){
            return res.status(400).json({ msg: 'Id is required'}) 
        }
        const clientData = await client.findByIdAndUpdate(id, 
            { $set: updatedClient },  // Use `$set` to update fields properly
            { new: true, runValidators: true }  // Ensure updated doc is returned
        )
        console.log('client updated data: ',clientData);
        return res.status(200).json({ msg: 'Client updated successfully', clientData })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Internal server error', error })
    }
}

const deleteClient = async (req, res) => {
    try {
        const { id } = req.body;
        if(!id){
            return res.status(400).json({ msg: 'Id is required'}) 
        }
        const clientData = await client.findByIdAndDelete(id)
        return res.status(200).json({ msg: 'Client deleted successfully', clientData })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Internal server error', error })
    }
}

const searchClient = async (req, res) => { 
    try {
        let search = '';
        if(req.query.search){
            search = req.query.search;
        }
        const clientData = await client.find({
            $or:[
                {clientName: {$regex:'.*'+search+'.*',$options:'i'}},
                {clientEmail: {$regex:'.*'+search+'.*',$options:'i'}}
            ]
        });
        return res.status(200).json({ msg: 'Client fetched successfully', clientData })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Internal server error', error })
    }
}

module.exports = {
    addClient,
    allClient,
    singleClient,
    updateClient,
    deleteClient,
    searchClient
}

 