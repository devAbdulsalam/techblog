const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')



// get users blogs
const myBlog = async (req, res) => {
    const user_id = req.user._id
    const blog = await Blog.find({user_id}).sort({createdAt: -1 })
    if(!blog){
        return res.status(404).json({ error: 'Blog not found'})
    }
    res.status(200).json(blog)
}

// get all blogs
const getAllBlog = async (req, res) => {
    const blog = await Blog.find({}).sort({createdAt: -1 })
    if(!blog){
        return res.status(404).json({ error: 'Blog not found'})
    }
    res.status(200).json(blog)
}

// get a searchblog
const searchBlog = async (req, res) => {
    const {query} = req.body
    const blog = await Blog.find({
    $or: [
      {title: {$regex: query, $options: 'i'}},
      {content: {$regex: query, $options: 'i'}},
      {author: {$regex: query, $options: 'i'}}
    ]
  });
  if(!blog){
        return res.status(404).json({ error: 'Blog not found'})
    }
    res.status(200).json({blog, message : "blog created successfully"})
}


// create a  blog
const createBlog = async (req, res) => {
    const {user_id, title, subtitle, content, author, keywords} = req.body
    console.log(req.user._id)
    console.log(req.body.user_id)
    let emptyFields = []

        if (!title) {
            emptyFields.push('title')
        }
        if (!subtitle) {
            emptyFields.push('load')
        }
        if (!content) {
            emptyFields.push('reps')
        }
        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
        }
        // //add to database
    try {
        const blog = await Blog.create({user_id, title, subtitle, content, author, keywords})
        res.status(200).json({blog, message : "blog created successfully"})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}


// delete a blog
const deleteBlog = async (req, res) => {
     const {id} = req.params
    try{
        const blog = await Blog.findByIdAndDelete({_id : id})    
        if(!blog){
            return res.status(404).json({ error: 'Blog not found'})
        }
        res.status(200).json("blog deleted successfully")
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}


// update a blog
const updateBlog = async (req, res) => {
    const {id} = req.params
     if(!mongoose.Types.ObjectId.isValid({id})){
         return res.status(404).json({ error: 'Not a valid id'})
        }
    try{
        let blog = await Blog.findByIdAndUpdate({_id :id})
        if(blog){
            blog.title = req.body.title || blog.title
            blog.subtitle = req.body.subtitle || blog.subtitle
            blog.author = req.body.author || blog.author
            blog.keywords = req.body.keywords || blog.keywords
            blog.content = req.body.content || blog.content
        }
        blog = await blog.save()
        res.status(200).json({blog, message: 'Blog updated successfully'})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}


// get a single blog
const singleBlog = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'Blog not found'})
    }

    const blog = await Blog.findById(id)

    if(!blog){
        return res.status(404).json({ error: 'Blog not found'})
    }

    res.status(200).json(blog)
}
// get a Save Draft Blog
const saveDraft = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'Blog not found'})
    }

    const blog = await Blog.findById(id)

    if(!blog){
        return res.status(404).json({ error: 'Blog not found'})
    }

    res.status(200).json(blog)
}
// like single blog
const likeBlog = async (req, res) => {
    const {id, userId} = req.body

    const blog = await Blog.findByIdAndUpdate(id, {$push : {likes : userId}}, 
        {new: true})

    if(!blog){
        return res.status(404).json({ error: 'Blog not found'})
    }

    res.status(200).json(blog)
}

// unlike single blog
const unlikeBlog = async (req, res) => {
    const {id, userId} = req.body

    const blog = await Blog.findByIdAndUpdate(id, {$pull : {likes : userId}}, 
        {new: true})

    if(!blog){
        return res.status(404).json({ error: 'Blog not found'})
    }
    res.status(200).json(blog)
}
// get a single blog
const commentBlog = async (req, res) => {
    const {userId, comment} = req.body
    comment.postedBy = userId

    const blog = await Blog.findByIdAndUpdate(id, {$push  : {comments : comment}}, 
        {new: true})
        .populate('comments.postedBy', _id)
        .populate('postedBy', _id)

    if(!blog){
        return res.status(404).json({ error: 'Blog not found'})
    }

    res.status(200).json(blog)
}

const uncommentBlog = async (req, res) => {
    const {comment} = req.body

    const blog = await Blog.findByIdAndUpdate(id, {$pull  : {comments : comment._id}}, 
        {new: true})
        .populate('comments.postedBy', _id)
        .populate('postedBy', _id)

    if(!blog){
        return res.status(404).json({ error: 'Blog not found'})
    }

    res.status(200).json(blog)
}
module.exports = {
    getAllBlog,
    myBlog, 
    singleBlog,
    searchBlog,
    createBlog, 
    deleteBlog, 
    updateBlog,
    saveDraft, 
    likeBlog, 
    unlikeBlog, 
    commentBlog,
    uncommentBlog,
}