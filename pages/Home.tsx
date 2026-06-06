import React from 'react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { BrainCircuit, Building2 } from 'lucide-react';
import { Seo } from '../components/Seo';
import { Section, Container, Reveal, Eyebrow } from '../components/primitives';
import { StructuralLattice } from '../components/StructuralLattice';
import { HeroHeadline } from '../components/HeroHeadline';
import { ServiceCard } from '../components/ServiceCard';
import { ProcessDiagram } from '../components/ProcessDiagram';
import { CountUp } from '../components/CountUp';

export const Home: React.FC = () => {
  return (
    <div className="bg-obsidian min-h-screen">
      <Seo
        title="AI and Construction Consultancy"
        description="Clear Build Consulting helps small and mid sized businesses understand how their operations run, identify where AI delivers measurable improvement, and implement with discipline. Senior built environment advisory alongside."
        path="/"
      />

      {/* Hero: asymmetric 60/40, lattice signature on the right. */}
      <Section spacing="none" dividerBottom className="relative overflow-hidden">
        {/* Lattice sits behind the text on mobile, beside it on desktop. */}
        <StructuralLattice className="lg:hidden absolute inset-0 opacity-30 flex items-center" />

        <Container>
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[88vh] py-24">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow className="mb-6">AI Consultancy · Built Environment Advisory</Eyebrow>
              </Reveal>

              <HeroHeadline lines={['Clear,', 'actionable advice.']} className="mb-8" />

              <Reveal delay={120}>
                <p className="text-xl text-structural leading-relaxed max-w-prose mb-6 font-light">
                  We help small and mid sized businesses, from professional services to trades,
                  understand how their operations really run, identify where AI will deliver measurable
                  improvement, define a clear path forward and implement the right solutions with discipline.
                </p>

                <p className="text-xl text-structural leading-relaxed max-w-prose mb-10 font-light">
                  Alongside AI advisory, we provide selective built environment advisory for complex
                  infrastructure programmes, applying the same structured, risk-aware approach.
                </p>

                <div className="flex flex-col items-start gap-8">
                  <div className="flex flex-col items-start gap-3">
                    <Link to="/contact">
                      <Button>Book a call</Button>
                    </Link>
                    <p className="text-sm font-normal text-white/75 text-left">
                      A short, structured conversation to understand your situation and see how we can help.
                    </p>
                  </div>

                  <Link to="/ai-advisory">
                    <Button variant="outline">See how the AI audit works</Button>
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Signature lattice, desktop only (mobile uses the bg version above). */}
            <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
              <StructuralLattice className="w-full max-w-md" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Services: two tall explorer cards. */}
      <Section>
        <Container>
          <Reveal>
            <Eyebrow className="mb-4">What we do</Eyebrow>
            <h2 className="font-display text-display-md font-bold mb-12 text-white">
              Two services, one discipline.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal>
              <ServiceCard
                accent
                icon={<BrainCircuit size={24} />}
                title="AI Consultancy"
                lead="Identify friction, improve decision-making, and implement automation where it matters. We map your reality before suggesting tools."
                whatYouGet="A clear-eyed audit of how your operations run, and a prioritised plan for where AI earns its place."
                whoItsFor="Small and mid sized business owners and ops leaders who want practical answers, not hype."
                outcome="Time saved, decisions made with better information, automation only where it pays back."
                to="/ai-advisory"
                cta="Explore AI Consultancy"
              />
            </Reveal>

            <Reveal delay={70}>
              <ServiceCard
                icon={<Building2 size={24} />}
                title="Built Environment Advisory"
                lead="Senior, selective advisory for complex infrastructure. The same structured, risk-aware approach, applied to major programmes."
                whatYouGet="Independent challenge on scope, commercial position and delivery risk from a senior practitioner."
                whoItsFor="Construction and infrastructure buyers carrying real programme and commercial risk."
                outcome="Hidden cost and dispute headed off early, clearer scopes, fewer surprises in delivery."
                to="/built-environment"
                cta="View Built Environment Advisory"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* How the AI audit works: the process diagram. Surface cadence shift. */}
      <Section dividerTop className="bg-surface-2">
        <Container>
          <Reveal>
            <Eyebrow className="mb-4">Method</Eyebrow>
            <h2 className="font-display text-display-md font-bold mb-4 text-white">
              How the AI audit works.
            </h2>
            <p className="text-structural leading-relaxed max-w-2xl mb-12">
              A disciplined four-step pathway. We map reality before we recommend anything, and measure
              the result against the friction we set out to remove.
            </p>
          </Reveal>

          <ProcessDiagram />
        </Container>
      </Section>

      {/* Proof band: darker full-width band, count-up figures. */}
      <Section spacing="tight" className="bg-obsidian border-y border-white/5">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
            <Reveal>
              <div className="font-display text-display-md font-extrabold text-white">
                <CountUp to={20} suffix="+" />
              </div>
              <p className="text-sm text-structural mt-2">
                Years delivering major infrastructure
              </p>
            </Reveal>
            <Reveal delay={70}>
              <div className="font-display text-display-md font-extrabold text-white">
                <CountUp to={10} suffix="+" />
              </div>
              <p className="text-sm text-structural mt-2">
                Years of senior client relationships
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className="font-display text-display-md font-extrabold text-white">
                Senior-led
              </div>
              <p className="text-sm text-structural mt-2">
                Every engagement run by the practitioner, not handed down
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Endorsements: real, named, static, forwarding-proof blocks. */}
      <Section dividerTop>
        <Container>
          <Reveal>
            <Eyebrow className="mb-4">Endorsements</Eyebrow>
            <h2 className="font-display text-display-md font-bold mb-12 text-white">
              Senior people who have worked with Mike.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tony Bagley */}
            <Reveal>
              <figure className="h-full bg-surface border border-white/5 border-l-2 border-l-focus/40 rounded-sm p-8 flex flex-col justify-between">
                <blockquote className="text-base text-white/90 leading-relaxed mb-6 font-light">
                  “I’ve worked with Mike on complex multi-package civil engineering projects, where his
                  ability to define clear scopes and specifications prevented increased cost and
                  over-runs. That same precision and foresight will be a huge benefit for homeowners
                  managing extensions or refurbishments.”
                </blockquote>
                <figcaption className="pt-4 border-t border-white/5">
                  <cite className="not-italic font-semibold text-white block mb-1">Tony Bagley</cite>
                  <span className="text-xs text-structural/70">
                    Retired Senior Project Manager (formerly NWS &amp; Carillion)
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            {/* Anthony Buchanan — re-framed wording, awaiting Mike's sign-off. */}
            <Reveal delay={70}>
              <figure className="h-full bg-surface border border-white/5 border-l-2 border-l-focus/40 rounded-sm p-8 flex flex-col justify-between">
                <blockquote className="text-base text-white/90 leading-relaxed mb-6 font-light">
                  “On complex projects, Mike consistently delivered clarity and structure that saved
                  clients time, money, and stress. That same structured approach is exactly what clients
                  need to avoid hidden costs and disputes.”
                </blockquote>
                <figcaption className="pt-4 border-t border-white/5">
                  <cite className="not-italic font-semibold text-white block mb-1">Anthony Buchanan</cite>
                  <span className="text-xs text-structural/70">
                    Associate Director (Project Management) at Mace
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            {/* Ian Gillies — spans full width on lg for the longer quote. */}
            <Reveal delay={140} className="lg:col-span-2">
              <figure className="h-full bg-surface border border-white/5 border-l-2 border-l-focus/40 rounded-sm p-8 flex flex-col justify-between">
                <blockquote className="text-base text-white/90 leading-relaxed mb-6 font-light space-y-4">
                  <p>
                    “I have worked with Mike in a client-consultant relationship for almost 10 years and
                    would characterise our interaction as trusting, respectful and highly professional.
                    Mike gives thorough and detailed feedback which allows any necessary corrective
                    actions to be taken at the earliest opportunity. He also recognises the strengths of
                    others and tailors his communications as necessary.
                  </p>
                  <p>
                    I believe that the above, combined with Mike’s thorough understanding of construction
                    contracts and previous experience as a contractor himself, will provide clients with
                    a great degree of comfort that problems will be avoided and certainty of success
                    maximised.”
                  </p>
                </blockquote>
                <figcaption className="pt-4 border-t border-white/5">
                  <cite className="not-italic font-semibold text-white block mb-1">Ian Gillies</cite>
                  <span className="text-xs text-structural/70">
                    Director, Major Infrastructure Delivery (Hydro, Renewables, Thermal Power &amp;
                    Transmission)
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Grounded in delivery: asymmetric 7/5 split. */}
      <Section dividerTop className="bg-surface-2">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-7">
              <Eyebrow className="mb-4">Why Clear Build</Eyebrow>
              <h2 className="font-display text-display-md font-bold text-white mb-6">
                Grounded in delivery.
              </h2>
              <p className="text-structural leading-relaxed text-lg">
                Clear Build is led by a senior project manager with over 20 years’ experience delivering
                complex civil engineering projects.
              </p>
            </Reveal>

            <Reveal delay={70} className="lg:col-span-5 space-y-6 lg:pt-12">
              <p className="text-structural">
                <strong className="text-white">Outcome-led.</strong> We focus on time saved and risk
                reduced.
              </p>
              <p className="text-structural">
                <strong className="text-white">Fixed-scope thinking.</strong> Clear deliverables every
                time.
              </p>
              <p className="text-structural">
                <strong className="text-white">Credibility first.</strong> If we aren’t the right fit, we
                say so.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>
    </div>
  );
};
