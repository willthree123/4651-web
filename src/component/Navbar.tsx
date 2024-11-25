import { Link } from "react-router-dom";
import SunIcon from "../icon/SunIcon";
import MoonIcon from "../icon/MoonIcon";

interface NavbarProps {
  readonly darkMode: boolean;
  readonly toggleDarkMode: () => void;
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-screen w-64 bg-base-200 text-base-content flex-col shadow-md fixed top-0 left-0">
        <div className="px-4 py-6">
          {/* App Name */}
          <Link to="/" className="btn btn-ghost normal-case text-2xl text-primary font-bold">
            App Name
          </Link>
        </div>
        <nav className="flex-grow space-y-4 px-4">
          {/* Navigation Links */}
          <Link to="/" className="btn btn-ghost w-full text-left text-lg">
            Home
          </Link>
          <Link to="/browse" className="btn btn-ghost w-full text-left text-lg">
            Browse
          </Link>
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
      <div className="lg:hidden bg-base-200 text-base-content shadow-md fixed top-0 left-0 w-full flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-4">
          {/* App Name */}
          <Link to="/" className="btn btn-ghost normal-case text-2xl text-primary font-bold">
            App Name
          </Link>
          {/* Navigation Links */}
          <Link to="/" className="btn btn-ghost text-lg">
            Home
          </Link>
          <Link to="/browse" className="btn btn-ghost text-lg">
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
