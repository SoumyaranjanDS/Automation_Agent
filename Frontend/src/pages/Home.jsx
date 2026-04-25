import React from 'react'
import { useNavigate } from "react-router-dom";
import { Plus, Users, BarChart3, Settings, LogOut, Zap, Activity, Database } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("automation-agent-token");
    navigate("/login");
  };

  const actions = [
    { 
      title: "Create Campaign", 
      desc: "Launch a new outreach wizard", 
      icon: <Plus />, 
      color: "bg-blue-100 text-blue-600",
      path: "/create-campaign"
    },
    { 
      title: "View Leads", 
      desc: "Manage your imported contacts", 
      icon: <Users />, 
      color: "bg-indigo-100 text-indigo-600",
      path: "/campaigns" // We can build a list page later
    },
    { 
      title: "Analytics", 
      desc: "Check campaign performance", 
      icon: <BarChart3 />, 
      color: "bg-emerald-100 text-emerald-600" 
    },
    { 
      title: "System Settings", 
      desc: "Configure your preferences", 
      icon: <Settings />, 
      color: "bg-slate-100 text-slate-600" 
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-size-[20px_20px] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-slate-500 mt-2 text-lg">Welcome to your automation command center.</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="rounded-2xl border-slate-200">
            <LogOut size={18} className="mr-2" /> Sign Out
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Active Campaigns", value: "12", icon: Zap, color: "text-blue-600" },
            { label: "Total Leads", value: "4,284", icon: Database, color: "text-indigo-600" },
            { label: "Success Rate", value: "98.2%", icon: Activity, color: "text-emerald-600" },
          ].map((stat, i) => (
            <Card key={i} className="p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
                </div>
                <div className={`p-4 rounded-2xl bg-slate-50 ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={28} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {actions.map((action, i) => (
            <Card 
              key={i} 
              className="p-6 cursor-pointer hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group"
              onClick={() => action.path && navigate(action.path)}
            >
              <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:rotate-6 transition-transform`}>
                {action.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{action.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{action.desc}</p>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="overflow-hidden border-none shadow-2xl shadow-slate-200/50">
          <div className="px-8 py-5 border-b border-slate-100 bg-white/50 backdrop-blur-sm">
            <h3 className="font-bold text-slate-900 text-lg">Recent Imports</h3>
          </div>
          <div className="p-8 bg-white">
            <div className="space-y-6">
              {[
                { name: "Summer Promo CSV", time: "2 hours ago", status: "Completed", count: "+1.2k" },
                { name: "Q4 Leads Export", time: "5 hours ago", status: "Completed", count: "+842" },
                { name: "Website Signups", time: "Yesterday", status: "Active", count: "+124" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <Database size={20} />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold">{activity.name}</p>
                      <p className="text-sm text-slate-400">{activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-600 font-bold">{activity.count}</p>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{activity.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;