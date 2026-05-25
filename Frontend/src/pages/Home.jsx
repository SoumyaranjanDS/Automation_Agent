import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Terminal, 
  Cpu, 
  Zap, 
  Database, 
  ShieldCheck, 
  Globe, 
  BrainCircuit,
  MessageSquare,
  BarChart,
  ArrowRight,
  Code
} from "lucide-react";

const Home = () => {
  const [activeTab, setActiveTab] = useState('planner');
  const token = localStorage.getItem("automation-agent-token");

  return (
    <div className="font-sans selection:bg-blue-600 selection:text-white bg-[#0D0D12] text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 lg:px-8 overflow-hidden max-w-[1400px] mx-auto">
        {/* Glow effect behind icons */}
        <div className="absolute right-0 top-20 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Automation<br/>Agent Platform
            </h1>
            <p className="text-[#A1A1AA] text-lg mb-8 leading-relaxed">
              Build, deploy, and scale autonomous AI outreach pipelines. Orchestrate specialized agents to research, draft, and deliver hyper-personalized campaigns.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Link 
                to={token ? "/dashboard" : "/signup"}
                className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                {token ? "Go to Dashboard" : "Start building"}
              </Link>
              <Link 
                to={token ? "/dashboard" : "/login"}
                className="bg-transparent border border-[#3F3F46] text-white px-6 py-3 rounded-md font-medium hover:border-gray-400 transition-colors"
              >
                Access console
              </Link>
            </div>
            <p className="text-[#71717A] text-xs">
              Requires a verified agency account. <Link to="#" className="underline hover:text-white">Learn more</Link>
            </p>
          </div>

          {/* Floating App/Agent Icons (Mimicking the right side of the hero) */}
          <div className="hidden lg:grid grid-cols-3 gap-6 relative h-[400px]">
             {/* Staggered floating blocks */}
             <div className="absolute top-10 left-10 w-16 h-16 bg-[#18181B] rounded-xl border border-[#27272A] flex items-center justify-center shadow-2xl animate-[bounce_4s_infinite]">
                <Cpu className="text-blue-500" size={28} />
             </div>
             <div className="absolute top-40 left-[40%] w-20 h-20 bg-[#18181B] rounded-2xl border border-[#27272A] flex items-center justify-center shadow-2xl animate-[bounce_5s_infinite_0.5s]">
                <Terminal className="text-emerald-500" size={32} />
             </div>
             <div className="absolute top-20 right-10 w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-2xl animate-[bounce_6s_infinite_1s]">
                <BrainCircuit className="text-white" size={24} />
             </div>
             <div className="absolute bottom-20 left-20 w-16 h-16 bg-[#18181B] rounded-xl border border-[#27272A] flex items-center justify-center shadow-2xl animate-[bounce_4.5s_infinite_0.2s]">
                <Zap className="text-amber-500" size={28} />
             </div>
             <div className="absolute bottom-10 right-[30%] w-16 h-16 bg-[#18181B] rounded-xl border border-[#27272A] flex items-center justify-center shadow-2xl animate-[bounce_5.5s_infinite_0.8s]">
                <Database className="text-rose-500" size={28} />
             </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="px-6 lg:px-8 py-24 max-w-[1400px] mx-auto border-t border-[#27272A]">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 max-w-sm">Everything you need to scale outreach</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {/* Feature 1 */}
          <div className="group cursor-pointer">
            <div className="mb-4 text-emerald-400"><BrainCircuit size={24} /></div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">Lead Intelligence</h3>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">Scrape job roles and company data to surface hyper-relevant pain points before a single word is drafted.</p>
          </div>
          {/* Feature 2 */}
          <div className="group cursor-pointer">
            <div className="mb-4 text-emerald-400"><ShieldCheck size={24} /></div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">Deterministic Critic</h3>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">Score drafts out of 100 on clarity and spam risk. Drafts below threshold are automatically revised.</p>
          </div>
          {/* Feature 3 */}
          <div className="group cursor-pointer">
            <div className="mb-4 text-emerald-400"><Zap size={24} /></div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">n8n Automation</h3>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">Integrate natively with n8n to track opens, replies, and schedule context-aware follow-ups dynamically.</p>
          </div>
          {/* Feature 4 (Upcoming) */}
          <div className="group cursor-pointer">
            <div className="mb-4 text-emerald-400"><Database size={24} /></div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">CRM Sync (Upcoming)</h3>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">Bidirectional sync with HubSpot and Salesforce. New CRM leads automatically trigger the pipeline.</p>
          </div>
          {/* Feature 5 (Upcoming) */}
          <div className="group cursor-pointer">
            <div className="mb-4 text-emerald-400"><BarChart size={24} /></div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">A/B Testing (Upcoming)</h3>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">Generate variant subjects per lead. Backend tracks winners and feeds patterns back as few-shot examples.</p>
          </div>
          {/* Feature 6 (Upcoming) */}
          <div className="group cursor-pointer">
            <div className="mb-4 text-emerald-400"><Globe size={24} /></div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">Localization (Upcoming)</h3>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">Detect lead locale from domain/LinkedIn data and generate emails in the appropriate language automatically.</p>
          </div>
        </div>
      </section>

      {/* --- MULTI-AGENT ORCHESTRATION (Light Section) --- */}
      <section className="bg-white text-black py-24 px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Flexible agents for powerful campaigns</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: UI Mockup */}
            <div className="relative bg-[#F4F4F5] rounded-xl p-8 h-[400px] flex items-center justify-center overflow-hidden border border-[#E4E4E7]">
              {/* Mock Code Window */}
              <div className="absolute w-[80%] max-w-[400px] bg-[#18181B] rounded-lg shadow-2xl border border-[#27272A] overflow-hidden -mt-10 -ml-10 z-10">
                <div className="flex items-center px-4 py-3 border-b border-[#27272A] bg-[#09090B]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <span className="ml-4 text-xs font-mono text-[#71717A]">POST /api/agents/generate</span>
                </div>
                <div className="p-4 font-mono text-xs text-emerald-400 leading-loose">
                  <span className="text-pink-500">await</span> agent.<span className="text-blue-400">run</span>({'{'}<br/>
                  &nbsp;&nbsp;niche: <span className="text-amber-300">"SaaS"</span>,<br/>
                  &nbsp;&nbsp;strategy: <span className="text-amber-300">"pain-led"</span><br/>
                  {'}'});<br/>
                  <span className="text-[#71717A]">// 200 OK - Draft Generated</span>
                </div>
              </div>

              {/* Mock UI Card */}
              <div className="absolute w-[70%] max-w-[350px] bg-white rounded-lg shadow-xl border border-[#E4E4E7] p-4 bottom-10 right-0 z-20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><ShieldCheck size={16}/></div>
                  <div>
                    <div className="text-sm font-semibold">Critic Score: 92/100</div>
                    <div className="text-xs text-gray-500">Spam risk: Low</div>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-blue-600 h-1.5 rounded-full w-[92%]"></div></div>
              </div>
            </div>

            {/* Right: Interactive List */}
            <div className="flex flex-col gap-2">
              <p className="text-gray-600 mb-6">
                Our microservice architecture uses Agno agents to break down the complex task of copywriting into discrete, reviewable reasoning steps.
              </p>

              {/* Accordion Item 1 */}
              <div 
                onClick={() => setActiveTab('planner')}
                className={`p-5 rounded-xl cursor-pointer transition-all ${activeTab === 'planner' ? 'bg-white shadow-lg border border-gray-100' : 'hover:bg-gray-50 border border-transparent'}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Cpu size={20} className={activeTab === 'planner' ? 'text-blue-600' : 'text-gray-400'} />
                  <h4 className={`font-semibold ${activeTab === 'planner' ? 'text-black' : 'text-gray-600'}`}>Campaign Planner</h4>
                </div>
                {activeTab === 'planner' && (
                  <p className="text-sm text-gray-500 pl-8">Converts your high-level campaign goal into a structured strategy object containing messaging pillars and audience ICP.</p>
                )}
              </div>

              {/* Accordion Item 2 */}
              <div 
                onClick={() => setActiveTab('strategy')}
                className={`p-5 rounded-xl cursor-pointer transition-all ${activeTab === 'strategy' ? 'bg-white shadow-lg border border-gray-100' : 'hover:bg-gray-50 border border-transparent'}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Terminal size={20} className={activeTab === 'strategy' ? 'text-blue-600' : 'text-gray-400'} />
                  <h4 className={`font-semibold ${activeTab === 'strategy' ? 'text-black' : 'text-gray-600'}`}>Strategy Agent</h4>
                </div>
                {activeTab === 'strategy' && (
                  <p className="text-sm text-gray-500 pl-8">Selects the optimal outreach angle (e.g., pain-led, curiosity, direct ask) based on the lead profile and campaign data.</p>
                )}
              </div>

              {/* Accordion Item 3 */}
              <div 
                onClick={() => setActiveTab('writer')}
                className={`p-5 rounded-xl cursor-pointer transition-all ${activeTab === 'writer' ? 'bg-white shadow-lg border border-gray-100' : 'hover:bg-gray-50 border border-transparent'}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare size={20} className={activeTab === 'writer' ? 'text-blue-600' : 'text-gray-400'} />
                  <h4 className={`font-semibold ${activeTab === 'writer' ? 'text-black' : 'text-gray-600'}`}>Writer & Critic Loop</h4>
                </div>
                {activeTab === 'writer' && (
                  <p className="text-sm text-gray-500 pl-8">The Writer produces the draft, and the Critic immediately scores it for personalization and spam risk, iterating if necessary.</p>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- SHOWCASE / ROADMAP (Light Section) --- */}
      <section className="bg-gray-50 text-black py-24 px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Advanced Enterprise Roadmap</h2>
              <p className="text-gray-500">Post-MVP capabilities being built for scale.</p>
            </div>
            <Link to="#" className="hidden md:flex items-center text-blue-600 font-medium hover:text-blue-700">
              View changelog <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl p-8 text-white h-[300px] flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute top-6 left-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center">
                <BrainCircuit size={24} className="text-white"/>
              </div>
              <h3 className="text-xl font-bold mb-2">Memory-Based Personalisation</h3>
              <p className="text-sm text-gray-300">Store successful patterns in a vector DB to inform new drafts.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-gradient-to-br from-amber-900 to-slate-900 rounded-xl p-8 text-white h-[300px] flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute top-6 left-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center">
                <Database size={24} className="text-white"/>
              </div>
              <h3 className="text-xl font-bold mb-2">Real-Time Enrichment</h3>
              <p className="text-sm text-gray-300">Auto-enrich leads with Clearbit APIs for funding and tech stack data.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-xl p-8 text-white h-[300px] flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute top-6 left-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center">
                <ShieldCheck size={24} className="text-white"/>
              </div>
              <h3 className="text-xl font-bold mb-2">Spam & Deliverability</h3>
              <p className="text-sm text-gray-300">Critic Agent integrates with MailTester API to pre-check spam score.</p>
            </div>
            {/* Card 4 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 text-white h-[300px] flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute top-6 left-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center">
                <Cpu size={24} className="text-white"/>
              </div>
              <h3 className="text-xl font-bold mb-2">AI Model Router</h3>
              <p className="text-sm text-gray-300">Abstract LLM calls behind a router that selects GPT-4o or Claude 3.5 based on task.</p>
            </div>
          </div>

          {/* Large Quote Block */}
          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="mb-6"><Code size={32} className="text-blue-600" /></div>
              <h3 className="text-2xl md:text-3xl font-medium leading-tight mb-8">
                "The agentic approach replaces 4–6 hours of manual prospecting per rep per day with a fully autonomous pipeline."
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-tr from-blue-400 to-emerald-400"></div>
                </div>
                <div>
                  <div className="font-semibold text-sm">System Architect</div>
                  <div className="text-gray-500 text-xs">Internal Case Study</div>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full bg-gray-50 border border-gray-200 rounded-lg h-[250px] relative overflow-hidden">
                {/* Mock UI Dashboard inside quote block */}
                <div className="absolute top-0 w-full border-b border-gray-200 bg-white p-3 flex gap-4 text-xs font-medium text-gray-400">
                  <span className="text-black border-b-2 border-blue-600 pb-2">Campaigns</span>
                  <span>Analytics</span>
                  <span>Settings</span>
                </div>
                <div className="pt-16 p-4 space-y-3">
                  <div className="h-10 w-full bg-white border border-gray-200 rounded flex items-center px-4 justify-between">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div><div className="h-2 w-24 bg-gray-200 rounded"></div></div>
                    <div className="h-4 w-12 bg-blue-100 rounded"></div>
                  </div>
                  <div className="h-10 w-full bg-white border border-gray-200 rounded flex items-center px-4 justify-between">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div><div className="h-2 w-32 bg-gray-200 rounded"></div></div>
                    <div className="h-4 w-12 bg-blue-100 rounded"></div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className="relative py-32 px-6 lg:px-8 overflow-hidden border-b border-[#27272A]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Initialize your workspace</h2>
            <p className="text-[#A1A1AA] mb-8">
              Launch your first multi-agent campaign in minutes. Full API access and n8n webhook integration included.
            </p>
            <div className="flex gap-4">
              <Link to={token ? "/dashboard" : "/signup"} className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                {token ? "Go to Dashboard" : "Deploy now"}
              </Link>
              <Link to="#" className="bg-transparent border border-[#3F3F46] text-white px-6 py-3 rounded-md font-medium hover:border-gray-400 transition-colors">
                Read documentation
              </Link>
            </div>
          </div>
          
          {/* Glossy Icon Box */}
          <div className="w-64 h-64 bg-gradient-to-br from-[#18181B] to-[#09090B] border border-[#27272A] rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Zap size={64} className="text-blue-500" strokeWidth={1} />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="px-6 lg:px-8 py-16 max-w-[1400px] mx-auto text-sm text-[#A1A1AA]">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <h3 className="text-white font-bold text-lg mb-4">Automation Agent</h3>
            <p className="mb-4 max-w-xs">An end-to-end, AI-driven sales automation system designed to eliminate manual effort.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="hover:text-white">Agents</Link></li>
              <li><Link to="#" className="hover:text-white">Integrations</Link></li>
              <li><Link to="#" className="hover:text-white">Pricing</Link></li>
              <li><Link to="#" className="hover:text-white">Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="hover:text-white">Documentation</Link></li>
              <li><Link to="#" className="hover:text-white">API Reference</Link></li>
              <li><Link to="#" className="hover:text-white">Case Studies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="hover:text-white">About</Link></li>
              <li><Link to="#" className="hover:text-white">Blog</Link></li>
              <li><Link to="#" className="hover:text-white">Careers</Link></li>
              <li><Link to="#" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#27272A] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Automation Agent Platform</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white">Terms of Service</Link>
            <Link to="#" className="hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;