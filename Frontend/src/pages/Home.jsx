import React from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("automation-agent-token");
    navigate("/login");
  };

  const actions = [
    { title: "New Automation", desc: "Create a new workflow", icon: "⚡", color: "from-blue-600 to-cyan-500" },
    { title: "Active Agents", desc: "Manage running processes", icon: "🤖", color: "from-indigo-600 to-purple-500" },
    { title: "Analytics", desc: "View performance metrics", icon: "📊", color: "from-emerald-600 to-teal-500" },
    { title: "Settings", desc: "Configure system preferences", icon: "⚙️", color: "from-slate-600 to-slate-500" },
  ];

  return (
    <div className="w-full max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Agent Dashboard
          </h1>
          <p className="text-slate-400 mt-2 text-lg">Welcome back to your automation command center.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2.5 rounded-xl border border-slate-700 transition-all shadow-lg active:scale-95"
        >
          Sign Out
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: "Total Tasks", value: "1,284", trend: "+12%" },
          { label: "Uptime", value: "99.9%", trend: "Stable" },
          { label: "Active Nodes", value: "42", trend: "+3" },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${stat.trend.includes('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, i) => (
          <div 
            key={i} 
            className="group relative cursor-pointer"
          >
            <div className={`absolute -inset-0.5 bg-linear-to-r ${action.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500`}></div>
            <div className="relative bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all h-full">
              <div className={`w-12 h-12 rounded-xl bg-linear-to-r ${action.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                {action.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{action.title}</h3>
              <p className="text-slate-400 text-sm">{action.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="mt-12 bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <h3 className="font-bold text-white">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-sm text-slate-300 font-medium">Data Sync completed for Node #{100 + i}</p>
                    <p className="text-xs text-slate-500">2 hours ago</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400">View Logs</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;