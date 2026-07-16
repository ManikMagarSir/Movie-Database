import Movie from "../models/Movie.js";

export async function getAllMovies(req, res) {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
}

export async function getMovieById(req, res) {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(500).json({ error: "Failed to fetch movie" });
  }
}

export async function createMovie(req, res) {
  try {
    const { title, genre, year, director, synopsis, cast, rating } = req.body;
    if (!title || !genre || !year || !director || !synopsis) {
      return res.status(400).json({ error: "All fields are required: title, genre, year, director, synopsis" });
    }
    const poster = req.file ? `/uploads/posters/${req.file.filename}` : null;
    const castArray = cast ? cast.split(",").map((s) => s.trim()).filter(Boolean) : [];
    const ratingNum = rating ? Math.min(10, Math.max(0, Number(rating))) : 0;
    const movie = await Movie.create({
      title,
      genre,
      year: Number(year),
      director,
      synopsis,
      poster,
      cast: castArray,
      avgRating: ratingNum,
    });
    res.status(201).json(movie);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(", ") });
    }
    res.status(500).json({ error: "Failed to create movie" });
  }
}

export async function deleteMovie(req, res) {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.status(204).end();
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(500).json({ error: "Failed to delete movie" });
  }
}

export async function updateMovie(req, res) {
  try {
    const { title, genre, year, director, synopsis, cast, rating } = req.body;
    const poster = req.file ? `/uploads/posters/${req.file.filename}` : undefined;
    const castArray = cast ? cast.split(",").map((s) => s.trim()).filter(Boolean) : undefined;
    const ratingNum = rating ? Math.min(10, Math.max(0, Number(rating))) : undefined;

    const update = {};
    if (title !== undefined) update.title = title;
    if (genre !== undefined) update.genre = genre;
    if (year !== undefined) update.year = Number(year);
    if (director !== undefined) update.director = director;
    if (synopsis !== undefined) update.synopsis = synopsis;
    if (castArray !== undefined) update.cast = castArray;
    if (ratingNum !== undefined) update.avgRating = ratingNum;
    if (poster !== undefined) update.poster = poster;

    const movie = await Movie.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(", ") });
    }
    if (error.kind === "ObjectId") {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(500).json({ error: "Failed to update movie" });
  }
}
