import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Terminal, 
  Cpu, 
  Zap,
  ArrowRight,
  Sparkles,
  Network
} from "lucide-react";

const Home = () => {
  const token = localStorage.getItem("automation-agent-token");

  // Floating agent nodes animation variants
  const nodeVariants = {
    animate: (i) => ({
      y: [0, -15, 0],
      x: [0, i % 2 === 0 ? 10 : -10, 0],
      opacity: [0.4, 0.8, 0.4],
      transition: {
        duration: 4 + i,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="font-sans bg-[#0A0A0A] text-[#FAFAFA] min-h-screen overflow-hidden selection:bg-blue-500/30">
      
      {/* Background Agent Swarm Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30">
        <div className="absolute w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={nodeVariants}
            animate="animate"
            className={`absolute rounded-full blur-[2px] ${i % 2 === 0 ? 'bg-blue-400' : 'bg-emerald-400'}`}
            style={{
              width: Math.random() * 6 + 4 + 'px',
              height: Math.random() * 6 + 4 + 'px',
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-32 pb-24">
        
        {/* HERO SECTION */}
        <section className="flex flex-col items-center text-center mt-20 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 max-w-4xl"
          >
            Autonomous logic for <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              intelligent outreach.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mb-10 font-light leading-relaxed"
          >
            Deploy a swarm of specialized AI agents to research, draft, and deliver hyper-personalized campaigns without human bandwidth.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link 
              to={token ? "/dashboard" : "/signup"}
              className="group bg-white text-black px-8 py-3.5 rounded-full font-medium hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              {token ? "Enter Workspace" : "Initialize System"}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </section>

        {/* CORE FEATURES */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-20 border-t border-[#18181B]">
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-gradient-to-b from-[#18181B] to-[#0A0A0A] border border-[#27272A] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Cpu size={100}/></div>
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
              <Network size={24} />
            </div>
            <h3 className="text-xl font-medium mb-3">Agent Orchestration</h3>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              Multiple agents handling distinct roles—Planner, Strategist, and Writer—working in a deterministic loop.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-gradient-to-b from-[#18181B] to-[#0A0A0A] border border-[#27272A] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Terminal size={100}/></div>
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20">
              <Terminal size={24} />
            </div>
            <h3 className="text-xl font-medium mb-3">Deterministic Critic</h3>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              Every draft is scored against strict parameters. If it falls below threshold, it's sent back for revision automatically.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl bg-gradient-to-b from-[#18181B] to-[#0A0A0A] border border-[#27272A] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Zap size={100}/></div>
            <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center mb-6 border border-amber-500/20">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-medium mb-3">n8n Integration</h3>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              Native webhook support to plug your agent swarm directly into your existing CRM and email infrastructure.
            </p>
          </motion.div>
        </section>

      </div>
    </div>
  );
};

export default Home;