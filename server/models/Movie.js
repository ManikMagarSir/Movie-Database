import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "..", "data", "movies.json");

function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return null;
  }
}

function save(movies) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(movies, null, 2));
}

let movies = load();
let nextId = 1;
if (movies) {
  nextId = Math.max(0, ...movies.map((m) => m.id)) + 1;
} else {
  movies = [];
}

export function getAllMovies() {
  return movies;
}

export function getMovieById(id) {
  return movies.find((m) => m.id === id) || null;
}

export function createMovie(data) {
  const movie = { id: nextId++, poster: null, rating: null, cast: [], ...data };
  movies.push(movie);
  save(movies);
  return movie;
}

export function deleteMovie(id) {
  const index = movies.findIndex((m) => m.id === id);
  if (index === -1) return false;
  movies.splice(index, 1);
  save(movies);
  return true;
}

export function seedMovies(data) {
  if (movies.length > 0) return;
  data.forEach((m) => movies.push({ id: nextId++, ...m }));
  save(movies);
}
