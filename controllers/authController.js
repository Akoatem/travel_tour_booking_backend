import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

// register
export const register = async (req, res)=>{
    try {
        // hashed password

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
        })
        const savedUser = await newUser.save()
        res.status(200).json({
            success:true,
            message: "Successfully created User",
            data:savedUser
        })    
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "failed to create User, try again",      
        })
    }
}

// login

export const login = async (req, res)=>{
    const email =req.body.email
    try {
        const user = await User.findOne({email})
        
        // if user doesnt exist
        if(!user){
            res.status(404).json({
                success:false,
                message: " User not found.",      
            })
        }
        // if user  exist or password or compare password
        const comparePassword = await bcrypt.compare(req.body.password, user.password)

        // if password is incorrect

        if(!comparePassword){
            res.status(404).json({
                success:false,
                message: " password incorrect.",      
            })
        }
        const {password, role, ...rest} = user._doc

        // create jwt token
        const token = jwt.sign(
            {id:user._id, role: user.role},
            process.env.JWT_KEY,
            {expiresIn:"15d"}
            )
        // set token in the browser cookies and send the response to the client
        res.cookie('accessToken', token, {
            httpOnly:true,
            expire:token.expiresIn
        }).status(200).json({
            token,
            data:{...rest},
            role,
        })   
    } catch (err) {
        res.status(500).json({
            success:false,
            message: "failed to login.",      
        })
    }
}