import { Router } from "express";
import authRoutes from "./authRoutes.js";
import booksRoutes from "./booksRoutes.js";
import reviewsRoutes from "./reviewsRoutes.js";
import searchRoutes from "./searchRoutes.js";

const routes = Router();

routes.get("/hc", (req, res) => {
    res.send("Server Running fine...");
});

routes.use('/', authRoutes);
routes.use('/books', booksRoutes);
routes.use('/reviews', reviewsRoutes);
routes.use('/search', searchRoutes);

routes.use((req, res) => {
    res.status(404).send("Page not found");
});

export default routes;