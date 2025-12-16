// src/app/layout/AdminLayout.tsx
import { Navigate, Outlet } from "react-router-dom"; // ← Add Outlet here
import { useAuth } from "../../context/AuthContext";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  // Strict admin-only access
  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <Outlet /> {/* This renders child routes */}
      </div>
    </div>
  );
}