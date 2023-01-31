const express = require('express');
const { getAllBlog, singleBlog, createBlog, searchBlog, deleteBlog, updateBlog, myBlog, likeBlog, unlikeBlog, commentBlog, uncommentBlog } = require('../controllers/blogController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()


// // all blogs
router.get('/allblogs', getAllBlog)


// single blog
router.get('/:id', singleBlog)

// search blog
router.post('/search', searchBlog)

////Authenticated user
router.use(requireAuth)

// //my blog
router.get('/', myBlog)

// //new blog
router.post('/', createBlog)


// //likes blog
router.put('/like', likeBlog)

// //unlikes blog
router.put('/unlike', unlikeBlog)

// //comment blog
router.put('/comment', commentBlog)

// //uncomment blog
router.put('/uncomment', uncommentBlog)

// //delete blog
router.delete('/:id', deleteBlog)

// //update a blog
router.post('/:id', updateBlog)


module.exports = router