import axios from "axios";

const api = axios.create({
  baseURL: "/api/auth",
  headers: { "Content-Type": "application/json" },
});

export async function register(name, email, password) {
  const { data } = await api.post("/register", { name, email, password });
  return data;
}

export async function login(email, password) {
  const { data } = await api.post("/login", { email, password });
  return data;
}
