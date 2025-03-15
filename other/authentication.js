const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config() 

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
       return res.status(400).json({msg:'Authorization Header is missing'})
    }
    const token  = authHeader.split(' ')[1]
    jwt.verify(token,process.env.SECRET_KEY,(err,token)=>{
        if(err){
            return res.status(400).json({msg:'Invalid or Token is missing'})
        }
        else{
            req.user = token;
        }
        next();
    })
}
module.exports=authMiddleware

// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();

// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     // Check if Authorization header exists and is properly formatted
//     if (!authHeader || !authHeader.startsWith('Bearer')) {
//         return res.status(401).json({ msg: 'Authorization header is missing or invalid' });
//     }

//     // Extract token from the header
//     const token = authHeader.split(' ')[1];

//     // Verify the token
//     jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//         if (err) {
//             if (err.name === 'TokenExpiredError') {
//                 return res.status(401).json({ msg: 'Token has expired', expiredAt: err.expiredAt });
//             }
//             return res.status(401).json({ msg: 'Invalid token' });
//         }

//         // Attach decoded payload to req.user
//         req.user = decoded;

//         // Continue to the next middleware or route handler
//         next();
//     });
// };

// module.exports = authMiddleware;

