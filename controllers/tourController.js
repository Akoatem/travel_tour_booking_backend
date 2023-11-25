import Tour from "../models/Tour.js"

// create new tour

export const createTour = async(req, res) =>{
    const newTour = new Tour(req.body)
    try {
        const savedTour = await newTour.save()
        res.status(200).json({
            success:true,
            message: "Successfully created Tour",
            data:savedTour
        })     
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Internal Server Error, try again",      
        })
        
    }
}

export const updateTour = async(req, res) =>{
    const id = req.params.id
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})
        res.status(200).json({
            success:true,
            message: "Updated Tour Successfully",
            data:updatedTour,
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            message: "failed to update tour, try again",      
        })
        
    }
}


// delete Tour
export const deleteTour = async(req, res) =>{
    const id = req.params.id
    try {
        const deletedTour = await Tour.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message: "Deleted Tour Successfully",
            data: deletedTour
        })
    } catch (err) {
        res.status(500).json({
            success:false,
            message: "failed to delete tour, try again",      
        })
        
    }
}

// get single tour
export const getSingleTour = async(req, res) =>{
    const id = req.params.id
    try {
        const tour = await Tour.findById(id).populate('reviews')
        res.status(200).json({
            success:true,
            message: "Tour Found",
            data:tour
        })
    } catch (err) {
        res.status(404).json({
            success:false,
            message: "Not Found",      
        })
        
    }
}

// get all tours
export const getAllTours = async(req, res) =>{
    // for pagination
    const page = parseInt(req.query.page)
    //console.log(page);
    try {
        const tours = await Tour.find({})
        .populate('reviews')
        .skip(page * 8).limit(8)
        res.status(200).json({
            success:true,
            count:tours.length,
            message: "Successful",
            data:tours
        })
    } catch (err) {
        res.status(404).json({
            success:false,
            message: "Not Found",      
        })
        
    }
}

// get tour by search

export const getTourBySerach = async (req, res) =>{

    // i means case sensitive
    const city = new RegExp(req.query.city, 'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    try {
        // gte means greater than equal to
        const tours = await Tour.find({
        city, 
        distance:{$gte:distance},
        maxGroupSize:{$gte:maxGroupSize}}).populate('reviews')
        res.status(200).json({
            success:true,
            message: "Successful",
            data:tours
        })
        
    } catch (err) {
        res.status(404).json({
            success:false,
            message: "Not Found",      
        })
        
    }
}

// get featured tours

export const getFeaturedTours = async(req, res) =>{
    try {
        const tours = await Tour.find({featured:true}).populate('reviews').limit(8)
        res.status(200).json({
            success:true,
            message: "Successful",
            data:tours
        })
    } catch (err) {
        res.status(404).json({
            success:false,
            message: "Not Found",      
        })
        
    }
}

// get tour count

export const getTourCount = async(req, res) =>{
    try {
        const tourCount = await Tour.estimatedDocumentCount()
        res.status(200).json({
            success:true,
            message: "Successful",
            data:tourCount
        })
        
    } catch (err) {
        res.status(500).json({
            success:false,
            message: "Failed to fetch",      
        })
    }

}