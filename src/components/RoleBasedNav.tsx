// src/components/RoleBasedNav.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleBasedNav() {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // User navigation
  const userNav = [
    { name: "Dashboard", path: "/" },
    { name: "IPOs", path: "/ipos" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Transactions", path: "/transactions" },
  ];
  
  // Admin navigation (shown only to admins)
  const adminNav = [
    { name: "Admin", path: "/admin", icon: "👑" },
  ];
  
  return (
    <nav className="flex items-center space-x-4">
      {/* User Navigation */}
      {userNav.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
        >
          {item.name}
        </Link>
      ))}
      
      {/* Admin Navigation (only for admins) */}
      {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
        <Link
          to="/admin"
          className="flex items-center text-purple-700 hover:text-purple-800 px-3 py-2 text-sm font-medium bg-purple-50 rounded"
        >
          <span className="mr-2">👑</span>
          Admin Panel
        </Link>
      )}
    </nav>
  );
}