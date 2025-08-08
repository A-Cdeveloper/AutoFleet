import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";
import { Suspense, type ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>;
};

export default ProtectedRoute;
