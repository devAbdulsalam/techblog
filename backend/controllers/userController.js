const User = require('../models/userModel')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const cloudinary = require('../utils/cloudinary')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
}) 

// // login user
const loginUser = async (req, res) => {
    const { phone, password } = req.body
    try {
        // retrieve user
        const user = await User.login(phone, password)
        const blog = await Blog.find({ user_id: user._id }).sort({ createdAt: -1 })
        // create a token
        const token = createToken(user._id)

        res.status(200).json({ user, blog, token, message: "Log in successfully" })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

// // login user
const getAccount = async (req, res) => {
    const { phone, password } = req.body
    try {
        // retrieve user
        const user = await User.login(phone, password)
        const blog = await Blog.find({ user_id: user._id }).sort({ createdAt: -1 })
        // create a token
        const token = createToken(user._id)

        res.status(200).json({ user, blog, token, message: "Log in successfully" })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

// create User
const signinUser = async (req, res) => {
    const { name, phone, password, email } = req.body
    try {
        const user = await User.signup(name, phone, email, password)
        // create a token
        const token = createToken(user._id)

        res.status(200).json({ user, token, message: "Account created successfully" })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

// // user profile
const updateProfile = async (req, res) => {
  const {id, name, phone, email, address} = JSON.parse(req.body.user)
  if(req.files){
  try {
    const image = req.files.image
      const fileName =  new Date().getTime().toString() + path.extname(image.name);
      const savePath = path.join(__dirname, "public", "uploads", fileName);
      await image.mv(savePath)

      res.status(200).json({ message : "image upload Successfully"})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
 }else{
     try{
        let user = await User.findOne({_id :id})
        if(!user){
            throw Error('user does not exist!!')
        }
        if(user){
            user.name = name || req.body.name || user.name
            user.phone = phone || req.body.phone || user.phone
            user.address = address ||req.body.address || user.address
            user.email = email || req.body.email || user.email
        }    
         user = await user.save()
      res.status(200).json({user, message : "Profile updated Successfully"})
    } catch (error) {
        res.status(404).json({error: error.message})
    }
 }

}

const forgetPassword = async (req, res) => {
    const {email} = req.body
    try {
        const user = await User.fgtpswd(email)
        // create a token
        const token = createToken(user._id)
        const link = `https://Techstuf.Vercel.App/reset-password/${user._id}/${token}`;

        const mailoption = {
            from: 'ammuftau74@gmail.com', // sender address
            to: email, // receivers address
            subject: "Email for Password Reset", // Subject line
            text: `This Link is valid for 2 Minutes ${link}`, // plain text body
            html: `<p>This Link is valid for 2 Minutes ${link}</p>`, 
        } 
        
        transporter.sendMail(mailoption, (error, info) => {
            if(error){
                // console.log(error, "error");
                res.status(401).json({error: error, message: "Password reset link sent successfully"})
            }else{
                // console.log(info.response, "success");
                res.status(200).json({token, info, message: "Password reset link sent successfully"})
            }
        })
    } catch (error) {
        res.status(404).json({error: error || error.message })
    }
}

// // reset Password
const resetPassword = async (req, res) => {
    const {id, token} = req.params
    try {
        let user = await User.find({_id :id})

        if (!user) {
            throw Error('User does not  exist!!')
        }
        // // verify the token
        const verify =  jwt.verify(token, process.env.SECRET)

        if(!verify){
           throw Error("verification failed")
        }
        res.status(200).json({user, verify, token, message : "Password Reset Successfully"})

    } catch (error) {
        res.status(401).json({error : error || error.message, message : "Something went wrong"})
    }
}

// // change Password
const changePassword = async (req, res) => {
    const {id, token, password, confirmPassword} = req.body
    try {
        // // verify the token
        const verify =  jwt.verify(token, process.env.SECRET)
        if(!verify){
            return res.status(401).json({error: "verification failed"}) 
        }
        if(verify){

            const newpassword = await User.changepsw(id, password, confirmPassword)
            
            let user = await User.findByIdAndUpdate({_id:id},{password:newpassword});
            
            user = await user.save()
            res.status(200).json({user, message: "Password Changed Successfully"})

        }else{
            res.status(401).json({status:401, message:"user not exist"})
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// // change Password
const followAccount = async (req, res) => {
   const {id, userId} = req.body
    try {
        const blog = await Blog.findByIdAndUpdate(id, {$push : {follow : userId}}, 
        {new: true})
        
        if(!blog){
            return res.status(404).json({ error: 'Blog not found'})
        }
        res.status(200).json(blog)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// // change Password
const unfollowAccount = async (req, res) => {
   const {id, userId} = req.body

    const blog = await Blog.findByIdAndUpdate(id, {$pull : {follow : userId}}, 
        {new: true})

    if(!blog){
        return res.status(404).json({ error: 'Blog not found'})
    }
    res.status(200).json(blog)
}
// // change Password
const deleteAccount = async (req, res) => {
   const {id, userId} = req.body

    const blog = await Blog.findByIdAndUpdate(id, {$pull : {follow : userId}}, 
        {new: true})

    if(!blog){
        return res.status(404).json({ error: 'Blog not found'})
    }
    res.status(200).json(blog)
}

module.exports = {
    signinUser,
    loginUser,
    updateProfile,
    forgetPassword,
    resetPassword,
    changePassword,
    followAccount,
    unfollowAccount,
    deleteAccount,
    getAccount
}