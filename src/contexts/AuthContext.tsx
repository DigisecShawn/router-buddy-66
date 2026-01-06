import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 預設設備帳號密碼
const DEVICE_CREDENTIALS = {
  admin: "admin123",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // 檢查 session 狀態
    const session = sessionStorage.getItem("device_auth");
    if (session) {
      const { username } = JSON.parse(session);
      setIsAuthenticated(true);
      setUsername(username);
    }
  }, []);

  const login = (inputUsername: string, inputPassword: string): boolean => {
    const storedPassword = DEVICE_CREDENTIALS[inputUsername as keyof typeof DEVICE_CREDENTIALS];
    
    if (storedPassword && storedPassword === inputPassword) {
      setIsAuthenticated(true);
      setUsername(inputUsername);
      sessionStorage.setItem("device_auth", JSON.stringify({ username: inputUsername }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    sessionStorage.removeItem("device_auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
