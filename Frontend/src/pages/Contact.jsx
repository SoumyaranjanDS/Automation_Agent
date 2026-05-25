import React from "react";
import { ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white flex flex-col md:flex-row pt-20 md:pt-0">
      
      {/* Left Side - Typography */}
      <div className="flex-1 p-8 md:p-16 lg:p-24 flex flex-col justify-center border-b md:border-b-0 md:border-r border-black">
        <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">04 // Request Access</p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
          Stop typing.<br/>
          Start scaling.
        </h1>
        <p className="text-xl text-gray-600 max-w-md leading-relaxed">
          We are currently onboarding select B2B teams for our enterprise beta. Drop your details below to schedule a technical deep-dive.
        </p>
      </div>

      {/* Right Side - Brutalist Form */}
      <div className="flex-1 bg-[#F4F4F5] p-8 md:p-16 lg:p-24 flex flex-col justify-center">
        <form className="max-w-md w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-black">Work Email</label>
            <input 
              type="email" 
              placeholder="you@company.com" 
              className="w-full bg-white border-2 border-black p-4 outline-none focus:bg-yellow-50 transition-colors font-medium rounded-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-black">Company Size</label>
            <select className="w-full bg-white border-2 border-black p-4 outline-none focus:bg-yellow-50 transition-colors font-medium rounded-none appearance-none cursor-pointer">
              <option>1-10 employees</option>
              <option>11-50 employees</option>
              <option>51-200 employees</option>
              <option>201+ employees</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-black">Current Outbound Volume (Monthly)</label>
            <input 
              type="text" 
              placeholder="e.g. 5,000 emails" 
              className="w-full bg-white border-2 border-black p-4 outline-none focus:bg-yellow-50 transition-colors font-medium rounded-none"
              required
            />
          </div>

          <button 
            type="submit"
            className="group w-full bg-black text-white font-bold uppercase tracking-widest p-5 flex justify-between items-center hover:bg-gray-800 transition-colors mt-8 rounded-none"
          >
            <span>Submit Request</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>

        </form>
      </div>

    </div>
  );
};

export default Contact;
