const { Schema, model } = require("mongoose");

const dataSchema = new Schema({
   key: {type: String, required:true, index:{ unique: true }},
   value: {type: String},
});

module.exports =  model('Config',dataSchema);