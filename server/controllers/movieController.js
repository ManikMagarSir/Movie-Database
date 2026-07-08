import * as Movie from "../models/Movie.js";

export function getAllMovies(req, res) {
  res.json(Movie.getAllMovies());
}

export function getMovieById(req, res) {
  const movie = Movie.getMovieById(Number(req.params.id));
  if (!movie) return res.status(404).json({ error: "Movie not found" });
  res.json(movie);
}

export function createMovie(req, res) {
  const { title, genre, year, director, synopsis, cast, rating } = req.body;
  if (!title || !genre || !year || !director || !synopsis) {
    return res.status(400).json({ error: "All fields are required: title, genre, year, director, synopsis" });
  }
  const poster = req.file ? `/uploads/posters/${req.file.filename}` : null;
  const castArray = cast ? cast.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const ratingNum = rating ? Math.min(10, Math.max(0, Number(rating))) : null;
  const movie = Movie.createMovie({ title, genre, year: Number(year), director, synopsis, poster, cast: castArray, rating: ratingNum });
  res.status(201).json(movie);
}

export function deleteMovie(req, res) {
  const deleted = Movie.deleteMovie(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: "Movie not found" });
  res.status(204).end();
}
