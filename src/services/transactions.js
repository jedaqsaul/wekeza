import api from "./api";

/** params: { page, type, category, date_from, date_to, search, ordering } — empty values are dropped. */
export async function fetchTransactions(params = {}) {
  const cleaned = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== "" && v !== null && v !== undefined)
  );
  const { data } = await api.get("/transactions/", { params: cleaned });
  return data; // { count, next, previous, results }
}

export async function createTransaction(payload) {
  const { data } = await api.post("/transactions/", payload);
  return data;
}

export async function updateTransaction(id, payload) {
  const { data } = await api.patch(`/transactions/${id}/`, payload);
  return data;
}

export async function deleteTransaction(id) {
  await api.delete(`/transactions/${id}/`);
}

export async function fetchRecentTransactions(limit = 5) {
  const { data } = await api.get("/transactions/recent/", { params: { limit } });
  return data;
}

export async function fetchCategories(type) {
  const { data } = await api.get("/categories/", { params: type ? { type } : {} });
  return data;
}

export async function fetchDashboardSummary() {
  const { data } = await api.get("/dashboard/summary/");
  return data;
}
