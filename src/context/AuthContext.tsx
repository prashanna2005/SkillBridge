import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id?: string;
  email: string;
  name: string;
  role: "mentor" | "learner" | "both";
  experience?: number;
  skills?: string[];
  languages?: string[];
  bio?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User }>;
  register: (userData: any) => Promise<{ success: boolean; message: string }>;
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

  const login = async (email: string, password: string): Promise<{ success: boolean; user?: User }> => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        setUser(data.user);

        // Save to localStorage for persistence
        localStorage.setItem(
          "skillbridge_auth",
          JSON.stringify({
            isLoggedIn: true,
            user: data.user,
          })
        );

        return { success: true, user: data.user };
      } else {
        console.error('Login failed:', data.message);
        return { success: false };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false };
    }
  };

  const register = async (userData: any): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: 'Registration failed' };
    }
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
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
