import User from "../models/User.js"



// create new user

export const createUser = async(req, res) =>{
    const newUser = new User(req.body)
    try {
        const savedUser = await newUser.save()
        res.status(200).json({
            success:true,
            message: "Successfully created User",
            data:savedUser
        })     
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "failed to create user, try again",      
        })
        
    }
}

export const updateUser = async(req, res) =>{
    const id = req.params.id
    try {
        const updatedUser = await Tour.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})
        res.status(200).json({
            success:true,
            message: "Updated Tour Successfully",
            data:updatedUser,
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            message: "failed to update tour, try again",      
        })
        
    }
}


// delete Tour
export const deleteUser = async(req, res) =>{
    const id = req.params.id
    try {
        const deletedUser = await User.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message: "Deleted Tour Successfully",
            data: deletedUser
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            message: "failed to delete tour, try again",      
        })
        
    }
}

// get single user
export const getSingleUser = async(req, res) =>{
    const id = req.params.id
    try {
        const user = await User.findById(id)
        res.status(200).json({
            success:true,
            message: "Tour Found",
            data:user
        })
    } catch (err) {
        res.status(404).json({
            success:false,
            message: "Not Found",      
        })
        
    }
}

// get all users
export const getAllUser = async(req, res) =>{
    try {
        const users = await Tour.find({})
        res.status(200).json({
            success:true,
            message: "Successful",
            data:users
        })
    } catch (err) {
        res.status(404).json({
            success:false,
            message: "Not Found",      
        })
        
    }
}