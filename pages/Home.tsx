import React from 'react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, BrainCircuit, Building2 } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="bg-obsidian min-h-screen">

      {/* Hero Section */}
      <section className="pt-24 pb-20 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-2/3">
              <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight text-white mb-8">
                Clear, actionable advice.
              </h1>

              <p className="text-xl text-structural leading-relaxed max-w-2xl mb-6 font-light">
                We help small and mid sized businesses, from professional services to trades,
                understand how their operations really run, identify where AI will deliver measurable
                improvement, define a clear path forward and implement the right solutions with discipline.
              </p>

              <p className="text-xl text-structural leading-relaxed max-w-2xl mb-10 font-light">
                Alongside AI advisory, we also provide fixed-scope domestic tender documentation
                and selective built environment advisory, applying the same structured, risk-aware approach.
              </p>

              <div className="flex flex-col items-start gap-8">
                <div className="flex flex-col items-start gap-3">
                  <a
                    href="https://calendly.com/clearbuild-consulting/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button>Book a 15-minute call</Button>
                  </a>
                  <p className="text-sm font-normal text-white/75 text-left">
                    A short, structured conversation to understand your situation and see how we can help.
                  </p>
                </div>

                <Link to="/ai-advisory">
                  <Button variant="outline">See how the AI audit works</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl font-bold mb-16 text-white">
            Our Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* AI Advisory */}
            <div className="bg-surface p-8 border border-focus/30 rounded-sm hover:border-focus transition-colors duration-300 group">
              <div className="w-12 h-12 bg-obsidian border border-white/10 flex items-center justify-center mb-6 text-focus">
                <BrainCircuit size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-4 group-hover:text-focus transition-colors">
                AI Advisory
              </h3>
              <p className="text-structural text-sm leading-relaxed mb-8">
                Identify friction, improve decision-making, and implement automation where it matters.
                We map your reality before suggesting tools.
              </p>
              <Link to="/ai-advisory" className="inline-flex items-center text-sm font-bold text-white hover:text-focus transition-colors">
                Explore Advisory <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            {/* Domestic Tender Packs */}
            <div className="bg-surface p-8 border border-white/5 rounded-sm hover:border-white/20 transition-colors duration-300">
              <div className="w-12 h-12 bg-obsidian border border-white/10 flex items-center justify-center mb-6 text-structural">
                <FileText size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-4">
                Domestic Tender Packs
              </h3>
              <p className="text-structural text-sm leading-relaxed mb-8">
                Structured documentation for homeowners. Get like-for-like quotes with clear scopes and specifications. Fixed price.
              </p>
              <Link to="/domestic-tender-packs" className="inline-flex items-center text-sm font-bold text-white hover:text-structural transition-colors">
                View Service <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            {/* Built Environment */}
            <div className="bg-surface p-8 border border-white/5 rounded-sm hover:border-white/20 transition-colors duration-300">
              <div className="w-12 h-12 bg-obsidian border border-white/10 flex items-center justify-center mb-6 text-structural">
                <Building2 size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-4">
                Built Environment Advisory
              </h3>
              <p className="text-structural text-sm leading-relaxed mb-8">
                Senior, selective advisory for complex infrastructure.
              </p>
              <Link to="/built-environment" className="inline-flex items-center text-sm font-bold text-white hover:text-structural transition-colors">
                View Details <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

          </div>
        </div>
      </section>


      {/* Professional Endorsements */}
      <section className="py-12 border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-2xl font-bold mb-8 text-white">
            Professional endorsements
          </h2>

          <div className="flex overflow-x-auto gap-4 pb-6 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory">

            {/* Testimonial 1 */}
            <div className="min-w-[82vw] md:min-w-[460px] lg:min-w-[500px] snap-center bg-surface border border-white/5 p-5 md:p-6 rounded-sm flex flex-col justify-between">
              <blockquote className="text-sm md:text-base text-white/90 leading-relaxed mb-5 font-light">
                “I’ve worked with Mike on complex multi-package civil engineering projects, where his ability to define clear scopes and specifications prevented increased cost and over-runs. That same precision and foresight will be a huge benefit for homeowners managing extensions or refurbishments.”
              </blockquote>
              <div className="pt-4 border-t border-white/5">
                <cite className="not-italic font-semibold text-white block mb-1 text-sm">
                  Tony Bagley
                </cite>
                <span className="text-xs text-structural/60">
                  Retired Senior Project Manager (formerly NWS & Carillion)
                </span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="min-w-[82vw] md:min-w-[460px] lg:min-w-[500px] snap-center bg-surface border border-white/5 p-5 md:p-6 rounded-sm flex flex-col justify-between">
              <blockquote className="text-sm md:text-base text-white/90 leading-relaxed mb-5 font-light">
                “On complex projects, Mike consistently delivered clarity and structure that saved clients time, money, and stress. Bringing this expertise to domestic building projects is exactly what the market needs to avoid hidden costs and disputes.”
              </blockquote>
              <div className="pt-4 border-t border-white/5">
                <cite className="not-italic font-semibold text-white block mb-1 text-sm">
                  Anthony Buchanan
                </cite>
                <span className="text-xs text-structural/60">
                  Associate Director (Project Management) at Mace
                </span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="min-w-[82vw] md:min-w-[460px] lg:min-w-[500px] snap-center bg-surface border border-white/5 p-5 md:p-6 rounded-sm flex flex-col justify-between">
              <div className="text-sm md:text-base text-white/90 leading-relaxed mb-5 font-light space-y-4">
                <p>
                  “I have worked with Mike in a client-consultant relationship for almost 10 years and would characterise our interaction as trusting, respectful and highly professional. Mike gives thorough and detailed feedback which allows any necessary corrective actions to be taken at the earliest opportunity. He also recognises the strengths of others and tailors his communications as necessary.
                </p>
                <p>
                  I believe that the above, combined with Mike’s thorough understanding of construction contracts and previous experience as a contractor himself, will provide clients with a great degree of comfort that problems will be avoided and certainty of success maximised.”
                </p>
              </div>
              <div className="pt-4 border-t border-white/5">
                <cite className="not-italic font-semibold text-white block mb-1 text-sm">
                  Ian Gillies
                </cite>
                <span className="text-xs text-structural/60">
                  Director, Major Infrastructure Delivery (Hydro, Renewables, Thermal Power & Transmission)
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Proof / Trust */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-6">
                Grounded in delivery.
              </h2>
              <p className="text-structural leading-relaxed">
                ClearBuild is led by a senior project manager with over 20 years’ experience delivering complex civil engineering projects.
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-structural">
                <strong className="text-white">Outcome-led.</strong> We focus on time saved and risk reduced.
              </p>
              <p className="text-structural">
                <strong className="text-white">Fixed-scope thinking.</strong> Clear deliverables every time.
              </p>
              <p className="text-structural">
                <strong className="text-white">Credibility first.</strong> If we aren’t the right fit, we say so.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
