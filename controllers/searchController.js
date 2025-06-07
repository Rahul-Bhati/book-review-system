import Book from '../models/Book.js';

//Search books by title or author (partial and case-insensitive)
// user can pass title or author or both
const searchBooks = async (req, res) => {
    try {
        const { title, author } = req.query;

        // Ensure title and author are defined and not empty
        const filters = [];
        if (title && typeof title === "string") {
            filters.push({ title: { $regex: title, $options: "i" } });
        }
        if (author && typeof author === "string") {
            filters.push({ author: { $regex: author, $options: "i" } });
        }

        // If no valid filters exist, return an empty array
        if (filters.length === 0) {
            return res.status(200).send([]);
        }

        const books = await Book.find({ $or: filters });
        res.status(200).send(books);
    } catch (error) {
        res.status(500).send(error);
    }
};

export { searchBooks };

