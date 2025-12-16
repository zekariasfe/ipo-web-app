// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, type UserRole } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requireKyc?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole = "USER",
  requireKyc = false
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthorized } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login, saving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAuthorized(requiredRole)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md p-8 bg-white rounded-lg shadow">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. 
            Required role: <strong>{requiredRole}</strong>
          </p>
          <Navigate to="/" replace />
        </div>
      </div>
    );
  }

  if (requireKyc && !user.isKycVerified && user.role === "USER") {
    return <Navigate to="/kyc" replace />;
  }

  return <>{children}</>;
}