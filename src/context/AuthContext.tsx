import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  email: string;
  name: string;
  role: "mentor" | "learner" | "both";
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Check localStorage on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("skillbridge_auth");
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsLoggedIn(true);
      setUser(authData.user);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Simulate login with specific credentials
    if (
      email === "ps@gmail.com" &&
      password === "69"
    ) {
      const userData: User = {
        email: "ps@gmail.com",
        name: "69",
        role: "mentor",
      };

      setIsLoggedIn(true);
      setUser(userData);

      // Save to localStorage for persistence
      localStorage.setItem(
        "skillbridge_auth",
        JSON.stringify({
          isLoggedIn: true,
          user: userData,
        })
      );

      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("skillbridge_auth");
  };

  const value: AuthContextType = {
    isLoggedIn,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
