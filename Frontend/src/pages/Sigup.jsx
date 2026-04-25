import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Sigup = () => {
  const navigate = useNavigate();
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

    try {
      const response = await api.post("/auth/signup", form);
      navigate("/login");
    } catch (error) {
      navigate("/signup")
    }
  };
  return (
    <div className="w-full max-w-md">
      <div className="relative group">
        {/* Glow effect background */}
        <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        
        <form 
          onSubmit={handelSubmit}
          className="relative bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-slate-400 mt-2">Join our automation platform</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter Your Name"
                className="w-full bg-slate-800/50 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500"
                value={form.name}
                onChange={handelChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter Your Email"
                className="w-full bg-slate-800/50 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500"
                value={form.email}
                onChange={handelChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter Your Password"
                className="w-full bg-slate-800/50 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-500"
                value={form.password}
                onChange={handelChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transform transition-all active:scale-[0.98] mt-4"
            >
              Get Started
            </button>
          </div>

          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account?{" "}
            <span 
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors"
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Sigup;
