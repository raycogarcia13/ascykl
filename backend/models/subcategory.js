const { Schema, model, Types } = require("mongoose");

const dataSchema = new Schema({
    texts:[
        {
            lang:{
                type:"String",
                required: true
            },
            name:{
                type: String,
                required: [ true, "subcategory.name.required"],
                trim: true,
            }
        }
    ],
    category:{
        type: Types.ObjectId, required: true, ref: 'Category'
    }
});

module.exports =  model('SubCategory',dataSchema);