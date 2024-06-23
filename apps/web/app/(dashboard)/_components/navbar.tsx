 import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "./navbar-routes";

const Navbar = () => {
  return (
    <div className="px-4 py-3 h-full border-b flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
