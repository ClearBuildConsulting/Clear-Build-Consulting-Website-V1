import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { Search, Lightbulb, Map, Hammer, CheckCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

export const AIAdvisory: React.FC = () => {
  return (
    <div className="bg-obsidian min-h-screen pt-24 pb-24">
      <div className="container mx-auto px-6">
        
        {/* 1. Hero Section */}
        <div className="max-w-4xl mb-24">
          <span className="text-focus font-bold tracking-widest uppercase text-xs mb-4 block">Primary Service</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
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
        </div>

        {/* 2. Process Diagram Section */}
        <div className="mb-32">
          <div className="relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-white/10 border-t border-dashed border-white/10"></div>

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
        </div>

        {/* 3. What the Audit Produces */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 border-t border-white/5 pt-24">
            
            {/* Left Column: Deliverables */}
            <div>
                <h2 className="font-display text-3xl font-bold text-white mb-6">What the audit produces</h2>
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
        </div>

        {/* 4. Engagement Model */}
        <div className="max-w-4xl mx-auto mb-32 text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-10">Engagement Model</h2>
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
        </div>

        {/* 5. Call to Action */}
        <div className="bg-surface border border-white/5 p-12 rounded-sm text-center max-w-4xl mx-auto mb-32">
          <h2 className="font-display text-3xl font-bold text-white mb-6">Ready to remove the ambiguity?</h2>
          <p className="text-structural text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Start with a structured assessment of where you are today and what a sensible next step looks like. No pitch. Just clarity.
          </p>
          <Link to="/contact">
            <Button className="px-8 py-4 text-lg">Book a call</Button>
          </Link>
        </div>

        {/* 6. FAQs */}
        <div className="max-w-4xl mx-auto">
           <h2 className="font-display text-3xl font-bold text-white mb-16 text-center">AI Advisory FAQs</h2>
           <FAQSection />
        </div>
      </div>
    </div>
  );
};

// FAQ Component
const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How do I know if my business is ready for AI?",
      a: "You do not need to be technically advanced to engage. What matters is whether your business has repeatable processes, recurring administrative work, or decision bottlenecks that slow delivery.\n\nIf your team relies heavily on spreadsheets, email chains, manual document preparation, or duplicated effort, there is usually scope for improvement. The audit determines whether AI is commercially justified and where it should be applied. If it is not appropriate, that will be made clear."
    },
    {
      q: "What size businesses do you typically work with?",
      a: "We work with established small and mid-sized businesses, from professional services to trades, where operational complexity is beginning to create drag.\n\nIf inefficiencies are affecting time, cost, reporting, or decision-making, the advisory model is designed to bring structure and measurable improvement.\n\nVery early-stage or informal ventures are usually not suitable."
    },
    {
      q: "Is this about replacing staff?",
      a: "No. The focus is operational efficiency, not headcount reduction.\n\nMost opportunities in SMEs involve removing repetitive low value tasks, improving response times, and standardising outputs. The objective is improved margin and delivery quality, not replacing experienced people."
    },
    {
      q: "What does the AI audit actually produce?",
      a: "The audit produces a structured written report including:\n\n• An AI Opportunity Register\n• Prioritised use cases\n• A Do Now / Do Later framework\n• A 90 day roadmap\n• Governance and risk commentary\n\nThis is a practical implementation framework, not a generic slide deck."
    },
    {
      q: "Do you also implement the recommended solutions?",
      a: "Yes. Selected opportunities can move into a defined implementation phase.\n\nImplementation may be delivered directly or in partnership with trusted technical specialists, depending on complexity. Advisory oversight remains in place to ensure alignment, governance, and commercial discipline."
    },
    {
      q: "How long does the process take?",
      a: "A typical audit runs between three and six weeks, depending on organisational size and complexity.\n\nThe engagement is fixed scope and time bound. Implementation phases are defined separately once priorities are agreed."
    },
    {
      q: "Do you sell software or receive commission from tools?",
      a: "No.\n\nRecommendations are made independently and based on suitability, not affiliation. The objective is operational improvement, not software sales."
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-white/10 pb-4">
          <button
            className="flex items-center justify-between w-full text-left py-2 focus:outline-none group"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="font-bold text-white group-hover:text-focus transition-colors pr-8">{faq.q}</span>
            {openIndex === index ? <ChevronUp size={20} className="text-focus flex-shrink-0" /> : <ChevronDown size={20} className="text-structural group-hover:text-white flex-shrink-0" />}
          </button>
          {openIndex === index && (
             <div className="mt-4 text-structural text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200 whitespace-pre-line">
               {faq.a}
             </div>
          )}
        </div>
      ))}
    </div>
  );
};