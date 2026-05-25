import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Hexagon } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("automation-agent-token");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("automation-agent-token");
    navigate("/login");
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-200 ${
      scrolled ? "bg-white shadow-sm py-3" : "bg-white py-4"
    }`}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-center">
          
          {/* Left Side: Logo + Nav Links */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Hexagon className="text-gray-900" size={28} fill="currentColor" />
              <span className="text-[22px] font-bold text-gray-900 tracking-tight leading-none pt-1">
                auttio
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/product" className="text-[15px] font-medium text-gray-700 hover:text-gray-900">
                Product
              </Link>
              <Link to="/use-cases" className="text-[15px] font-medium text-gray-700 hover:text-gray-900">
                Use Cases
              </Link>
              <Link to="/about" className="text-[15px] font-medium text-gray-700 hover:text-gray-900">
                About
              </Link>
              <Link to="/contact" className="text-[15px] font-medium text-gray-700 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>

          {/* Right Side: Auth Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {token ? (
              <button
                onClick={handleLogout}
                className="text-[15px] font-medium text-gray-700 hover:text-gray-900 px-4 py-2"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="px-4 py-2 text-[15px] font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Sign in
                </Link>
                <Link 
                  to="/signup"
                  className="px-4 py-2 text-[15px] font-medium text-white bg-[#1A1A1A] rounded-lg hover:bg-black transition-colors"
                >
                  Start for free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 pt-4 pb-8 space-y-4 flex flex-col">
              <Link to="/product" className="text-[16px] font-medium text-gray-900 py-2 border-b border-gray-50 block" onClick={() => setIsOpen(false)}>
                Product
              </Link>
              <Link to="/use-cases" className="text-[16px] font-medium text-gray-900 py-2 border-b border-gray-50 block" onClick={() => setIsOpen(false)}>
                Use Cases
              </Link>
              <Link to="/about" className="text-[16px] font-medium text-gray-900 py-2 border-b border-gray-50 block" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="text-[16px] font-medium text-gray-900 py-2 border-b border-gray-50 block" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
              
              <div className="pt-4 flex flex-col gap-3">
                {token ? (
                  <button 
                    onClick={handleLogout}
                    className="w-full py-3 text-[16px] font-medium text-gray-700 border border-gray-300 rounded-lg"
                  >
                    Sign out
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="w-full text-center py-3 text-[16px] font-medium text-gray-700 border border-gray-300 rounded-lg">
                      Sign in
                    </Link>
                    <Link to="/signup" className="w-full text-center py-3 text-[16px] font-medium text-white bg-[#1A1A1A] rounded-lg">
                      Start for free
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

export default Navbar;
