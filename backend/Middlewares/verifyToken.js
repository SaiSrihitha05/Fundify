const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req,res,next) {
    //get bearer token
    const bearerToken = req.headers.authorization;
    //if not available
    if(!bearerToken){
        return res.send({message:"Unauthorized access..Please login to continue"})
    }

    const token = bearerToken.split(' ')[1]
    try{
        jwt.verify(token,process.env.SECRET_KEY)
        next()
    }catch(err){
        next(err)
    }
}

module.exports = verifyToken;