const { default: mongoose } = require('mongoose')
const Draft = require('../models/draft')



// save draft
const saveDraft = async (req, res) => {
    const {user_id, title, subtitle, content, author, keywords} = req.body
    try {
        const blog = await Draft.create({user_id, title, subtitle, content, author, keywords})
        res.status(200).json({blog, message : "Draft saved"})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {
    saveDraft,
}