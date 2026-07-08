let nextId = 1;
const movies = [];

export function getAllMovies() {
  return movies;
}

export function getMovieById(id) {
  return movies.find((m) => m.id === id) || null;
}

export function createMovie({ title, genre, year, director, synopsis }) {
  const movie = { id: nextId++, title, genre, year, director, synopsis };
  movies.push(movie);
  return movie;
}

export function deleteMovie(id) {
  const index = movies.findIndex((m) => m.id === id);
  if (index === -1) return false;
  movies.splice(index, 1);
  return true;
}

export function seedMovies(data) {
  data.forEach((m) => {
    movies.push({ id: nextId++, ...m });
  });
}
