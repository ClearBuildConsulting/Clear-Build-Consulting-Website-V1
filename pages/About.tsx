import React from 'react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
import mikePhoto from "../components/assets/Clear Build Profile Pic.png";

export const About: React.FC = () => {
  return (
    <div className="bg-obsidian min-h-screen pt-24 pb-24">
      <div className="container mx-auto px-6">
        
        {/* Philosophy Section */}
        <div className="max-w-5xl mb-24">
             <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-10">
               Clarity reduces risk. Discipline protects margin.
             </h1>
             <div className="space-y-6 text-structural leading-relaxed text-lg">
               <p>
                 ClearBuild Consulting was founded on a simple premise: projects and businesses rarely struggle because people lack effort. They struggle because processes are unclear, overcomplicated or poorly defined from the outset.
               </p>
               <p>
                 In construction, that shows up as scope gaps and cost overruns. In small businesses, it shows up as manual workarounds, duplicated effort and systems that do not quite join up.
               </p>
               <p>
                 Early assumptions compound. Unclear or overly complex processes create pain that compounds into cost. Small inefficiencies repeated across a business become material over time.
               </p>
               <p>
                 We take a senior, measured approach to operational problems. Whether mapping an AI opportunity roadmap or defining a domestic scope of works, the principle is consistent: clarity reduces risk and disciplined process design protects margin.
               </p>
               <p>
                 The focus is practical. Plain English. Defined scope. Clear assumptions. A proper understanding of how work actually happens before introducing automation or new tooling.
               </p>
             </div>
        </div>

        {/* Founder Section */}
        <div className="flex flex-col lg:flex-row gap-16 border-t border-white/5 pt-20">
          
          <div className="lg:w-1/3">
             <div className="sticky top-24 max-w-sm w-full">
               <div className="bg-surface border border-white/10 rounded-sm p-2 aspect-[3/4] flex flex-col">
                  <div className="flex-grow bg-obsidian flex items-center justify-center border border-dashed border-white/10 overflow-hidden">
  <img
    src={mikePhoto}
    alt="Mike Anderson"
    className="w-full h-full object-cover"
  />
</div>
                  <div className="mt-4 text-center pb-2">
                    <span className="block text-white font-display font-bold text-lg">Mike Anderson</span>
                    <span className="block text-structural text-sm">Founder & Principal Consultant</span>
                  </div>
               </div>
               
               <a 
                 href="https://www.linkedin.com/in/michael-anderson-7996b546/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="mt-6 flex items-center justify-center gap-3 w-full bg-obsidian border border-white/10 rounded-sm py-4 px-6 hover:border-white/30 transition-all duration-300 group"
               >
                 <Linkedin size={20} className="text-white group-hover:text-focus transition-colors" />
                 <span className="text-white font-medium">Connect on LinkedIn</span>
               </a>
             </div>
          </div>

          <div className="lg:w-2/3">
             <h2 className="font-display text-3xl font-bold text-white mb-8">
               I’m Mike Anderson.
             </h2>
             <div className="space-y-6 text-structural leading-relaxed text-lg">
               <p>
                 I’ve spent over 20 years delivering complex civil engineering and infrastructure programmes in regulated, high-governance environments. My work has involved leading multidisciplinary teams, defining scope clearly, managing commercial risk and producing documentation that must withstand detailed scrutiny.
               </p>
               <p>
                 That background shapes how I approach every engagement.
               </p>
               <p className="text-white/90 font-medium">
                 Scope clarity. Structured decision making. Version control. Defensible reasoning. Practical governance.
               </p>
               <p>
                 These are not abstract management concepts. They are the disciplines required to deliver complex work without drift.
               </p>
               <p>
                 I started ClearBuild to apply that same rigour to smaller organisations and individual clients who rarely have access to it. In growing businesses, inefficiencies often sit in plain sight. Processes evolve informally. Responsibilities blur. Automation is introduced before structure.
               </p>
               <p>
                 Whether I am helping a business owner understand where AI can genuinely improve operations, implementing a defined automation, or helping a homeowner obtain like-for-like builder quotations, the underlying discipline is the same.
               </p>
               <p>
                 Define properly before committing time or capital.
               </p>
               <p>
                 I do not over-promise. I do not take on work that is not commercially justified. My role is to give you a clear, structured view of where you are and what a sensible next step looks like.
               </p>
             </div>
          </div>

        </div>

        {/* Credibility Strip */}
        <div className="mt-24 pt-20 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Column 1 */}
            <div>
              <span className="block font-display text-5xl font-bold text-white mb-6">
                20+
              </span>
              <p className="text-structural text-lg font-light leading-relaxed">
                Years delivering complex programmes
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="font-display text-3xl font-bold text-white mb-6 leading-tight">
                Commercial risk management
              </h3>
              <p className="text-structural text-lg font-light leading-relaxed">
                Structured scope, change and margin control
              </p>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="font-display text-3xl font-bold text-white mb-6 leading-tight">
                Process & governance discipline
              </h3>
              <p className="text-structural text-lg font-light leading-relaxed">
                Evidence-led decision making and delivery
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};