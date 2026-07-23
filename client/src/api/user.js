import axios from "axios";

const api = axios.create({
  baseURL: "/api/user",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function getWatchlist() {
  const { data } = await api.get("/watchlist");
  return data;
}

export async function toggleWatchlist(movieId) {
  const { data } = await api.post(`/watchlist/${movieId}`);
  return data;
}
