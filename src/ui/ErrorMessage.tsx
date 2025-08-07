import Button from "./Button";
import Headline from "./Headline";

const ErrorMessage = ({ message }: { message?: string }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-6">
      <Headline level={2} className="text-auto-error">
        {message}
      </Headline>
      <Button
        variation="danger"
        size="medium"
        onClick={() => window.location.reload()}
      >
        Pokušaj ponovo
      </Button>
    </div>
  );
};

export default ErrorMessage;
