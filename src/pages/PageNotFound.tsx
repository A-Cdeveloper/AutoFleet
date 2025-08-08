import { useNavigate } from "react-router-dom";
import notfound from "../assets/404.png";
import Headline from "../ui/Headline";
import Button from "../ui/Button";
import { useCallback } from "react";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full max-w-7xl mx-auto p-5 flex flex-col justify-center items-center">
        <img src={notfound} alt="not found" className="w-[150px]" />
        <Headline level={2}>Stranica nije pronađena</Headline>
        <Button
          variation="danger"
          size="medium"
          onClick={handleClick}
          className="mt-5"
        >
          Home
        </Button>
      </main>
    </div>
  );
};

export default PageNotFound;
