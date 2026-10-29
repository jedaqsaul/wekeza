import { useEffect, useState } from "react";
import { fetchCategories } from "../services/transactions";

// Categories rarely change, so fetch once per page load and share the result.
let cache = null;
let inflight = null;

function loadCategories() {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = fetchCategories()
      .then((data) => {
        cache = data;
        return data;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

export function useCategories() {
  const [categories, setCategories] = useState(cache || []);
  const [isLoading, setIsLoading] = useState(!cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache) return undefined;
    let cancelled = false;
    loadCategories()
      .then((data) => {
        if (!cancelled) setCategories(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, isLoading, error };
}
