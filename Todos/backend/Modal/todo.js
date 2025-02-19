const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    title: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    category:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('todo', todoSchema);