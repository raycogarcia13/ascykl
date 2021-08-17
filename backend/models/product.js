const { Schema, model, Types } = require("mongoose");

const dataSchema = new Schema({
    name:{
        type: String,
        required: [ true, "product.name.required"],
        trim: true,
        maxLength: [100,'product.name.exceded']
    },
    price:{
        type: Number,
        required: [ true, "product.price.required"],
        maxLength: [5,'product.price.exceded'],
        default: 0.0
    },
    description:{
        type: String,
        required:[ true, "product.description.required"]
    },
    ratings:{
        type: Number,
        default: 0,
    },
    images:[
        {
           image_src:{
               type:String,
               required: [true, "product.image.required"]
           }
        }
    ],
    category:{
        type: String,
        required: [true, "product.category.required"]
    },
    subcategory:{
        type: String,
        required: [true, "product.category.required"]
    },
    stock:{
        type: Number,
        required: [true, "product.stock.required"],
        maxLength: [5, "product.stock.maxlenght"],
        default: 0
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    deletedAt:{
        type: Date,
    }
    
});

module.exports =  model('Product',dataSchema);