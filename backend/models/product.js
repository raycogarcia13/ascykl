const { Schema, model, Types } = require("mongoose");

const dataSchema = new Schema({
   
    price:{
        type: Number,
        required: [ true, "product.price.required"],
        maxLength: [5,'product.price.exceded'],
        default: 0.0
    },
    texts:[
        {
            lang:{
                type: String,
                required: true
            },
            description:{
                type: String,
                required:[ true, "product.description.required"]
            },
            name:{
                type: String,
                required: [ true, "product.name.required"],
                trim: true,
            },
        }
    ],
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
        type: Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    subcategory:{
        type: Types.ObjectId,
        required: true,
        ref: 'SubCategory'
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