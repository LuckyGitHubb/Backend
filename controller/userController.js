const user = require('../model/userModel');
const employee = require('../model/employee')
const bcrypt = require('bcryptjs');
const generateToken = require('../other/tokenGenerate');

const dotenv = require('dotenv')
dotenv.config();

const generateNewUserData = async (req, res) => {
    const { name, email, password, mobile, role } = req.body;
    if (!name || !email || !password || !mobile) {
        res.send('please fill the required fields')
    }
    else {
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            let User = await user.create({
                name,
                email,
                password: hashPassword,
                mobile,
                role
            })
            res.status(200).json({
                message:'user created sucessfully',
                User
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({error:'Error connecting to the server'})
        }
    }
}

const loginUser = async(req,res)=>{
    const { email,password,role } = req.body
    let User = await user.findOne({ email })
    if(!User){
        res.send('something went wrong')
    }
    const passwordMatch = await bcrypt.compare(password , User.password)
    try {
        if(!passwordMatch){
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if(role && User.role !== role){
            return res.status(404).json({message: 'Unauthorized role'})
        }
            const token = await generateToken(User)
           return res.json({token,msg:'Login Sucessfully completed'})
        } catch (error) {
            res.status(500).json({ message: 'Error generating token', error: tokenError });
        }
}

// Add Employee API //
// const addEmployee = async (req, res) => {
//     try {
//       let Employee = req.body;
//       let employeeData = new employee({Employee});
  
//       await employeeData.save();
//       res.status(200).json({
//         msg: 'Employee created successfully',
//         employeeData
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(400).json({
//         message: 'Internal Server Error: ',
//         error: error.message || 'Unknown error occurred'
//       });
//     }
//   };
  

const addEmployee = async(req,res)=>{
    try {
        let {name,email,mobile,city,experience,age,department,gender} = req.body;
        let employeeData = await employee.create({
            name,
            email,
            mobile,
            city,
            experience,
            age,
            department,
            gender
        })
        await employeeData.save();
        console.log(employeeData)
        return res.status(200).json({
        msg:'employee created sucessfully',
        employeeData
    })
    } catch (error) {
        return res.status(400).json({message:"Internal Server Error: ",error})
    }
}

// Get All Employee //
const allEmployee = async(req,res)=>{
    try {
        let page = Number(req.query.page);
        let limit = Number(req.query.limit);
        let skip = (page-1)*limit
        let getAllEmployee = await employee.find()
        .skip(skip)
        .limit(limit)
        .sort({_id:-1});
        const totalEmployee = await employee.countDocuments();
        const totalPage = Math.ceil(totalEmployee / limit)
        res.status(200).json({msg:'Fetching all Employees',
            getAllEmployee,
            totalEmployee,
            totalPage
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Internal server error'});
    }
}

// Get Employee By Id //
const singleEmployee = async(req,res)=>{
    try {
        const { id } = req.query 
        const Employee = await employee.findById(id);
        if(!Employee){
            return res.status(400).json({msg:"All fields required"})
        }
        return res.status(200).json({msg:"employee fetched successfully",Employee})
    } catch (error) {
       return res.status(400).json({msg:"Could not fetched employee ",error})
    }
}

const updateEmployee = async(req,res)=>{
    try {
        const { id,...updateData } = req.body;
    const employeeUpdatedData = await employee.findByIdAndUpdate(id,{...updateData});
    if(!employeeUpdatedData){
        return res.status(400).json({msg:"Data is not Updated"});
    }
    
    return res.status(200).json({
        msg:"Employee Updated Successfully",
        employeeUpdatedData
    })
    } catch (error) {
        console.error("Error occurs: ",error.message)
        return res.status(400).json({msg:"Employee Data is not Updated",error})
    }
}

const deleteEmployee = async(req,res)=>{
try {
    const { id } = req.body;
    const deleteEmp = await employee.findByIdAndDelete(id)
    console.log('this is my delete employee: ',deleteEmp);
    if(!deleteEmp){
        return res.status(400).json({msg:"Employee not found"})
    }
    return res.status(200).json({msg:"Employee deleted successfully",deleteEmp})
} catch (error) {
    console.error("Error occurs: ",error.message)
    return res.status(400).json({msg:"Employee Data is not Deleted",error})
}
}

const searchEmployee = async(req,res)=>{
try {
    var search = '';
    if(req.query.search){
        search = req.query.search;
    }
    const searchForEmployee = await employee.find({
        $or:[
            {name: {$regex:'.*'+search+'.*',$options:'i'}},
            {email: {$regex:'.*'+search+'.*',$options:'i'}},
            {age: {$regex:'.*'+search+'.*',$options:'i'}}
        ]
    })
    if(!searchForEmployee || searchForEmployee.length === 0){
        return res.status(400).json({msg:'Please fill the field'})
    }
    console.log('This is my searched Employee',searchForEmployee)
    return res.status(200).json({msg:'Employee Found',searchForEmployee});
} catch (error) {
    console.log('Internal server error',error);
    res.status(500).json({msg:"Internal server error",error})
}
}

module.exports = {
    generateNewUserData,
    loginUser,
    addEmployee,
    allEmployee,
    singleEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployee
}

