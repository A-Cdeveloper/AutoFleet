import { APP_NAME } from "@/constants";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 w-full px-3 text-[10px] text-center p-2 bg-white">
      @2025 {APP_NAME}
    </footer>
  );
};

export default Footer;
