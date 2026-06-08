import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { Search, Lightbulb, Map, Hammer, CheckCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Seo } from '../components/Seo';
import { JsonLd } from '../components/JsonLd';
import { serviceSchema, faqSchema, aiAdvisoryFaqs } from '../components/schema';
import { Section, Container, Eyebrow, Reveal } from '../components/primitives';
import { useInView } from '../hooks/useInView';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export const AIAdvisory: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();
  const { ref: lineRef, inView: lineDrawn } = useInView<HTMLDivElement>({ threshold: 0.3, once: true });
  const drawn = lineDrawn || prefersReduced;

  return (
    <div className="bg-obsidian min-h-screen">
      <Seo
        title="AI Advisory"
        description="Practical AI consultancy for UK SMEs. We map how your operations run, identify where AI delivers measurable improvement, and implement with discipline. Book an AI readiness review."
        path="/ai-advisory"
      />
      <JsonLd
        data={[
          serviceSchema({
            name: 'AI Advisory',
            description:
              'Practical AI consultancy for UK SMEs. We map how your operations run, identify where AI delivers measurable improvement, and implement with discipline.',
            path: '/ai-advisory',
          }),
          faqSchema(aiAdvisoryFaqs),
        ]}
      />
      <Section spacing="none" className="pt-24 pb-24">
        <Container>

        {/* 1. Hero Section */}
        <Reveal className="max-w-4xl mb-24">
          <Eyebrow className="text-focus mb-4">Primary Service</Eyebrow>
          <h1 className="font-display text-display-lg font-extrabold text-white mb-6">
            Practical AI advisory for growing businesses.
          </h1>
          <p className="text-xl text-structural leading-relaxed mb-10 max-w-2xl font-light">
            We look at how your operations actually run, where time is lost, where decisions stall and where manual work creeps in. Then we identify where AI will make a measurable difference.
          </p>
          <div className="flex flex-col items-start gap-3">
             <Link to="/contact">
                <Button className="px-8 py-4 text-lg">Book a call</Button>
             </Link>
             <span className="text-sm text-structural font-medium tracking-wide">
               A short, structured conversation to understand your situation and see how we can help.
             </span>
          </div>
          <p className="mt-6 text-sm font-semibold text-white/70 uppercase tracking-widest">
            See how the AI Audit works below
          </p>
          <p className="mt-8 text-sm text-structural">
            Want the detail upfront?{' '}
            <a href="/clearbuild-capability-pack.html" target="_blank" rel="noopener noreferrer"
               className="text-white font-medium underline underline-offset-4 hover:text-focus transition-colors">
              Read our Capability Pack
            </a>
          </p>
        </Reveal>

        {/* 2. Process Diagram Section */}
        <Reveal className="mb-32">
          <div className="relative" ref={lineRef}>
            {/* Connector line (desktop): draws itself in on scroll. */}
            <div
              className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-focus origin-left"
              style={{
                transform: drawn ? 'scaleX(1)' : 'scaleX(0)',
                transition: prefersReduced ? undefined : 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            ></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              
              {/* Step 1 */}
              <div className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-surface border border-white/10 rounded-full flex items-center justify-center z-10 mb-6 group-hover:border-focus/50 transition-colors duration-500">
                   <Search className="text-white w-8 h-8" strokeWidth={1.5} />
                </div>
                <span className="text-focus font-mono text-sm mb-3">01</span>
                <h3 className="text-lg font-bold text-white mb-4 h-12 flex items-center justify-center">Discovery & Reality Mapping</h3>
                <p className="text-structural text-sm leading-relaxed">
                  Structured stakeholder interviews and workflow mapping to understand current-state operations, constraints, governance, and decision flow.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-surface border border-white/10 rounded-full flex items-center justify-center z-10 mb-6 group-hover:border-focus/50 transition-colors duration-500">
                   <Lightbulb className="text-white w-8 h-8" strokeWidth={1.5} />
                </div>
                <span className="text-focus font-mono text-sm mb-3">02</span>
                <h3 className="text-lg font-bold text-white mb-4 h-12 flex items-center justify-center">Opportunity Identification</h3>
                <p className="text-structural text-sm leading-relaxed">
                  Identify practical AI and automation use cases. Each opportunity assessed for impact, feasibility, risk, and organisational readiness.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-surface border border-white/10 rounded-full flex items-center justify-center z-10 mb-6 group-hover:border-focus/50 transition-colors duration-500">
                   <Map className="text-white w-8 h-8" strokeWidth={1.5} />
                </div>
                <span className="text-focus font-mono text-sm mb-3">03</span>
                <h3 className="text-lg font-bold text-white mb-4 h-12 flex items-center justify-center">Prioritised Roadmap</h3>
                <p className="text-structural text-sm leading-relaxed">
                  Clear “Do Now / Do Later / Do Not Pursue” framework, with sequencing logic and 90-day priorities.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-surface border border-white/10 rounded-full flex items-center justify-center z-10 mb-6 group-hover:border-focus/50 transition-colors duration-500">
                   <Hammer className="text-white w-8 h-8" strokeWidth={1.5} />
                </div>
                <span className="text-focus font-mono text-sm mb-3">04</span>
                <h3 className="text-lg font-bold text-white mb-4 h-12 flex items-center justify-center">Advisory & Selective Support</h3>
                <p className="text-structural text-sm leading-relaxed">
                  Ongoing advisory engagement available where implementation judgement is required. This is not staff augmentation or a delivery programme.
                </p>
              </div>

            </div>
          </div>
        </Reveal>

        {/* 3. What the Audit Produces */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 border-t border-white/5 pt-24">
            
            {/* Left Column: Deliverables */}
            <div>
                <h2 className="font-display text-display-md font-bold text-white mb-6">What the audit produces</h2>
                <p className="text-xl text-structural mb-8 font-light">
                    This is a structured engagement, not an open-ended discussion. At the end of the discovery and analysis phase, you receive a written report containing:
                </p>
                <ul className="space-y-4">
                    {[
                        "AI Opportunity Register (prioritised, impact-scored)",
                        "Do Now / Do Later / Do Not Touch framework",
                        "90-Day Roadmap with sequencing assumptions",
                        "Governance and risk summary",
                        "Executive-ready written report"
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-start">
                            <div className="mt-1.5 mr-4 w-1.5 h-1.5 bg-focus rounded-full flex-shrink-0"></div>
                            <span className="text-white font-medium">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Column: What This Service Is Not */}
            <div className="bg-surface border border-white/5 p-8 md:p-10 rounded-sm">
                <h2 className="font-display text-xl font-bold text-white mb-8 border-b border-white/10 pb-4">What this service is not</h2>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-white font-bold mb-2 text-sm">Not a software sales exercise</h3>
                        <p className="text-structural text-sm leading-relaxed">
                            We don't start with tools and work backwards. Technology is considered only after we understand the business problem.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-2 text-sm">Not a transformation programme</h3>
                        <p className="text-structural text-sm leading-relaxed">
                           The audit is a scoped diagnostic. Implementation support is selective and separately defined.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-2 text-sm">Not a headcount reduction exercise</h3>
                        <p className="text-structural text-sm leading-relaxed">
                            Savings are framed as capacity released — time returned to people so they can focus on higher-value work.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-2 text-sm">Not for every business</h3>
                        <p className="text-structural text-sm leading-relaxed">
                            If we don't think an audit will produce defensible, actionable findings, we'll say so before you commit.
                        </p>
                    </div>
                </div>
            </div>
        </Reveal>

        {/* 4. Engagement Model */}
        <Reveal className="max-w-4xl mx-auto mb-32 text-center">
            <h2 className="font-display text-display-md font-bold text-white mb-10">Engagement Model</h2>
            <div className="bg-obsidian border border-white/10 p-8 md:p-12 rounded-sm inline-block w-full text-left">
               <div className="flex justify-center">
                   <ul className="space-y-4">
                       <li className="flex items-center text-white">
                           <CheckCircle size={18} className="text-focus mr-3 flex-shrink-0" />
                           Fixed-scope diagnostic engagement
                       </li>
                       <li className="flex items-center text-white">
                           <CheckCircle size={18} className="text-focus mr-3 flex-shrink-0" />
                           Typically 3–6 weeks depending on organisational size
                       </li>
                       <li className="flex items-center text-white">
                           <CheckCircle size={18} className="text-focus mr-3 flex-shrink-0" />
                           Structured discovery interviews
                       </li>
                       <li className="flex items-center text-white">
                           <CheckCircle size={18} className="text-focus mr-3 flex-shrink-0" />
                           Executive debrief session included
                       </li>
                       <li className="flex items-center text-white">
                           <CheckCircle size={18} className="text-focus mr-3 flex-shrink-0" />
                           Implementation advisory available separately
                       </li>
                   </ul>
               </div>
            </div>
        </Reveal>

        {/* 5. Call to Action */}
        <Reveal className="bg-surface border border-white/5 p-12 rounded-sm text-center max-w-4xl mx-auto mb-32">
          <h2 className="font-display text-display-md font-bold text-white mb-6">Ready to remove the ambiguity?</h2>
          <p className="text-structural text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Start with a structured assessment of where you are today and what a sensible next step looks like. No pitch. Just clarity.
          </p>
          <Link to="/contact">
            <Button className="px-8 py-4 text-lg">Book a call</Button>
          </Link>
        </Reveal>

        {/* 6. FAQs */}
        <div className="max-w-4xl mx-auto">
           <h2 className="font-display text-3xl font-bold text-white mb-16 text-center">AI Advisory FAQs</h2>
           <FAQSection />
        </div>
        </Container>
      </Section>
    </div>
  );
};

// FAQ Component
const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = aiAdvisoryFaqs;

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-white/10 pb-4">
          <button
            className="flex items-center justify-between w-full text-left py-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-focus rounded-sm group"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="font-bold text-white group-hover:text-focus transition-colors pr-8">{faq.q}</span>
            {openIndex === index ? <ChevronUp size={20} className="text-focus flex-shrink-0" /> : <ChevronDown size={20} className="text-structural group-hover:text-white flex-shrink-0" />}
          </button>
          {openIndex === index && (
             <div id={`faq-answer-${index}`} className="mt-4 text-structural text-sm leading-relaxed animate-slide-down whitespace-pre-line">
               {faq.a}
             </div>
          )}
        </div>
      ))}
    </div>
  );
};