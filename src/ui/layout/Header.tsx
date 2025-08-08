import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import Navbar from "./Navbar";
import UserArea from "./UserArea";

const Header = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/login";

  return (
    <header className="bg-white shadow-soft border-b border-gray-200 w-full px-3 fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center h-16 max-w-7xl mx-auto">
        <Logo />

        {!isLoginPage && (
          <div className="flex items-center gap-4">
            <Navbar />
            <UserArea />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
