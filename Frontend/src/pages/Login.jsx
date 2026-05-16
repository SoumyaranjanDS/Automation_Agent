import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { motion } from "framer-motion";
import { 
  Mail, 
  Lock, 
  LogIn, 
  ArrowRight, 
  Loader2, 
  Zap, 
  Terminal, 
  Activity,
  Fingerprint,
  Code2,
  Box,
  Share2
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setform] = useState({
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
      const response = await api.post("/auth/login", form);
      localStorage.setItem("automation-agent-token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* ADVANCED BACKGROUND ENGINE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Technical Dots */}
        <div className="absolute inset-0 opacity-40" 
             style={{ backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
        />
        
        {/* Soft Depth Blobs */}
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-50/50 blur-[100px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-50/50 blur-[100px] rounded-full" />

        {/* Animated Scanning Beam */}
        <motion.div 
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[1px] bg-blue-400/20 z-0"
        />

        {/* Floating Code Icons */}
        <motion.div 
          animate={{ y: [0, 50, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[15%] left-[10%] text-slate-300"
        >
          <Code2 size={40} />
        </motion.div>

        <motion.div 
          animate={{ y: [0, -50, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-[15%] right-[10%] text-slate-300"
        >
          <Box size={30} />
        </motion.div>

        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-[5%] text-slate-300"
        >
          <Share2 size={50} />
        </motion.div>

        {/* Technical Text Filler */}
        <div className="absolute top-10 left-10 text-[7px] font-black text-slate-200 uppercase tracking-[1em]">
          Access_Node_Status:04
        </div>
        <div className="absolute bottom-10 right-10 text-[7px] font-black text-slate-200 uppercase tracking-[1em]">
          Protocol_Secure_v1
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="relative">
          {/* Machine ID Tag */}
          <div className="absolute -top-4 left-6 bg-slate-900 text-white px-3 py-0.5 rounded-t-lg text-[8px] font-black uppercase tracking-widest z-20">
            Node_Access
          </div>

          <div className="bg-white/90 border-x-2 border-b-2 border-slate-900 p-6 md:p-8 rounded-b-3xl rounded-tr-3xl shadow-[15px_15px_0px_rgba(241,245,249,0.8)] backdrop-blur-sm relative">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                  <Fingerprint size={20} />
                </div>
                <div className="text-right">
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                  <span className="text-[10px] font-bold text-green-500 uppercase">Online</span>
                </div>
              </div>
              
              <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none mb-1">
                CMD_LOG
              </h1>
              <p className="text-slate-400 font-medium text-[10px] uppercase tracking-wider">
                System Authorization
              </p>
            </div>

            <form onSubmit={handelSubmit} className="space-y-4">
              <div className="space-y-1.5 group/field">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Portal_ID
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4 group-focus-within/field:text-blue-500 transition-colors" />
                  <input
                    name="email"
                    type="email"
                    placeholder="admin@auth.io"
                    className="w-full bg-slate-50 border border-slate-100 text-slate-900 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-slate-900 transition-all placeholder:text-slate-300 text-sm font-bold"
                    value={form.email}
                    onChange={handelChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5 group/field">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Access_Key
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4 group-focus-within/field:text-blue-500 transition-colors" />
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-100 text-slate-900 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-slate-900 transition-all placeholder:text-slate-300 text-sm font-bold"
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all mt-4 shadow-lg shadow-blue-500/20 disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span className="uppercase tracking-widest text-xs">Authorize</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
              <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">New Node?</span>
              <Link 
                to="/signup"
                className="text-slate-900 text-[9px] font-black uppercase tracking-widest hover:underline underline-offset-4"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 px-2">
          <div className="h-0.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="h-full bg-blue-500/30" 
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
