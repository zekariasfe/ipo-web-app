// src/app/layout/AdminSidebar.tsx
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigation = [
  { name: "Dashboard", href: "/admin", icon: "📊", roles: ["ADMIN", "SUPER_ADMIN"] },
  { name: "IPO Management", href: "/admin/ipos", icon: "🏢", roles: ["ADMIN", "SUPER_ADMIN"] },
  { name: "KYC Reviews", href: "/admin/kyc-reviews", icon: "👥", roles: ["ADMIN", "SUPER_ADMIN"] },
  { name: "Documents", href: "/admin/documents", icon: "📄", roles: ["ADMIN", "SUPER_ADMIN"] },
  { name: "Commissions", href: "/admin/commissions", icon: "💳", roles: ["ADMIN", "SUPER_ADMIN"] },
  { name: "Settings", href: "/admin/settings", icon: "⚙️", roles: ["SUPER_ADMIN"] }, // SUPER_ADMIN only
];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">IPO Admin Panel</h1>
        <p className="text-sm text-gray-400 mt-1">WCIB</p>
        {user && (
          <div className="mt-4 text-sm">
            <p>Logged in as: {user.name}</p>
            <p className="text-gray-400">{user.email}</p>
            <div className={`mt-2 inline-block px-2 py-1 text-xs rounded ${
              user.role === "SUPER_ADMIN" ? "bg-purple-600" : "bg-blue-600"
            }`}>
              {user.role}
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/admin"}
            className={({ isActive }) =>
              `block px-4 py-3 rounded mb-1 ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded flex items-center justify-center"
        >
          <span className="mr-2">🚪</span>
          Sign Out
        </button>
      </div>
    </div>
  );
}