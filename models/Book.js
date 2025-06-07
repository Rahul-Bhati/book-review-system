import mongoose from "mongoose";

// book schema has title, author, avg rating
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    avgRating: {
        type: Number,
        default: 0
    }
});

const Book = mongoose.model("Book", bookSchema);

export default Book;