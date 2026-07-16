import { Router } from "express";
import { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } from "../controllers/movieController.js";
import { upload } from "../config/upload.js";

const router = Router();

router.get("/", getAllMovies);
router.post("/", upload.single("poster"), createMovie);
router.get("/:id", getMovieById);
router.put("/:id", upload.single("poster"), updateMovie);
router.delete("/:id", deleteMovie);

export default router;
