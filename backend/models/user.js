const { Schema, model, Types } = require("mongoose");
const validator = require("validator")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const dataSchema = new Schema({
    name:{
        type: String,
        required: [true, 'user.name.required'],
        maxLength: [30 , 'user.name.lenght']
    },
    email:{
        type: String,
        required: [true, 'user.email.required'],
        unique: true,
        validate: [validator.isEmail, 'user.email.invalid']
    },
    password:{
        type: String,
        required: [true, 'user.password.required'],
        minLength: [6 , 'user.password.lenght'],
        select: false
    },
    role:{
        type: String,
        default: 'User',
        enum: ['User', 'Administrator', 'Account']

    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    deletedAt: Date
});

dataSchema.pre('save', async function(next){
    if(!this.isModified('password'))
        next()
    
    this.password = await bcrypt.hash(this.password, 10)
 });

//  compare password
dataSchema.methods.comparePassword = async function (enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password)
};

//  return JWT
dataSchema.methods.getJwtToken = function (){
    return jwt.sign({
        id:this._id
    },process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESTIME
    });
};

module.exports =  model('User',dataSchema);