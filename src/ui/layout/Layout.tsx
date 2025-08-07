import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto py-4 px-2 flex justify-center items-start h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
