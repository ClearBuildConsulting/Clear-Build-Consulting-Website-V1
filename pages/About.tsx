import React from 'react';
import { Link } from 'react-router';
import { Linkedin } from 'lucide-react';
import mikePhoto from "../components/assets/clear-build-profile.jpg";
import { Seo } from '../components/Seo';
import { JsonLd } from '../components/JsonLd';
import { personSchema } from '../components/schema';
import { Section, Container, Reveal } from '../components/primitives';

export const About: React.FC = () => {
  return (
    <div className="bg-obsidian min-h-screen">
      <Seo
        title="About"
        description="Clear Build Consulting is led by Mike Anderson, a senior project manager with over 20 years delivering complex civil engineering and infrastructure projects. Clear scope, clear systems, better decisions."
        path="/about"
      />
      <JsonLd data={personSchema} />
      <Section spacing="none" className="pt-24 pb-24">
        <Container>

          {/* Philosophy Section */}
          <Reveal className="max-w-5xl mb-24">
             <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-10">
               Clear scope. Clear systems. Better decisions.
             </h1>
             <div className="space-y-6 text-structural leading-relaxed text-lg">
               <p>
                 Clear Build Consulting was founded on a simple principle: most projects and businesses do not struggle because people lack effort. They struggle because things are unclear from the start.
               </p>
               <p>
                 In construction, that shows up as scope gaps, disputes and cost overruns. In small businesses, it shows up as repeated admin, workarounds and software that does not quite join up.
               </p>
               <p>
                 Small inefficiencies build up quietly. Jobs get passed around. Processes live in people’s heads. New tools are added before the basics are fixed.
               </p>
               <p>
                 Over time, that costs money.
               </p>
               <p>
                 Whether reviewing how a business operates or defining the scope of a complex programme, the approach is the same. Get clear first. Make sensible decisions. Introduce change only where it genuinely improves outcomes.
               </p>
             </div>
          </Reveal>

          {/* Founder Section */}
          <div className="flex flex-col lg:flex-row gap-16 border-t border-white/5 pt-20">

            <div className="lg:w-1/3">
               <div className="sticky top-24 max-w-sm w-full">
                 <div className="bg-surface border border-white/10 rounded-sm p-2 aspect-[3/4] flex flex-col">
                    <div className="flex-grow bg-obsidian flex items-center justify-center border border-dashed border-white/10 overflow-hidden">
                      <img
                        src={mikePhoto}
                        alt="Mike Anderson"
                        width={819}
                        height={1024}
                        loading="lazy"
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
                   I have spent over 20 years delivering major civil engineering and infrastructure projects where mistakes are expensive and decisions are scrutinised. The work involved leading specialist teams, defining scope clearly and managing cost and risk in high-pressure environments.
                 </p>
                 <p>
                   That background shaped how I approach every engagement.
                 </p>
                 <p className="text-white/90 font-medium">
                   Clear scope. Structured decisions. Proper documentation. Practical control.
                 </p>
                 <p>
                   These are not corporate buzzwords. They are the basics that stop projects drifting and businesses wasting time.
                 </p>
                 <p>
                   I started Clear Build to bring that same level of structure to smaller organisations that rarely get access to it.
                 </p>
                 <p>
                   For some clients, that means reviewing how their business actually works before introducing AI or automation. For others, it means providing independent, structured challenge on a complex infrastructure programme.
                 </p>
                 <p>
                   The principle is consistent.
                 </p>
                 <p className="text-white/90 font-medium">
                   Define properly before committing time or money.
                 </p>
                 <p>
                   I will not sell you something you do not need. If an idea does not make commercial sense, I will say so. My role is to give you a clear view of where you are and what a sensible next step looks like.
                 </p>
               </div>
            </div>

          </div>

          {/* Credibility Strip */}
          <div className="mt-24 pt-20 border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

              {/* Column 1 */}
              <Reveal>
                <span className="block font-display text-5xl font-bold text-white mb-6">
                  20+
                </span>
                <p className="text-structural text-lg font-light leading-relaxed">
                  Years solving complex delivery problems
                </p>
              </Reveal>

              {/* Column 2 */}
              <Reveal delay={70}>
                <h3 className="font-display text-3xl font-bold text-white mb-6 leading-tight">
                  Cost and risk control
                </h3>
                <p className="text-structural text-lg font-light leading-relaxed">
                  Clear scope, controlled change and margin protection
                </p>
              </Reveal>

              {/* Column 3 */}
              <Reveal delay={140}>
                <h3 className="font-display text-3xl font-bold text-white mb-6 leading-tight">
                  Clear systems and decision discipline
                </h3>
                <p className="text-structural text-lg font-light leading-relaxed">
                  Practical, evidence-based delivery
                </p>
              </Reveal>

            </div>
          </div>

        </Container>
      </Section>
    </div>
  );
};
