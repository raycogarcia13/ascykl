const User = require('../models/user');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")

// Register User  => /api/v1/register
exports.register = catchAsyncErrors(async (req,res,next) =>{
    
    const { name, email, password } = req.body;

    const newed = await User.create({
        name,
        email,
        password
    })
    


    return res.json({
        status:"success",
        message:"user.created",
        user:newed
    })
})

