import { Link } from "react-router-dom";
import Headline from "@/ui/Headline";
import { APP_NAME } from "@/constants";
const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <Headline level={1} className="text-auto-secondary">
        {APP_NAME}
      </Headline>
    </Link>
  );
};

export default Logo;
