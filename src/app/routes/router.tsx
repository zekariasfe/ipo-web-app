// src/app/routes/router.tsx - SIMPLIFIED
import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import Dashboard from "./Dashboard";
import Kyc from "./Kyc";
import IpoList from "./IpoList";
import Portfolio from "./Portfolio";
import Transactions from "./Transactions";
import Login from "./Login"; // This should work now
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminIpoManagement from "./admin/AdminIpoManagement";
import AdminKycReviews from "./admin/AdminKycReviews";
import CommissionManagement from "./admin/CommissionManagement";
import DocumentManagement from "./admin/DocumentManagement";
import ProtectedRoute from "../../components/ProtectedRoute";
import AdminSettings from './admin/AdminSettings';
import Register from "./Register";
import ClientRegister from "./register/ClientRegister";
import BrokerageRegister from "./register/BrokerageRegister";
import ItStaffRegister from "./register/ItStaffRegister";
import ViewerRegister from "./register/ViewerRegister";

export const router = createBrowserRouter([
  // Public and register Routes
   {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register/client",
    element: <ClientRegister />,
  },
    
  // Root redirect
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  
  // User Routes
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/kyc",
        element: <Kyc />,
      },
      {
        path: "/ipos",
        element: <IpoList />,
      },
      {
        path: "/portfolio",
        element: <Portfolio />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
    ],
  },
  
  // Admin Routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="ADMIN">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "ipos", element: <AdminIpoManagement /> },
      { path: "kyc-reviews", element: <AdminKycReviews /> },
      { path: "commissions", element: <CommissionManagement /> },
      { path: "documents", element: <DocumentManagement /> },
      { path: "settings", element: <AdminSettings /> }, 
      // ADD THIS LINE
    ],
  },
]);