const { Schema, model, Types } = require("mongoose");

const dataSchema = new Schema({
    name:{
        type: String,
        required: [ true, "subcategory.name.required"],
        trim: true,
    },
    description:{
        type: String,
        required: [ true, "subcategory.description.required"],
    },
    category_id:{
        type: Types.ObjectId, required: true, refPath: 'Category'
    }
});

module.exports =  model('SubCategory',dataSchema);