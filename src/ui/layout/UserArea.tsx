import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import Button from "../Button";
import { useCallback } from "react";

const UserArea = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const commonProps = {
    className: "uppercase",
  };

  return (
    <Button
      {...commonProps}
      variation={isAuthenticated ? "danger" : "secondary"}
      size="small"
      onClick={isAuthenticated ? logout : handleLogin}
    >
      {isAuthenticated ? "Odjavi se" : "Prijavi se"}
    </Button>
  );
};

export default UserArea;
