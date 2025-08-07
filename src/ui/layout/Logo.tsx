import { Link } from "react-router-dom";
import Headline from "../Headline";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <Headline level={1} className="text-auto-secondary">
        AutoFleet
      </Headline>
    </Link>
  );
};

export default Logo;
