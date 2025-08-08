import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useAuthStore } from "@/store/authStore";

const links = [{ to: "/vehicles/add", label: "Dodaj vozilo" }];

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx("uppercase font-bold font-roboto tracking-[0.05rem] text-xl", {
    "text-auto-primary": isActive,
    "text-navy-600 hover:text-auto-primary": !isActive,
  });

const Navbar = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) return null;
  return (
    <nav>
      <ul>
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} className={getNavLinkClass}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
