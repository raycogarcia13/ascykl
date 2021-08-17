const User = require('../models/user');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const sendToken = require("../utils/jwtToken")

// Register User  => /api/v1/register
exports.register = catchAsyncErrors(async (req,res,next) =>{
    const { name, email, password } = req.body;
    const newed = await User.create({
        name,
        email,
        password
    })

    sendToken(newed, res);
})

// Login user => /api/v1/login
exports.login =  catchAsyncErrors(async (req,res,next) =>{
    const {email, password} = req.body;

    if(!email || !password)
        return next(new ErrorHandler('auth.empty',400))

    const user = await User.findOne({email}).select('+password')

    if(!user)
        return net(new ErrorHandler('auth.error',401))
    
    const isPasswordMatch = await user.comparePassword(password)

    if(!isPasswordMatch)
        return net(new ErrorHandler('auth.error',401))
    
   sendToken(user, res);
})

// logout user => /api/v1/logout
exports.logout =  catchAsyncErrors(async (req,res,next) =>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });

    res.json({
        status:'success',
        message: 'logged.out'
    })
})

