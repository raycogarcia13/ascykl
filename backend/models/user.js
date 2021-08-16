const { Schema, model, Types } = require("mongoose");
const validator = require("validator")
const bcrypt = require('bcryptjs')

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
        default: 'User'
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
 })

module.exports =  model('User',dataSchema);