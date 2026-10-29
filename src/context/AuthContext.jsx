import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { fetchCurrentUser, loginUser, logoutUser, registerUser } from "../services/auth";
import { onSessionExpired, tokenStorage } from "../services/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore the session on first load if a token is stored.
  useEffect(() => {
    let cancelled = false;
    async function restore() {
      if (!tokenStorage.getAccess()) {
        setIsLoading(false);
        return;
      }
      try {
        const profile = await fetchCurrentUser();
        if (!cancelled) setUser(profile);
      } catch {
        tokenStorage.clear();
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    restore();
    return () => {
      cancelled = true;
    };
  }, []);

  // A failed background token refresh means the session is over.
  useEffect(() => onSessionExpired(() => setUser(null)), []);

  const login = useCallback(async (credentials) => {
    const profile = await loginUser(credentials);
    setUser(profile);
    return profile;
  }, []);

  const register = useCallback((payload) => registerUser(payload), []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, isAuthenticated: Boolean(user), login, register, logout }),
    [user, isLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
