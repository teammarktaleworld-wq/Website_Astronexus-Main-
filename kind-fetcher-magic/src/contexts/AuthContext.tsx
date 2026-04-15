import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import * as api from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  sessionId?: string;
  [key: string]: unknown;
}

interface AuthCtx {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  sessionId: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
const AuthContext = createContext<AuthCtx | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

const storeAuth = (token: string, refreshToken: string, user: User) => {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("refresh_token", refreshToken);
  localStorage.setItem("auth_user", JSON.stringify(user));
};

const clearAuth = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("auth_user");
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("auth_token"));

  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const res = await api.login({ email, password });
    const t = res.token || res.data?.token;
    const rt = res.refreshToken || res.data?.refreshToken || "";
    const u = res.user || res.data?.user || res.data;
    storeAuth(t, rt, u);
    setToken(t);
    setUser(u);
  }, []);

  const handleSignup = useCallback(async (name: string, email: string, password: string, phone?: string) => {
    const res = await api.signupBasic({ name, email, password, confirmPassword: password, phone });
    const t = res.token || res.data?.token;
    const rt = res.refreshToken || res.data?.refreshToken || "";
    const u = res.user || res.data?.user || res.data;
    if (t) {
      storeAuth(t, rt, u);
      setToken(t);
      setUser(u);
    }
  }, []);

  const handleLogout = useCallback(() => {
    api.logout().catch(() => {});
    clearAuth();
    setToken(null);
    setUser(null);
  }, []);

  const sessionId = user?.sessionId as string | null ?? null;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, sessionId, login: handleLogin, signup: handleSignup, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
