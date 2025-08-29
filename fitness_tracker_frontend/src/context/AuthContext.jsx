import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getStorage, setStorage, removeStorage } from '../utils/storage';
import AuthService from '../services/authService';

/**
 * PUBLIC_INTERFACE
 * AuthContext provides authentication state and actions for the app.
 * Values:
 *  - user: current user object or null
 *  - token: string or null
 *  - loading: boolean for async auth actions
 *  - login(email, password): Promise<void>
 *  - register(form): Promise<void>
 *  - logout(): void
 *  - isAuthenticated: boolean
 */
const AuthContext = createContext({
  user: null,
  token: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

const USER_KEY = 'auth_user';
const TOKEN_KEY = 'auth_token';

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStorage(USER_KEY, null));
  const [token, setToken] = useState(() => getStorage(TOKEN_KEY, null));
  const [loading, setLoading] = useState(false);

  // Persist changes
  useEffect(() => {
    if (user) setStorage(USER_KEY, user);
    else removeStorage(USER_KEY);
  }, [user]);

  useEffect(() => {
    if (token) setStorage(TOKEN_KEY, token);
    else removeStorage(TOKEN_KEY);
  }, [token]);

  // Optionally hydrate user from API if token exists but user missing
  useEffect(() => {
    const hydrate = async () => {
      if (token && !user) {
        setLoading(true);
        try {
          const profile = await AuthService.getProfile();
          setUser(profile?.user || profile || null);
        } catch {
          // invalid token
          setUser(null);
          setToken(null);
        } finally {
          setLoading(false);
        }
      }
    };
    hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const { token: tkn, user: usr } = await AuthService.login({ email, password });
      setToken(tkn || null);
      setUser(usr || null);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (form) => {
    setLoading(true);
    try {
      const { token: tkn, user: usr } = await AuthService.register(form);
      setToken(tkn || null);
      setUser(usr || null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
      isAuthenticated: Boolean(token),
    }),
    [user, token, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
