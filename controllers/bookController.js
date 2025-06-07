import Book from "../models/Book.js";
import Review from "../models/Review.js";
import User from "../models/User.js";

// to add new book
const addBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(500).send(error);
    }
};

// to get all books with pagination
// Get all books (with pagination and optional filters by author and genre)

const getAllBooks = async (req, res) => {
    try {
        const { author, genre, page = 1, limit = 10 } = req.query;

        // Build the filter object
        const filter = {};
        if (author) filter.author = { $regex: author, $options: "i" };
        if (genre) filter.genre = { $regex: genre, $options: "i" };

        // Pagination logic
        const skip = (page - 1) * limit;

        // Fetch books with filters and pagination
        const books = await Book.find(filter)
            .skip(skip)
            .limit(parseInt(limit));

        const totalCount = await Book.countDocuments(filter); // Get total count for frontend pagination

        res.status(200).json({
            total: totalCount,
            page: parseInt(page),
            limit: parseInt(limit),
            data: books
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

// to get single book detail including : Average rating and Reviews (with pagination)
const getBookDetail = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).send(book);
    } catch (error) {
        res.status(500).send(error);
    }
};

// to update book
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(book);
    } catch (error) {
        res.status(500).send(error);
    }
};

// to delete book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        res.status(200).send(book);
    } catch (error) {
        res.status(500).send(error);
    }
};

// to add review Submit a review (Authenticated users only, one review per user per book)
const addReview = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const {rating, comment} = req.body;
        // check if user has already reviewed the book
        const review = await Review.findOne({user: req.user.userId, book: req.params.id});

        if (review) {
            return res.status(400).send("User has already reviewed the book");
        }

        const newReview = new Review({user: req.user.userId, book: req.params.id, rating, comment});

        // whenver review added avg rating should be updated
        book.avgRating = (book.avgRating + rating) / (review ? review.length + 1 : 1);

        await book.save();
        await newReview.save();
        res.status(200).send(newReview);
    } catch (error) {
        res.status(500).send(error);
    }
};

export { addBook, getAllBooks, getBookDetail, updateBook, deleteBook, addReview };