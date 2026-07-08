import express from "express";
import cors from "cors";
import "dotenv/config";
import movieRoutes from "./routes/movieRoutes.js";
import { initDatabase } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/posters", express.static("public/posters"));

app.use("/api/movies", movieRoutes);

initDatabase();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
