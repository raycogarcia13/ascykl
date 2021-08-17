const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/errorHandler");
const jwt = require('jsonwebtoken')
const User = require('../models/user')
// checks if authenticated
exports.isAuthenticatedUser = catchAsyncErrors( async (req,res,next) => {
    const { token } = req.cookies

    if(!token)
        return next(new ErrorHandler('access.denied.token',401))
     
     const decoded = jwt.verify(token,process.env.JWT_SECRET)
     if(decoded){
        req.user = await User.findById(decoded.id)
        next()
     }
    else
        return next(new ErrorHandler('access.denied.token',401))
})

// checks if role auth
exports.authorizeRole = (...roles) =>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role))
            return next(new ErrorHandler(`Role (${req.user.role}) is not alowed to access ti this resource`,403))
        
        next();
    }
}