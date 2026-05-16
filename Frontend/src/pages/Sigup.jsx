import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  Settings, 
  Cpu, 
  Zap, 
  Network,
  Binary,
  Terminal,
  CircuitBoard
} from "lucide-react";

const Sigup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/signup", form);
      localStorage.setItem("automation-agent-token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* ADVANCED BACKGROUND ENGINE */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Technical Grid */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
        />
        
        {/* Circuit Blobs */}
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-100/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-indigo-100/50 blur-[120px] rounded-full" />

        {/* Floating Technical Icons */}
        <motion.div 
          animate={{ y: [0, -40, 0], rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-[20%] text-slate-200 opacity-40"
        >
          <Settings size={60} />
        </motion.div>

        <motion.div 
          animate={{ x: [0, 30, 0], rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-[15%] text-slate-200 opacity-40"
        >
          <Cpu size={40} />
        </motion.div>

        {/* Animated Path 1 */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <motion.path
            d="M -100 200 Q 200 150 400 300 T 800 100"
            stroke="#3B82F6"
            strokeWidth="1"
            fill="none"
            animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* Technical Text Fragments */}
        <div className="absolute top-[30%] left-10 text-[8px] font-black text-slate-200 uppercase tracking-[0.5em] -rotate-90 origin-left">
          Sys_Process_Init_v4.2
        </div>
        <div className="absolute bottom-[30%] right-10 text-[8px] font-black text-slate-200 uppercase tracking-[0.5em] rotate-90 origin-right">
          Auth_Key_Encrypted
        </div>

        {/* Filler nodes */}
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping" />
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-ping delay-1000" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="relative">
          {/* Glowing Corners */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-blue-500 rounded-tl-lg z-20" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-indigo-500 rounded-br-lg z-20" />

          <div className="bg-white/80 border border-slate-200 p-6 md:p-8 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] backdrop-blur-md relative overflow-hidden">
            <div className="mb-6 text-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 mb-3 text-white shadow-lg shadow-blue-500/20"
              >
                <Network size={24} />
              </motion.div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
                INIT_SYS
              </h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Operator Registration
              </p>
            </div>

            <form onSubmit={handelSubmit} className="space-y-4">
              <div className="space-y-1.5 group/field">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  ID_NAME
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4 group-focus-within/field:text-blue-500 transition-colors" />
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-slate-50 border border-slate-100 text-slate-900 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-300 text-sm font-bold"
                    value={form.name}
                    onChange={handelChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5 group/field">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  COM_LINK
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4 group-focus-within/field:text-blue-500 transition-colors" />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-slate-50 border border-slate-100 text-slate-900 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-300 text-sm font-bold"
                    value={form.email}
                    onChange={handelChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5 group/field">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  ENC_KEY
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4 group-focus-within/field:text-blue-500 transition-colors" />
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full bg-slate-50 border border-slate-100 text-slate-900 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-300 text-sm font-bold"
                    value={form.password}
                    onChange={handelChange}
                    required
                  />
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white font-black py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all mt-4 disabled:opacity-70 group hover:bg-slate-800"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span className="uppercase tracking-widest text-xs">Deploy</span>
                    <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-50 text-center">
              <Link 
                to="/login"
                className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline underline-offset-4"
              >
                Login to Command Center
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center space-y-2">
           <div className="flex space-x-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-slate-200 rounded-full" />
              ))}
           </div>
          <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em]">
            AutomationAgent v1.0.4
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Sigup;
