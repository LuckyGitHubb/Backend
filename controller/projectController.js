const project = require('../model/projectModel');

// Add a Project
const addProject = async(req,res)=>{
    try {
        const prjData = req.body;
        const projectData = await new project(prjData);
        await projectData.save();
        return res.status(200).json({msg:'project created successfully',projectData});  
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Internal server error',error});
    }
}

// Get All Project
const allProject = async(req,res)=>{
    try {
        let page = Number(req.query.page || 1);
        let limit = Number(req.query.limit || 3);
        let skip = (page-1) * limit;
        const getAllProject = await project.find()
        .populate("employee")
        .populate("clientName")
        .skip(skip)
        .limit(limit)
        .sort({_id:-1})
        const totalProject = await project.countDocuments();
        const totalPage = Math.ceil(totalProject / limit)
        return res.status(200).json({
            msg:'All Project Fetched Successfully',
            getAllProject,
            totalPage,
            totalProject
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Internal Server Error'});
    }
}

// Get a Single Project By Id
const singleProject = async(req,res)=>{
    try {
        const { id } = req.query;
        const getSingleProject = await project.findById(id)        
        .populate("employee")
        .populate("clientName")
        if(!id){
            return res.status(400).json({msg:'please provide the id'})
        }
        return res.status(200).json({msg:'project fetched successfully',getSingleProject});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Internal Server Error'});
    }
}

// Update The Project By Id
const updateProject = async(req,res)=>{ 
    try {
        const { id,...updatedProject} = req.body;
        if(!id){
            return res.status(400).json({msg:'please provide the id'})
        }
        const Project = await project.findByIdAndUpdate(id,{...updatedProject});
        return res.status(200).json({msg:'Project successfully updated',Project})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Internal server error'},error);
    }
}

// Delete The Project By Id
const deleteProject = async(req,res)=>{
    try {
        const { id } = req.body
        if(!id){
            return res.status(400).json({msg:'please provide the id'})
        }
        const deletedProject = await project.findByIdAndDelete(id);
        return res.status(200).json({msg:'Project deleted successfully',deletedProject})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Internal server error'},error);
    }
}

// Search The Project
const searchProject = async(req,res)=>{
    try {
        let search = '';
    if(req.query.search){
        search = req.query.search
    }
    const searchedProject = await project.find({
        $or:[
            {projectName: {$regex:'.*'+search+'.*',$options:'i'}},
            {status: {$regex:'.*'+search+'.*',$options:'i'}}, 
        ]
    })
    .populate("clientName")
    .populate("employee")
    if(!searchedProject){
        return res.status(400).json({msg:'Project not found'})
    } 
    return res.status(200).json({msg:'Project fetched successfully',searchedProject})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Internal server error',error})
    }
}

module.exports = {
    addProject, 
    allProject,
    singleProject,
    updateProject,
    deleteProject,
    searchProject
}