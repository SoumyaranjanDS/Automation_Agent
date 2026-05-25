import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-[#F4F4F5] text-black pt-32 pb-24 px-6 md:px-12 selection:bg-black selection:text-white">
      <div className="max-w-[800px] mx-auto">
        
        <header className="mb-20">
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">03 // The Philosophy</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
            Generative AI is a toy. <br/>
            Deterministic logic is a tool.
          </h1>
        </header>

        <article className="prose prose-lg prose-p:text-gray-700 prose-p:leading-relaxed prose-h2:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6">
          <p className="text-xl font-medium text-black">
            We started Automation Agent because we were tired of "AI Wrappers". 
            You know the ones: you paste in a prompt, hit generate, and cross your fingers hoping it doesn't sound like a robot wrote it.
          </p>

          <h2>The Problem with LLMs in Sales</h2>
          <p>
            Sales outreach requires precision. A single out-of-place word ("synergize", "delve") instantly flags an email as AI-generated to the recipient. Large Language Models are probabilistic—they predict the next word based on vast, generic datasets. This means their default state is generic.
          </p>
          <p>
            When you apply generic probability to sales outreach, you get spam.
          </p>

          <h2>Our Approach: Agentic Workflows</h2>
          <p>
            Instead of relying on a single, massive prompt, we broke the SDR job down into discrete cognitive steps.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-8">
            <li><strong>Research:</strong> Fetching structured data from public APIs.</li>
            <li><strong>Strategy:</strong> Applying a deterministic heuristic to choose an angle.</li>
            <li><strong>Drafting:</strong> Writing the copy.</li>
            <li><strong>Criticism:</strong> A separate adversarial agent that aggressively rejects bad drafts.</li>
          </ul>

          <h2>Built for the Paranoid</h2>
          <p>
            We don't trust AI. That's why we built a system that checks its own work. If a draft doesn't pass the Critic's strict parameters for readability, tone, and spam-words, it never reaches your outbox.
          </p>

          <hr className="my-12 border-gray-300" />

          <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
            Founded in 2026. Built for high-volume outreach teams.
          </p>

        </article>

      </div>
    </div>
  );
};

export default About;
