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
    photo:{
        data : Buffer,
        contentType: String
    },
    likes:[{
        type : String,
        ref: "User"
    }],
    comments:[{
        text: String,
        created: {type: Date, default: Date.now},
        postedBy: {type: String, ref: "User"}
    }]
}, {timestamps : true});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;  