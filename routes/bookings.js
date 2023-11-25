import express from "express"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { createBooking, 
         getAllBooking, 
         getSingleBooking } from '../controllers/bookingController.js';


const router = express.Router()

// create booking
router.post("/",verifyUser, createBooking)

// get booking
router.get("/:id",verifyUser, getSingleBooking)

// get all booking
router.get("/",verifyAdmin, getAllBooking)

export default router;