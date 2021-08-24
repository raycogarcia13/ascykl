const User = require('../models/user');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const sendToken = require("../utils/jwtToken")
const { sendMail, messageRegister } = require('../utils/mail')

// Register User  => /api/v1/register
exports.register = catchAsyncErrors(async (req,res,next) =>{
    const { name, email, password, lang } = req.body;
    function tokenRandom(size) {
        let n = '';
        for (let i = 0; i < size; i++)
            n += Math.floor(Math.random() * (Math.floor(9) - Math.ceil(1) + 1) + Math.ceil(1));
        return n;
    }
    const newed = await User.create({
        name,
        email,
        password,
        verifyPin: tokenRandom(6) 
    });

    let {text,html} = messageRegister(newed,lang);
    let subject = 'ASCYKL | Registro';
    sendMail(email, text, html, subject).catch(e => {
        console.log(e);
    })

    res.json({
        status:"success",
        message:"mail.sended",
        email:newed.email,
        name: newed.name
    })
    // sendToken(newed, res);
})

// Login user => /api/v1/login
exports.login =  catchAsyncErrors(async (req,res,next) =>{
    const {email, password} = req.body;

    if(!email || !password)
        return next(new ErrorHandler('auth.empty',400))

    let user = await User.findOne({email}).select('+password')

    if(!user)
        return next(new ErrorHandler('auth.error',401))
    
    const isPasswordMatch = await user.comparePassword(password)

    if(!isPasswordMatch)
        return next(new ErrorHandler('auth.error',401))

    if(user.status!='Available')
        return next(new ErrorHandler(`auth.status.${user.status}`,401))

    
    user = await User.findOne({email});
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

// getUsers => /api/v1/admin/users
exports.getUsers =  catchAsyncErrors(async (req,res,next) =>{

    let all = await User.find();
    res.json({
        status:"success",
        count: all.length,
        data: all
    })
})
