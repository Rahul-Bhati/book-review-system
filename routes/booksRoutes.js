import { Router } from "express";
import { addBook, getAllBooks, getBookDetail, updateBook, deleteBook, addReview } from "../controllers/bookController.js";
import authenticate from "../middleware/authenticate.js";
const router = Router();

// to add new book
router.post("/", authenticate, addBook);

// to get all books with pagination
router.get("/", getAllBooks);

// to get single book detail including : Average rating and Reviews (with pagination)
router.get("/:id", getBookDetail);

// to update book
router.put("/:id", authenticate, updateBook);

// to delete book
router.delete("/:id", authenticate, deleteBook);

// to add review Submit a review (Authenticated users only, one review per user per book)
router.post("/:id/reviews", authenticate, addReview);

export default router;