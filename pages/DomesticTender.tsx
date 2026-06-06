import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { Check, X, Play, FileText, Shield, Mail, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export const DomesticTender: React.FC = () => {
  return (
    <div className="bg-obsidian min-h-screen">
      
      {/* Sticky Launch Offer Banner */}
      <div className="sticky top-20 z-40 bg-surface border-b border-white/5 text-center py-3">
        <div className="container mx-auto px-6">
          <span className="text-structural text-sm font-sans">
            <span className="text-focus font-medium">Introductory offer:</span> <span className="text-focus font-medium">50% discount</span> for the first 5 projects in exchange for a testimonial.
          </span>
        </div>
      </div>

      {/* 1. Hero Section */}
      <section className="pt-24 pb-20 border-b border-white/5">
        <div className="container mx-auto px-6 text-center max-w-5xl">
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Get Like-for-Like Builder Quotes with a Professional Tender Pack
          </h1>
          
          <p className="text-xl text-structural leading-relaxed max-w-3xl mx-auto mb-12 font-light">
            Get a clear Works Specification, Terms of Agreement, and Builder Cover Email — for extensions, loft conversions, refurbishments, garden rooms, and other home works.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 mb-16">
            <Link to="/contact">
              <Button className="w-full sm:w-auto text-lg px-8 py-4">Book a call</Button>
            </Link>
            <p className="text-sm font-normal text-structural">
              A quick call to confirm the right pack.
            </p>
          </div>

          {/* Video Embed */}
          <div className="relative w-full max-w-3xl mx-auto aspect-video bg-surface border border-white/10 rounded-sm overflow-hidden shadow-2xl shadow-black/50">
            <iframe 
              className="w-full h-full" 
              src="https://www.youtube.com/embed/lp1vqIWM6p8" 
              title="Tender Pack Explained" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* 2. Professional Delivery */}
      <section className="py-24 bg-surface border-b border-white/5">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-white mb-6">Professional Delivery</h2>
          <p className="text-xl text-white/90 leading-relaxed font-light">
            "The same clarity delivered on major civil engineering projects."
          </p>
          <div className="w-16 h-px bg-focus/50 mx-auto my-8"></div>
          <p className="text-structural">
            ClearBuild is led by a senior project manager with over 20 years’ experience delivering complex civil engineering projects. We apply that same structured, risk-aware approach to domestic works to protect homeowners from ambiguity.
          </p>
        </div>
      </section>

      {/* 3. Service Includes */}
      <section className="py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-16 text-center">Service Includes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Spec */}
            <div className="bg-surface border border-white/5 p-8 rounded-sm hover:border-white/20 transition-colors">
              <div className="w-12 h-12 bg-obsidian border border-white/10 flex items-center justify-center mb-6 text-focus">
                <FileText size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-4">Itemised Work Specification</h3>
              <p className="text-structural text-sm leading-relaxed mb-4">
                A detailed 9-column schedule breaking down every aspect of your project. Removes guesswork.
              </p>
              <ul className="text-sm text-structural space-y-2">
                <li className="flex items-center"><Check size={14} className="text-focus mr-2" /> Demolition & Strip Out</li>
                <li className="flex items-center"><Check size={14} className="text-focus mr-2" /> Structural Works</li>
                <li className="flex items-center"><Check size={14} className="text-focus mr-2" /> Finishes & Fittings</li>
              </ul>
            </div>

            {/* Terms */}
            <div className="bg-surface border border-white/5 p-8 rounded-sm hover:border-white/20 transition-colors">
              <div className="w-12 h-12 bg-obsidian border border-white/10 flex items-center justify-center mb-6 text-focus">
                <Shield size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-4">Terms of Agreement</h3>
              <p className="text-structural text-sm leading-relaxed mb-4">
                A 16-heading document protecting you. Defines payment terms, insurance, and dispute resolution.
              </p>
              <ul className="text-sm text-structural space-y-2">
                <li className="flex items-center"><Check size={14} className="text-focus mr-2" /> Retention Clauses</li>
                <li className="flex items-center"><Check size={14} className="text-focus mr-2" /> Payment Schedules</li>
                <li className="flex items-center"><Check size={14} className="text-focus mr-2" /> Insurance Requirements</li>
              </ul>
            </div>

            {/* Email */}
            <div className="bg-surface border border-white/5 p-8 rounded-sm hover:border-white/20 transition-colors">
              <div className="w-12 h-12 bg-obsidian border border-white/10 flex items-center justify-center mb-6 text-focus">
                <Mail size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-4">Builder Cover Email</h3>
              <p className="text-structural text-sm leading-relaxed mb-4">
                A professional, ready-to-send email template to issue your pack to builders.
              </p>
              <ul className="text-sm text-structural space-y-2">
                <li className="flex items-center"><Check size={14} className="text-focus mr-2" /> Sets Professional Tone</li>
                <li className="flex items-center"><Check size={14} className="text-focus mr-2" /> Defines Return Date</li>
                <li className="flex items-center"><Check size={14} className="text-focus mr-2" /> Manages Expectations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Benefits Comparison Table */}
      <section className="py-24 bg-surface border-b border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-16 text-center">Why use a Tender Pack?</h2>

          <div className="max-w-4xl mx-auto bg-obsidian border border-white/10 rounded-sm overflow-hidden">
            <div className="grid grid-cols-12 bg-white/5 border-b border-white/10 p-4 text-sm font-bold text-white">
              <div className="col-span-4 pl-2">Benefit</div>
              <div className="col-span-4 text-center">Without a Tender Pack</div>
              <div className="col-span-4 text-center text-focus">With a Tender Pack</div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-12 border-b border-white/5 p-4 items-center">
              <div className="col-span-4 font-medium text-white pl-2">Scope Clarity</div>
              <div className="col-span-4 flex items-center justify-center text-structural text-sm">
                <X size={16} className="text-red-500 mr-2" /> Unclear, incomplete
              </div>
              <div className="col-span-4 flex items-center justify-center text-white text-sm">
                <Check size={16} className="text-focus mr-2" /> Fully itemised 9-column spec
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-12 border-b border-white/5 p-4 items-center">
              <div className="col-span-4 font-medium text-white pl-2">Price Comparability</div>
              <div className="col-span-4 flex items-center justify-center text-structural text-sm">
                <X size={16} className="text-red-500 mr-2" /> Hard to compare quotes
              </div>
              <div className="col-span-4 flex items-center justify-center text-white text-sm">
                <Check size={16} className="text-focus mr-2" /> Apples-to-apples comparison
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-12 border-b border-white/5 p-4 items-center">
              <div className="col-span-4 font-medium text-white pl-2">Risk of Disputes</div>
              <div className="col-span-4 flex items-center justify-center text-structural text-sm">
                <X size={16} className="text-red-500 mr-2" /> High
              </div>
              <div className="col-span-4 flex items-center justify-center text-white text-sm">
                <Check size={16} className="text-focus mr-2" /> Low — scope agreed upfront
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-12 p-4 items-center">
              <div className="col-span-4 font-medium text-white pl-2">Cost Certainty</div>
              <div className="col-span-4 flex items-center justify-center text-structural text-sm">
                <X size={16} className="text-red-500 mr-2" /> Constant variations
              </div>
              <div className="col-span-4 flex items-center justify-center text-white text-sm">
                <Check size={16} className="text-focus mr-2" /> Fewer surprises
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Service Tiers & Pricing */}
      <section className="py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-white mb-6">Service Tiers & Pricing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            
            {/* Standard */}
            <div className="bg-surface border border-focus/50 rounded-sm p-8 flex flex-col relative ring-1 ring-focus/30">
              <h3 className="font-display text-2xl font-bold text-white underline decoration-white/30 decoration-1 underline-offset-8 mb-4">Standard</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-red-500 line-through mr-3">£500</span>
                <span className="text-4xl font-bold text-white">£250</span>
                <span className="block text-xs font-bold uppercase tracking-wider text-focus mt-2">Launch Price 50% OFF</span>
              </div>
              <p className="text-sm text-structural mb-6 min-h-[40px]">
                <strong className="text-white">Best for:</strong> Mid-sized projects (e.g. loft conversion, kitchen extension, garden room).
              </p>
              <div className="space-y-4 mb-8 flex-grow">
                 <div className="flex items-start text-sm text-structural">
                   <Check size={16} className="text-focus mr-3 mt-0.5 flex-shrink-0" />
                   9-column Works Spec (~20 rows)
                 </div>
                 <div className="flex items-start text-sm text-structural">
                   <Check size={16} className="text-focus mr-3 mt-0.5 flex-shrink-0" />
                   16-heading Terms (full clauses)
                 </div>
                 <div className="flex items-start text-sm text-structural">
                   <Check size={16} className="text-focus mr-3 mt-0.5 flex-shrink-0" />
                   2 rounds of revisions
                 </div>
                 <div className="flex items-start text-sm text-structural">
                   <Check size={16} className="text-focus mr-3 mt-0.5 flex-shrink-0" />
                   Builder Cover Email template
                 </div>
                 <div className="flex items-start text-sm text-structural">
                   <Check size={16} className="text-focus mr-3 mt-0.5 flex-shrink-0" />
                   Delivery in 14 days
                 </div>
              </div>
              <Link to="/contact">
                <Button className="w-full">Book a call</Button>
              </Link>
            </div>

            {/* Premium S1 */}
            <div className="bg-surface border border-white/10 rounded-sm p-8 flex flex-col relative">
              <h3 className="font-display text-2xl font-bold text-white underline decoration-white/30 decoration-1 underline-offset-8 mb-4">Premium – Stage 1</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-red-500 line-through mr-3">£700</span>
                <span className="text-4xl font-bold text-white">£350</span>
                <span className="block text-xs font-bold uppercase tracking-wider text-focus mt-2">Launch Price 50% OFF</span>
              </div>
              <p className="text-sm text-structural mb-6 min-h-[40px]">
                <strong className="text-white">Best for:</strong> Large extensions, full refurbishments, or multiple trades.
              </p>
              <div className="space-y-4 mb-8 flex-grow">
                 <div className="flex items-start text-sm text-structural">
                   <Check size={16} className="text-focus mr-3 mt-0.5 flex-shrink-0" />
                   9-column Works Spec (~30 rows)
                 </div>
                 <div className="flex items-start text-sm text-structural">
                   <Check size={16} className="text-focus mr-3 mt-0.5 flex-shrink-0" />
                   16-heading Terms (full + bespoke)
                 </div>
                 <div className="flex items-start text-sm text-structural">
                   <Check size={16} className="text-focus mr-3 mt-0.5 flex-shrink-0" />
                   2 rounds of revisions
                 </div>
                 <div className="flex items-start text-sm text-structural">
                   <Check size={16} className="text-focus mr-3 mt-0.5 flex-shrink-0" />
                   Final 30-min review call
                 </div>
                 <div className="flex items-start text-sm text-structural">
                   <Check size={16} className="text-focus mr-3 mt-0.5 flex-shrink-0" />
                   Delivery in 14 days
                 </div>
              </div>
              <Link to="/contact">
                <Button className="w-full">Book a call</Button>
              </Link>
            </div>

          </div>

          {/* Premium Stage 2 Add-on */}
          <div className="max-w-6xl mx-auto bg-obsidian border border-white/20 rounded-sm p-8 md:p-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-white/10 px-4 py-1 rounded-bl-sm text-xs font-bold uppercase tracking-wider text-white">Optional Add-On</div>
             <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                <div>
                   <h3 className="font-display text-2xl font-bold text-white mb-2">Premium – Stage 2 (Tender Review)</h3>
                   <p className="text-xl font-bold text-white mb-4">£650–£800 <span className="text-sm font-normal text-structural ml-2">(Depending on complexity)</span></p>
                   <p className="text-structural text-sm mb-4"><strong className="text-white">Best for:</strong> Clients who want professional help selecting a builder.</p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center text-sm text-structural"><Check size={16} className="text-focus mr-2" /> Review up to 3 builder quotes</div>
                      <div className="flex items-center text-sm text-structural"><Check size={16} className="text-focus mr-2" /> Written feedback on omissions/risks</div>
                      <div className="flex items-center text-sm text-structural"><Check size={16} className="text-focus mr-2" /> 30-min call to discuss findings</div>
                      <div className="flex items-center text-sm text-structural"><Check size={16} className="text-focus mr-2" /> Final tweaks to spec & terms before signing</div>
                   </div>
                </div>
                <div className="flex-shrink-0">
                   <div className="text-white/80 text-sm font-medium border border-white/10 px-6 py-4 rounded-sm bg-white/5 text-center">
                     Available following<br className="hidden md:block"/> Stage 1 completion.
                   </div>
                </div>
             </div>
          </div>
          
        </div>
      </section>

      {/* 6. Our Process */}
      <section className="py-24 bg-surface border-b border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-16 text-center">Our Process</h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { num: '1', title: 'Book a free 15-min call', desc: 'Discuss your project and see if a pack fits (or skip to deposit).' },
              { num: '2', title: 'Secure your slot', desc: '£50 deposit guarantees your Tender Pack.' },
              { num: '3', title: 'Onboarding', desc: 'Client completes onboarding form to capture key requirements.' },
              { num: '4', title: 'Draft Pack prepared', desc: 'Delivered within 14 business days.' },
              { num: '5', title: 'Final review & revisions', desc: 'Included as per package tier.' },
              { num: '6', title: 'Balance payment', desc: 'Only payable on completion of final revisions.' },
              { num: '7', title: 'Handover', desc: 'Builder-ready documents & email template released.' },
            ].map((step, idx) => (
              <div key={idx} className="flex items-center bg-obsidian border border-white/5 p-6 rounded-sm">
                <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white font-mono font-bold mr-6 flex-shrink-0">
                  {step.num}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{step.title}</h4>
                  <p className="text-structural text-sm mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQs */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-white mb-16 text-center">Domestic Tender Pack FAQs</h2>
          <FAQSection />
        </div>
      </section>

    </div>
  );
};

// FAQ Component
const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "Do I need drawings before I get a Tender Pack?", a: "In most cases yes, but if you don’t, we can still prepare a draft Tender Pack. You can also discuss this in your free 15-min call." },
    { q: "What level of detail should I be thinking about?", a: "The more clarity, the better. We’ll guide you step-by-step and fill gaps with “TBC” placeholders so your builder knows what still needs confirming." },
    { q: "How long does it take to get my Tender Pack?", a: "Once you have completed the onboarding form (and had an intake call), your draft Tender Pack is delivered within 14 business days." },
    { q: "What if my project changes after the pack is issued?", a: "Each package includes revisions as stated in the package details to fine-tune your draft. If your design evolves beyond that, we’ll update the spec and terms — additional revisions outside your chosen package are charged at £40 per round." },
    { q: "Can I use the same Tender Pack with multiple builders?", a: "Yes — that’s the point. The pack lets you compare like-for-like quotes using the same scope of works." },
    { q: "Do you provide cost estimates as well as scope documents?", a: "No — we don’t price the works. Builders price against the itemised specification so you can compare apples-to-apples." },
    { q: "Do you work with my architect or structural engineer?", a: "Yes. We’ll reference their drawings, calculations and details in your pack." },
    { q: "What if I don’t have planning approval yet?", a: "That’s fine — we can still prepare a Tender Pack. We’ll mark the planning status as “TBC” so builders know it’s subject to approval." },
    { q: "Do you cover all types of domestic projects?", a: "We specialise in domestic projects of all sizes — including extensions, loft conversions, refurbishments, garage conversions, garden rooms, and general home improvements. If it’s a residential project, we can help you prepare a Tender Pack." },
    { q: "Is the Tender Pack a legal contract?", a: "The Tender Pack is designed as a pre-contract document to help you get accurate builder quotes. However, once you and your chosen builder both sign the Terms of Agreement, that document can serve as a binding contract for the works." },
    { q: "What if my builder doesn’t want to use the pack?", a: "That’s rare — most builders actually prefer a Tender Pack because it removes guesswork and makes quoting easier. If a builder resists using it, that can be a red flag — it may suggest they’d rather keep things vague, which can lead to hidden costs or disputes later." },
    { q: "What if I’m not happy with the draft Tender Pack?", a: "We’ll work with you to make sure you’re happy with your Tender Pack. Each package includes revisions as stated in the package details to fine-tune your draft. The final pack (with watermarking removed and in the agreed formats) will be released once the balance payment has been received." },
    { q: "Do you visit my property in person?", a: "No. We work from the information you provide (onboarding form, drawings, photos, call notes) to keep the service quick and affordable." },
    { q: "Can I add my own preferred products or finishes?", a: "Yes — if you have brands, styles or finishes in mind (e.g., flooring, windows, kitchen units) we’ll capture those in the spec." },
    { q: "How do I pay?", a: "Secure your Tender Pack with a deposit via Stripe. The balance is payable on completion of your pack (as per your package’s revision allowance). Final files (with watermarking removed and in the agreed formats) are released once payment is received." },
    { q: "Can I upgrade from Standard to Premium later?", a: "Yes — start with any package and upgrade if you want more detail or extra revisions." },
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
             <div className="mt-4 text-structural text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
               {faq.a}
             </div>
          )}
        </div>
      ))}
    </div>
  );
};