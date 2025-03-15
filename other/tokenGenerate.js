const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const generateToken = async(user)=>{
   try {
    const token = await jwt.sign({user},process.env.SECRET_KEY,{expiresIn:'7d'})
    return token;
    }
    catch (error) {
    throw error;
   }
}

module.exports = generateToken