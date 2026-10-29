import api, { tokenStorage } from "./api";

export async function registerUser({ name, email, password }) {
  const { data } = await api.post("/auth/register/", { name, email, password });
  return data;
}

export async function loginUser({ email, password }) {
  const { data } = await api.post("/auth/login/", { email, password });
  tokenStorage.setTokens({ access: data.access, refresh: data.refresh });
  return data.user;
}

export async function fetchCurrentUser() {
  const { data } = await api.get("/auth/me/");
  return data;
}

export function logoutUser() {
  tokenStorage.clear();
}
