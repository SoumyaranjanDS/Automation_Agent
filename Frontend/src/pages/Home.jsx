import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Zap, 
  ArrowRight, 
  Cpu, 
  Settings, 
  Network, 
  ShieldCheck, 
  Activity,
  Database,
  Mail,
  CheckCircle2
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50/50 blur-[150px] rounded-full translate-y-1/4 -translate-x-1/4" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                System_Version_1.0.4_Live
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8"
            >
              AUTOMATE YOUR <br />
              <span className="text-blue-600">OUTREACH LAB.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium"
            >
              Deploy agentic AI to handle your entire lead generation and personalized email workflow. 
              Built for high-performance marketing laboratories.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link 
                to="/signup"
                className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3 hover:bg-slate-800 transition-all"
              >
                Initialize Account
                <ArrowRight size={18} />
              </Link>
              <Link 
                to="/login"
                className="w-full sm:w-auto bg-white border-2 border-slate-100 text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:border-slate-900 transition-all"
              >
                Access Portal
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating Lab Elements */}
        <div className="hidden lg:block">
          <motion.div 
            animate={{ y: [0, -30, 0], rotate: 10 }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-[10%] p-6 bg-white rounded-3xl shadow-2xl border border-slate-50"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <Database size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Data_Source</p>
                <p className="text-xs font-bold text-slate-900">Leads_Import.csv</p>
              </div>
            </div>
            <div className="w-40 h-2 bg-slate-50 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="h-full bg-blue-500" 
              />
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 30, 0], rotate: -5 }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-[10%] p-6 bg-white rounded-3xl shadow-2xl border border-slate-50"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Mail size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Agent_Status</p>
                <p className="text-xs font-bold text-slate-900 tracking-tight">AI_Draft_Generated</p>
              </div>
              <CheckCircle2 className="text-green-500 ml-2" size={20} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 bg-slate-50/50 px-4 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AGENTIC_ENGINE",
                desc: "AI agents that research leads and draft context-aware emails automatically.",
                icon: <Cpu className="text-blue-600" size={32} />,
              },
              {
                title: "HYPER_PERSONAL",
                desc: "Every email is unique, reflecting lead profile data for 10x conversion rates.",
                icon: <Zap className="text-indigo-600" size={32} />,
              },
              {
                title: "SECURE_LAB",
                desc: "Enterprise-grade security and data encryption for all your lead repositories.",
                icon: <ShieldCheck className="text-emerald-600" size={32} />,
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-4 uppercase">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 border-t border-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-lg">
              <Zap size={16} fill="currentColor" />
            </div>
            <span className="text-sm font-black text-slate-900 tracking-tighter uppercase">Automation Lab</span>
          </div>
          <div className="flex gap-8">
            {["Terms", "Privacy", "API", "Status"].map((link) => (
              <a key={link} href="#" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">
                {link}
              </a>
            ))}
          </div>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            © 2026 Automation_Agent_Collective
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;