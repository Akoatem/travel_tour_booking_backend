import express from "express"
 
import { createReview } from "../controllers/reviewController.js"
import { verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

// update user
router.post("/:tourId",verifyUser, createReview)

// // delete user
// router.delete("/:id")

// // get single tout
// router.get("/:id")

// // get all users
// router.get("/")


export default router;