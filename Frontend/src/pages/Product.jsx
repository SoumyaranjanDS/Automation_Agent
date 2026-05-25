import React from "react";
import { motion } from "framer-motion";
import { Terminal, Code, Braces } from "lucide-react";

const Product = () => {
  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-24 px-6 md:px-12 selection:bg-black selection:text-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <header className="mb-24 border-b border-gray-200 pb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">01 // The Engine</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] max-w-4xl">
            Not another wrapper. <br/>
            A deterministic pipeline.
          </h1>
        </header>

        {/* Content Section 1: The Planner */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32 items-center">
          <div className="md:col-span-5">
            <h2 className="text-3xl font-bold mb-4">The Planner Agent</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              It doesn't just "write emails." The Planner agent first ingests your campaign goal and the target's public profile (LinkedIn, company site). It outputs a strict JSON schema containing the strategic angle, completely separated from the writing process.
            </p>
          </div>
          <div className="md:col-span-7 bg-[#111] text-gray-300 p-8 rounded-none border border-black shadow-[8px_8px_0px_#000] relative">
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
            </div>
            <pre className="mt-6 font-mono text-xs md:text-sm overflow-x-auto">
              <code className="language-json">
{`{
  "target_id": "usr_9841",
  "inferred_pain_point": "High SDR turnover",
  "selected_strategy": {
    "type": "pain-agitation",
    "tone": "direct, technical",
    "primary_value_prop": "deterministic automation"
  }
}`}
              </code>
            </pre>
          </div>
        </section>

        {/* Content Section 2: The Writer & Critic */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32 items-center md:flex-row-reverse">
          <div className="md:col-span-7 bg-[#FAFAFA] border border-gray-200 p-8">
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-200">
              <Terminal size={24} />
              <span className="font-mono text-sm font-bold uppercase">Critic_Agent_Log</span>
            </div>
            <div className="space-y-4 font-mono text-sm text-gray-600">
              <p>Evaluating draft_v1...</p>
              <p className="text-red-500">>> REJECTED: Spam phrase "unlock your potential" detected.</p>
              <p className="text-red-500">>> REJECTED: Flesch-Kincaid readability score too low (complex).</p>
              <p>Requesting rewrite from Writer_Agent...</p>
              <p>Evaluating draft_v2...</p>
              <p className="text-green-600">>> APPROVED: Score 92/100. Pushing to outbox.</p>
            </div>
          </div>
          <div className="md:col-span-5 md:pl-12">
            <h2 className="text-3xl font-bold mb-4">Adversarial Drafting</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Generative AI is inherently non-deterministic. To fix this, we pit two agents against each other. The Writer drafts the copy based on the Planner's schema. The Critic tears it apart based on strict heuristics (spam words, readability, length). It doesn't ship until the Critic approves.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Product;
