import React from "react";
import { ArrowUpRight } from "lucide-react";

const UseCases = () => {
  const cases = [
    {
      industry: "B2B SaaS",
      title: "Outbound at Scale",
      description: "Replace SDR teams with a single agent swarm that sources tech-stack data, identifies recent funding, and crafts highly technical pitches directly to CTOs.",
      color: "bg-blue-600",
    },
    {
      industry: "Real Estate",
      title: "Hyper-Local Acquisition",
      description: "Feed property listings into the engine. Agents automatically scrape local zoning laws and draft personalized letters to property owners based on public tax records.",
      color: "bg-emerald-600",
    },
    {
      industry: "Recruiting Agency",
      title: "Passive Candidate Sourcing",
      description: "Connect your ATS. When a role opens, agents parse GitHub repos and LinkedIn to score candidates and send highly specific outreach based on their recent commits.",
      color: "bg-amber-600",
    },
    {
      industry: "Marketing Agencies",
      title: "Client Generation",
      description: "Analyze a prospect's website performance, run a Lighthouse score, and automatically attach a custom PDF audit to the outreach email—all completely hands-free.",
      color: "bg-purple-600",
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-20">
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">02 // Applications</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter max-w-3xl">
            Built for operators. <br/>
            Across any vertical.
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <div key={i} className="group relative bg-[#111] border border-[#222] p-8 md:p-12 h-[400px] flex flex-col justify-between overflow-hidden hover:border-gray-600 transition-colors cursor-pointer">
              {/* Background Color Block on Hover */}
              <div className={`absolute inset-0 ${c.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{c.industry}</span>
                <ArrowUpRight className="text-gray-600 group-hover:text-white transition-colors" />
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">{c.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UseCases;
