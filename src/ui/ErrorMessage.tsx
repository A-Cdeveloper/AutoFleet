import Button from "./Button";
import Headline from "./Headline";
import { useCallback } from "react";

const ErrorMessage = ({ message }: { message?: string }) => {
  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center space-y-6">
      <Headline level={2} className="text-auto-error">
        {message}
      </Headline>
      <Button variation="danger" size="medium" onClick={handleReload}>
        Pokušaj ponovo
      </Button>
    </div>
  );
};

export default ErrorMessage;
