import express from "express"
import { createTour, 
         deleteTour, 
         getAllTours, 
         getFeaturedTours, 
         getSingleTour,
         getTourBySerach,
         getTourCount,
         updateTour, 
          } from "../controllers/tourController.js"
    import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

//create tour

router.post("/",verifyAdmin, createTour)

// update tour
router.put("/:id",verifyAdmin, updateTour)

// delete tour
router.delete("/:id",verifyAdmin, deleteTour)

// get single tout
router.get("/:id", getSingleTour)

// get all tours
router.get("/", getAllTours)

// get all tours by city, distance and maxGroupSize
router.get("/search/getTourBySerach", getTourBySerach)

// get featured tour
router.get("/search/getFeaturedTours", getFeaturedTours)


// get  tour count
router.get("/search/getTourCount", getTourCount)



export default router;