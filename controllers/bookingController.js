import Booking from "../models/Booking.js"

export const createBooking = async (req, res) =>{
    const newBooking = new Booking(req.body)
    try {
       const savedBooking = await newBooking.save()
       res.status(200).json({
        success:true,
        message: "Your tour is booked",
        data:savedBooking
       })     
    } catch (err) {
        res.status(500).json({
            success:true,
            message: "Internal server error",
           }) 
        
    }
}


// export const createBooking = async(req, res)=>{
//     const tourId = req.params.tourId
//     const newBooking = new Booking({...req.body})

//     try {
//         const savedBooking = await newBooking.save()

//         await Booking.findByIdAndUpdate(tourId,{
//             $push: {books: savedBooking._id}
//         })
//         res.status(200).json({
//             success:true,
//             message: "Booking Created Successful",
//             data:savedBooking
//         })
//     } catch (err) {
//         res.status(500).json({
//             success:false,
//             message: "Failed to Create",      
//         })        
//     }
// }

// get single booking
export const getSingleBooking = async(req, res) =>{
    const id = req.params.id
    try {
        const book = await Booking.findById(id)
        res.status(200).json({
            success:true,
            message: "Successful",
            data:book
        })
    } catch (err) {
        res.status(404).json({
            success:false,
            message: "Not Found",      
        })
        
    }
}

// get all booking
export const getAllBooking = async(req, res) =>{
    //const id = req.params.id
    try {
        const books = await Booking.find()
        res.status(200).json({
            success:true,
            message: "Successful",
            data:books
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            message: "Internal server error",      
        })
        
    }
}
