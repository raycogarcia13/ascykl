const { Schema, model, Types } = require("mongoose");

const dataSchema = new Schema({
    name:{
        type: String,
        required: [ true, "category.name.required"],
        trim: true,
        maxLength: [100,'category.name.exceded']
    },
    description:{
        type: String,
        required: [ true, "category.description.required"],
    }
});

module.exports =  model('Category',dataSchema);