import { Router } from "express";
import { updateReview, deleteReview } from "../controllers/reviewController.js";
import authenticate from "../middleware/authenticate.js";
const router = Router();

// update review
router.put("/:id", authenticate, updateReview);

// delete review
router.delete("/:id", authenticate, deleteReview);

export default router;