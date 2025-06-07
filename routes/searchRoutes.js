import { Router } from "express";
import { searchBooks } from "../controllers/searchController.js";

const router = Router();

//Search books by title or author (partial and case-insensitive)
router.get("/", searchBooks);

export default router;
