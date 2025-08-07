import { useNavigate } from "react-router-dom";
import Button from "./Button";

const BackButton = ({ to = "/" }: { to?: string | number }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-4 border-b-1 border-secondary-500/30">
      <Button
        onClick={() => navigate(to as string)}
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
