const express = require('express');
const { getAllBlog, singleBlog, createBlog, deleteBlog, updateBlog, myBlog, saveDraft, likeBlog, CommentsOnBlog } = require('../controllers/blogController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()


// // all blogs
router.get('/allblogs', getAllBlog)


// single blog
router.get('/:id', singleBlog)

////Authenticated user
router.use(requireAuth)

// //my blog
router.get('/', myBlog)

// //new blog
router.post('/', createBlog)

// //draft blog
router.post('/', saveDraft)

// //likes blog
router.post('/', likeBlog)

// //draft blog
router.post('/', CommentsOnBlog)

// //delete blog
router.delete('/:id', deleteBlog)

// //update a blog
router.post('/:id', updateBlog)


module.exports = router