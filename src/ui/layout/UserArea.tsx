import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Button from "@/ui/Button";
import { useCallback } from "react";
import toast from "react-hot-toast";

const UserArea = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    logout();
    toast.success("Uspešno ste se odjavili!");
  }, [logout]);

  const commonProps = {
    className: "uppercase",
  };

  return (
    <Button
      {...commonProps}
      variation={isAuthenticated ? "danger" : "secondary"}
      size="small"
      onClick={isAuthenticated ? handleLogout : handleLogin}
    >
      {isAuthenticated ? "Odjavi se" : "Prijavi se"}
    </Button>
  );
};

export default UserArea;
