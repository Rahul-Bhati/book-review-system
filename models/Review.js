import mongoose from "mongoose";

// review schema has user (ref to  User table), book, rating, comment
const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
