import axios from "axios";

const api = axios.create({
  baseURL: "/api/movies",
  headers: { "Content-Type": "application/json" },
});

export async function fetchMovies(genre, search) {
  const params = {};
  if (genre) params.genre = genre;
  if (search) params.search = search;
  const { data } = await api.get("/", { params });
  return data;
}

export async function fetchMovieById(id) {
  const { data } = await api.get(`/${id}`);
  return data;
}

export async function createMovie(formData) {
  const { data } = await api.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function updateMovie(id, formData) {
  const { data } = await api.put(`/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function deleteMovie(id) {
  await api.delete(`/${id}`);
}
