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
  const { title, genre, year, director, synopsis } = req.body;
  if (!title || !genre || !year || !director || !synopsis) {
    return res.status(400).json({ error: "All fields are required: title, genre, year, director, synopsis" });
  }
  const poster = req.file ? `/uploads/posters/${req.file.filename}` : null;
  const movie = Movie.createMovie({ ...req.body, year: Number(year), poster });
  res.status(201).json(movie);
}

export function deleteMovie(req, res) {
  const deleted = Movie.deleteMovie(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: "Movie not found" });
  res.status(204).end();
}
