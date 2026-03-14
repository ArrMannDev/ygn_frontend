import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Dumbbell, LogOut, User as UserIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import type { User } from "../../types";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const checkUser = () => {
      const userJson = localStorage.getItem("user");
      if (userJson) {
        setUser(JSON.parse(userJson));
      } else {
        setUser(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    checkUser();

    // Listen for storage changes (for login/logout across tabs if needed,
    // but mainly to update when same-tab login happens if we use a better state mgmt later)
    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkUser);
    };
  }, [location]); // Re-check user when location changes (e.g. after login redirect)

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Classes", path: "/classes" },
    { name: "Memberships", path: "/memberships" },
    { name: "Trainers", path: "/trainers" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-zinc-950/80 backdrop-blur-md border-zinc-800 py-3"
          : "bg-transparent py-5",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-yellow-400 rounded-lg group-hover:scale-110 transition-transform">
              <Dumbbell className="h-6 w-6 text-zinc-950" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-yellow-400 transition-colors">
              YGN<span className="text-yellow-400">GYM</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-yellow-400 relative",
                  location.pathname === link.path
                    ? "text-yellow-400"
                    : "text-zinc-400",
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-400 rounded-full"
                  />
                )}
              </Link>
            ))}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <UserIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <Link to="/profile">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-zinc-400 hover:text-yellow-400"
                    >
                      Profile
                    </Button>
                  </Link>
                  {user.role === "ADMIN" && (
                    <Link to="/admin">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-zinc-400 hover:text-yellow-400 font-bold"
                      >
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-zinc-400 hover:text-red-400"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" size="sm">
                      Join Now
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900 border-b border-zinc-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-lg font-medium text-zinc-400 hover:text-yellow-400"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 text-white px-2 py-2 mb-2">
                      <UserIcon className="w-5 h-5 text-yellow-400" />
                      <span className="font-bold">{user.name}</span>
                    </div>
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full justify-center mb-2"
                      >
                        Profile
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full justify-center text-red-400 border-red-400/20"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full justify-center"
                      >
                        Log In
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="primary"
                        className="w-full justify-center"
                      >
                        Join Now
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
