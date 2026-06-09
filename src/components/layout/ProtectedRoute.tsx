import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/store/authStore";

export function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    // Redirect them to the login page if not logged in
    return <Navigate to="/login" replace />;
  }

  // Render the child routes if logged in
  return <Outlet />;
}
