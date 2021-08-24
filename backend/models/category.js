const { Schema, model, Types } = require("mongoose");

const dataSchema = new Schema({
    texts:[
    {
        lang:{
            type: String,
            required: true
            },
        name:{
            type: String,
            required: [ true, "category.name.required"],
            trim: true,
            maxLength: [100,'category.name.exceded']
        }
    }
    ],
    image:{
        type: String,
        required: [true, "category.image.required"]
    }
});

module.exports =  model('Category',dataSchema);