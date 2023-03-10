const  mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    user_id:{
        type : String,
        require: true
    },
    title:{
        type : String,
        require: true
    },
    subtitle:{
        type : String,
        require: true
    },
    author:{
        type : String,
        require: true
    },
    keywords:{
        type : String,
        require: true
    },
    content:{
        type : String,
        require: true
    },
    likes:{
        type : Number,
        require: true
    },
}, {timestamps : true});

const Draft = mongoose.model('Draft', blogSchema);
module.exports = Draft;