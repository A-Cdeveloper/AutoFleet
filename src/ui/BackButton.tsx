import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useCallback } from "react";

const BackButton = ({ to = "/" }: { to?: string | number }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(to as string);
  }, [navigate, to]);

  return (
    <div className="mb-4 border-b-1 border-secondary-500/30">
      <Button
        onClick={handleClick}
        variation="transparent"
        size="small"
        className="!p-0"
      >
        {" "}
        ← Nazad
      </Button>
    </div>
  );
};

export default BackButton;
