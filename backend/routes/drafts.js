const express = require('express');
const { saveDraft, } = require('../controllers/drafts')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

////Authenticated user
router.use(requireAuth)

// //draft blog
router.post('/', saveDraft)


module.exports = router