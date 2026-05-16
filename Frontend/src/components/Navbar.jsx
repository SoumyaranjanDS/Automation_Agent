import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Menu, 
  X, 
  ArrowRight, 
  LayoutDashboard, 
  PlusCircle, 
  LogOut,
  Settings,
  ShieldCheck
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("automation-agent-token");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("automation-agent-token");
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard", protected: true },
    { name: "Create", path: "/create-campaign", protected: true },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-white/80 backdrop-blur-md py-3 shadow-sm border-b border-slate-100" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 transition-transform group-hover:rotate-12">
              <Zap size={20} fill="currentColor" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-black text-slate-900 tracking-tighter">AUTOMATION</span>
              <span className="text-[10px] block font-black text-blue-600 tracking-[0.2em] -mt-1 uppercase">Lab_Agent</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              (!link.protected || token) && (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                    location.pathname === link.path ? "text-blue-600" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <div className="flex items-center space-x-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                >
                  <LogOut size={14} />
                  Terminate Session
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login"
                  className="text-slate-600 hover:text-slate-900 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="bg-slate-900 text-white hover:bg-slate-800 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2"
                >
                  Get Access
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
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
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                (!link.protected || token) && (
                  <Link 
                    key={link.path} 
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-black text-slate-900 uppercase tracking-tighter border-b border-slate-50 pb-2"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="pt-4 flex flex-col gap-3">
                {token ? (
                  <button 
                    onClick={handleLogout}
                    className="w-full bg-slate-100 text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-xs"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="w-full bg-slate-100 text-slate-900 py-4 rounded-2xl text-center font-black uppercase tracking-widest text-xs">
                      Login
                    </Link>
                    <Link to="/signup" className="w-full bg-blue-600 text-white py-4 rounded-2xl text-center font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-500/20">
                      Sign Up
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
