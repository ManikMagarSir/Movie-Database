import { Router } from "express";
import { getAllMovies, getMovieById, createMovie, deleteMovie } from "../controllers/movieController.js";

const router = Router();

router.get("/", getAllMovies);
router.post("/", createMovie);
router.get("/:id", getMovieById);
router.delete("/:id", deleteMovie);

export default router;
