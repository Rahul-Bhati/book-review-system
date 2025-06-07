import Book from "../models/Book.js";

// to update review
const updateReview = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send({message: "Review updated successfully"});
    } catch (error) {
        res.status(500).send(error);
    }
};

// to delete review
const deleteReview = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        res.status(200).send({message: "Review deleted successfully"});
    } catch (error) {
        res.status(500).send(error);
    }
};

export { updateReview, deleteReview };