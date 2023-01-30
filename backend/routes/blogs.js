const express = require('express');
const { getAllBlog, singleBlog, createBlog, searchBlog, deleteBlog, updateBlog, myBlog, likeBlog, CommentsOnBlog } = require('../controllers/blogController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()


// // all blogs
router.get('/allblogs', getAllBlog)


// single blog
router.get('/:id', singleBlog)

// search blog
router.post('/', searchBlog)

////Authenticated user
router.use(requireAuth)

// //my blog
router.get('/', myBlog)

// //new blog
router.post('/', createBlog)


// //likes blog
router.post('/', likeBlog)

// //draft blog
router.post('/', CommentsOnBlog)

// //delete blog
router.delete('/:id', deleteBlog)

// //update a blog
router.post('/:id', updateBlog)


module.exports = router