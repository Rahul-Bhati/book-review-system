import Book from "../models/Book.js";
import Review from "../models/Review.js";

// to add new book
const addBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
};

// to get all books with pagination
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).send(books);
    } catch (error) {
        res.status(400).send(error);
    }
};

// to get single book detail including : Average rating and Reviews (with pagination)
const getBookDetail = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
};

// to update book
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
};

// to delete book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        res.status(200).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
};

// to add review Submit a review (Authenticated users only, one review per user per book)
const addReview = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const {userId, bookId, rating, comment} = req.body;
        const review = new Review({userId, bookId, rating, comment});

        await review.save();
        res.status(200).send(review);
    } catch (error) {
        res.status(400).send(error);
    }
};

export { addBook, getAllBooks, getBookDetail, updateBook, deleteBook, addReview };