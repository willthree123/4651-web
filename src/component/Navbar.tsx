import { Link, useLocation } from "react-router-dom";
import SunIcon from "../icon/SunIcon";
import MoonIcon from "../icon/MoonIcon";

interface NavbarProps {
  readonly darkMode: boolean;
  readonly toggleDarkMode: () => void;
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const location = useLocation(); // Get the current location

  const linkClass = (path: string) => `btn btn-ghost w-full text-left text-lg ${location.pathname === path ? (darkMode ? "text-gray-200" : "text-gray-800") : ""}`;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-screen w-64 bg-base-200 text-base-content flex-col shadow-md fixed top-0 left-0 z-10">
        <div className="px-4 py-6">
          {/* App Name */}
          <Link to="/" className="btn btn-ghost normal-case text-2xl text-primary font-bold">
            DreamFrame
          </Link>
        </div>
        <nav className="flex-grow space-y-4 px-4">
          {/* Navigation Links */}
          <Link to="/" className={linkClass("/")}>
            Create
          </Link>
          <Link to="/browse" className={linkClass("/browse")}>
            Browse
          </Link>
          {/* testing */}
          {/* <Link to="/test" className={linkClass("/test")}>
            Test
          </Link> */}
        </nav>
        <div className="px-4 py-6">
          {/* Theme Switcher */}
          <label className="swap swap-rotate">
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
            <SunIcon />
            <MoonIcon />
          </label>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden bg-base-200 text-base-content shadow-md fixed top-0 left-0 w-full flex items-center justify-between px-4 py-2 z-10">
        <div className="flex items-center space-x-4">
          {/* App Name */}
          <Link to="/" className="btn btn-ghost normal-case text-2xl text-primary font-bold">
            DreamFrame
          </Link>
          {/* Navigation Links */}
          <Link to="/" className={`btn btn-ghost text-lg ${location.pathname === "/" ? (darkMode ? "text-gray-200" : "text-gray-800") : ""}`}>
            Create
          </Link>
          <Link to="/browse" className={`btn btn-ghost text-lg ${location.pathname === "/browse" ? (darkMode ? "text-gray-200" : "text-gray-800") : ""}`}>
            Browse
          </Link>
        </div>
        <div>
          {/* Theme Switcher */}
          <label className="swap swap-rotate">
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
            <SunIcon />
            <MoonIcon />
          </label>
        </div>
      </div>
    </>
  );
}
