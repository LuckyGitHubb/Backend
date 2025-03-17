const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/routes');
const PORT = 3000;
const connection = require('./databaseConnection/dbConnect')
const cors = require('cors');
const authMiddleware = require('./other/authentication')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/',router)

// app.post('/test', authMiddleware, (req, res) => {
//     res.status(200).json({ message: 'Middleware passed, request body received.', body: req.body });
// });

app.listen(PORT, async()=>{ 
    await connection
    try {
        console.log('mongodb is connected');
    } catch (error) {
      console.log(error);  
    } 
})
console.log(`Server is running at Port No: ${PORT}`)
