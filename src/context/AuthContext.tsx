// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isKycVerified: boolean;
  phone?: string;
  createdAt?: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthorized: (requiredRole: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database (In production, this comes from your backend)
const MOCK_USERS = [
  {
    id: "super-001",
    name: "System Administrator",
    email: "superadmin@wcib.com",
    password: "super123", // In production, NEVER store passwords in frontend
    role: "SUPER_ADMIN" as UserRole,
    isKycVerified: true,
    phone: "+251911000001",
  },
  {
    id: "admin-001",
    name: "Admin Manager",
    email: "admin@wcib.com",
    password: "admin123",
    role: "ADMIN" as UserRole,
    isKycVerified: true,
    phone: "+251911000002",
  },
  {
    id: "user-001",
    name: "John Investor",
    email: "user@example.com",
    password: "user123",
    role: "USER" as UserRole,
    isKycVerified: false,
    phone: "+251911000003",
  },
   {
    id: "new-client-001",
    name: "New Client",
    email: "client@example.com",
    password: "client123",
    role: "USER" as UserRole,
    isKycVerified: false,
    kycStatus: "not_started",
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("ipo_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("ipo_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find user in mock database
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error("Invalid email or password");
      }
      
      // Remove password before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      const userWithLoginTime = {
        ...userWithoutPassword,
        lastLogin: new Date().toISOString(),
      };
      
      setUser(userWithLoginTime);
      localStorage.setItem("ipo_user", JSON.stringify(userWithLoginTime));
      return true;
      
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ipo_user");
  };

  const isAuthorized = (requiredRole: UserRole): boolean => {
    if (!user) return false;
    
    // Role hierarchy: SUPER_ADMIN > ADMIN > USER
    const roleHierarchy = {
      "USER": 1,
      "ADMIN": 2,
      "SUPER_ADMIN": 3,
    };
    
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthorized }}>
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