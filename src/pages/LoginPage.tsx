import { Navigate } from "react-router-dom";
import LoginForm from "@/features/login/components/LoginForm";
import { useAuthStore } from "@/store/authStore";

const LoginPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="self-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
