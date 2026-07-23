import { Router } from "express";
import { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } from "../controllers/movieController.js";
import { authenticate } from "../middleware/auth.js";
import { upload } from "../config/upload.js";

const router = Router();

router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.post("/", authenticate, upload.single("poster"), createMovie);
router.put("/:id", authenticate, upload.single("poster"), updateMovie);
router.delete("/:id", authenticate, deleteMovie);

export default router;
