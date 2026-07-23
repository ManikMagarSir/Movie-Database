import { Router } from "express";
import { getWatchlist, toggleWatchlist } from "../controllers/userController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/watchlist", authenticate, getWatchlist);
router.post("/watchlist/:movieId", authenticate, toggleWatchlist);

export default router;
