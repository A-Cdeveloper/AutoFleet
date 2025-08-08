import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useAuthStore } from "@/store/authStore";
import { Menu, X } from "lucide-react";
import { IconButton } from "@/ui";
import { useState, useCallback } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

const links = [{ to: "/vehicles/add", label: "Dodaj vozilo" }];

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(
    "uppercase font-bold font-roboto tracking-[0.05rem] text-xl block py-2 px-3 rounded-md transition-colors",
    {
      "text-auto-primary": isActive,
      "text-auto-secondary hover:text-auto-primary": !isActive,
    }
  );

const NavigationLinks = ({
  className = "",
  onCloseMenu,
}: {
  className?: string;
  onCloseMenu?: () => void;
}) => (
  <nav className={className}>
    <ul className="space-y-1">
      {links.map(({ to, label }) => (
        <li key={to}>
          <NavLink to={to} className={getNavLinkClass} onClick={onCloseMenu}>
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

const Navbar = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const { refEl } = useOutsideClick(closeMobileMenu, isMobileMenuOpen);

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Desktop Navigation */}
      <NavigationLinks className="hidden md:block" />

      {/* Mobile Burger Menu Icon */}
      <div className="md:hidden">
        <IconButton
          icon={
            isMobileMenuOpen ? (
              <X size={24} className="text-auto-secondary" />
            ) : (
              <Menu size={24} className="text-auto-secondary" />
            )
          }
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        />

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            <h2 id="mobile-menu-title" className="sr-only">
              Mobile Navigation Menu
            </h2>
            <div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
              className="absolute top-16 right-0 w-[300px] bg-white border border-gray-200 shadow-lg rounded-md"
              ref={refEl}
            >
              <div className="px-3 py-2 space-y-3">
                <NavigationLinks onCloseMenu={closeMobileMenu} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
