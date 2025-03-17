const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/routes');
 const dotenv = require("dotenv")
 
 const connection = require('./databaseConnection/dbConnect')
const cors = require('cors');
const authMiddleware = require('./other/authentication')
 
dotenv.config()
PORT = process.env.PORT || 2000


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/',router)

// app.post('/test', authMiddleware, (req, res) => {
//     res.status(200).json({ message: 'Middleware passed, request body received.', body: req.body });
// });

app.listen(PORT , async (req,res)=>{
    try {
        await connection
        console.log("MongoDB is connected.")
    } catch (error) {
         console.log(error)
    }
    console.log(`Server is running on PORT : ${PORT}`)
})
 