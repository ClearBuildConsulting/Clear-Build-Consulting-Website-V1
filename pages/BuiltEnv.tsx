import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { ShieldCheck, FileSearch, Scale, BookOpen, Clock, Calendar, AlertTriangle, Briefcase } from 'lucide-react';

export const BuiltEnv: React.FC = () => {
  return (
    <div className="bg-obsidian min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="pt-32 pb-20 border-b border-white/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <span className="text-focus font-bold tracking-widest uppercase text-xs mb-4 block">Selective Advisory</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Selective, senior advisory for complex built environment programmes.
          </h1>
          <p className="text-xl text-structural leading-relaxed max-w-3xl mb-12 font-light">
            Independent, documentation-focused, early-stage advisory input for organisations requiring defensible decision-making and structured delivery challenge.
          </p>
          
          <div className="flex flex-col items-start gap-3">
            <Link to="/contact">
              <Button className="px-8 py-4 text-lg">Book a call</Button>
            </Link>
            <span className="text-sm text-structural font-medium tracking-wide">
              A focused discussion to assess context and fit.
            </span>
          </div>
        </div>
      </section>

      {/* 2. Who This Is For */}
      <section className="py-24 bg-surface border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-6">Ideally suited for</h2>
              <p className="text-structural text-lg leading-relaxed">
                This service is designed for organisations managing significant risk, complexity, or regulatory scrutiny. It provides the intellectual bandwidth and structured challenge often missing during intense delivery phases.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {[
                "Major contractors requiring independent review",
                "Design consultancies needing delivery-focused challenge",
                "Regulated infrastructure programmes",
                "Clients preparing submissions, tenders or regulatory documentation"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="w-1.5 h-1.5 mt-2.5 bg-focus rounded-full mr-4 flex-shrink-0"></div>
                  <span className="text-white text-lg font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Advisory Scope */}
      <section className="py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-16">Advisory Scope</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Early-Stage Definition */}
            <div className="bg-surface p-8 border border-white/5 rounded-sm hover:border-white/20 transition-colors">
              <div className="w-12 h-12 bg-obsidian border border-white/10 flex items-center justify-center mb-6 text-structural">
                <FileSearch size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-6">Early-Stage Definition</h3>
              <ul className="space-y-3 text-structural text-sm">
                <li className="flex items-start"><span className="text-focus mr-2">•</span> Scope clarification & definition</li>
                <li className="flex items-start"><span className="text-focus mr-2">•</span> Strategic risk identification</li>
                <li className="flex items-start"><span className="text-focus mr-2">•</span> Constructability & methodology challenge</li>
                <li className="flex items-start"><span className="text-focus mr-2">•</span> Delivery model interrogation</li>
              </ul>
            </div>

            {/* Procurement & Commercial */}
            <div className="bg-surface p-8 border border-white/5 rounded-sm hover:border-white/20 transition-colors">
              <div className="w-12 h-12 bg-obsidian border border-white/10 flex items-center justify-center mb-6 text-structural">
                <Scale size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-6">Procurement & Commercial Insight</h3>
              <ul className="space-y-3 text-structural text-sm">
                <li className="flex items-start"><span className="text-focus mr-2">•</span> Tender documentation review</li>
                <li className="flex items-start"><span className="text-focus mr-2">•</span> Risk allocation commentary</li>
                <li className="flex items-start"><span className="text-focus mr-2">•</span> Change & programme challenge</li>
                <li className="flex items-start"><span className="text-focus mr-2">•</span> Independent commercial perspective</li>
              </ul>
            </div>

            {/* Governance & Regulatory */}
            <div className="bg-surface p-8 border border-white/5 rounded-sm hover:border-white/20 transition-colors">
              <div className="w-12 h-12 bg-obsidian border border-white/10 flex items-center justify-center mb-6 text-structural">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-6">Governance & Regulatory Support</h3>
              <ul className="space-y-3 text-structural text-sm">
                <li className="flex items-start"><span className="text-focus mr-2">•</span> Strengthening technical narratives</li>
                <li className="flex items-start"><span className="text-focus mr-2">•</span> Board-level paper input</li>
                <li className="flex items-start"><span className="text-focus mr-2">•</span> Submission defensibility review</li>
                <li className="flex items-start"><span className="text-focus mr-2">•</span> Option evaluation challenge</li>
              </ul>
            </div>

            {/* Independent Review */}
            <div className="bg-surface p-8 border border-white/5 rounded-sm hover:border-white/20 transition-colors">
              <div className="w-12 h-12 bg-obsidian border border-white/10 flex items-center justify-center mb-6 text-structural">
                <BookOpen size={24} />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-6">Independent Review</h3>
              <ul className="space-y-3 text-structural text-sm">
                <li className="flex items-start"><span className="text-focus mr-2">•</span> Contractor deliverable scrutiny</li>
                <li className="flex items-start"><span className="text-focus mr-2">•</span> Assumption testing</li>
                <li className="flex items-start"><span className="text-focus mr-2">•</span> Structured challenge sessions</li>
                <li className="flex items-start"><span className="text-focus mr-2">•</span> Third-party objective opinion</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Engagement Model */}
      <section className="py-24 bg-surface border-b border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-16">Engagement Model</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Model 1 */}
            <div className="bg-obsidian border border-white/10 p-8 rounded-sm">
               <div className="flex items-center gap-4 mb-6">
                 <Clock className="text-focus" size={24} />
                 <h3 className="font-display text-xl font-bold text-white">Transitional Intensive Support</h3>
               </div>
               <p className="text-structural text-sm leading-relaxed mb-6">
                 Time-bound advisory during critical phases such as mobilisation, tender preparation, or regulatory submission. Focused on immediate clarity and defensibility.
               </p>
            </div>

            {/* Model 2 */}
            <div className="bg-obsidian border border-white/10 p-8 rounded-sm">
               <div className="flex items-center gap-4 mb-6">
                 <Calendar className="text-focus" size={24} />
                 <h3 className="font-display text-xl font-bold text-white">Ongoing Strategic Advisory</h3>
               </div>
               <p className="text-structural text-sm leading-relaxed mb-6">
                 Defined number of retained advisory days per month providing independent oversight, documentation review, and structured challenge to delivery teams.
               </p>
            </div>

            {/* Boundaries */}
            <div className="bg-obsidian border border-white/10 p-8 rounded-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-white/5 p-2 rounded-bl-sm">
                 <AlertTriangle size={16} className="text-structural" />
               </div>
               <h3 className="font-display text-xl font-bold text-white mb-6">Service Boundaries</h3>
               <p className="text-structural text-sm mb-4">This service purposefully <span className="text-white font-medium">does not</span> provide:</p>
               <ul className="space-y-2 text-structural text-sm">
                 <li className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3"></span> Line management</li>
                 <li className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3"></span> Embedded site presence</li>
                 <li className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3"></span> Routine contract administration</li>
                 <li className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3"></span> Staff augmentation</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Value Delivered */}
      <section className="py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-white mb-12 text-center">Value Delivered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
               <div className="flex items-start">
                 <div className="mt-1 mr-4 text-focus"><Briefcase size={20} /></div>
                 <div>
                   <h4 className="text-white font-bold mb-1">Reduces downstream cost & delay</h4>
                   <p className="text-structural text-sm">By clarifying scope and assumptions before they become issues.</p>
                 </div>
               </div>
               <div className="flex items-start">
                 <div className="mt-1 mr-4 text-focus"><ShieldCheck size={20} /></div>
                 <div>
                   <h4 className="text-white font-bold mb-1">Identifies risk early</h4>
                   <p className="text-structural text-sm">Challenging optimism bias with structured, experience-led interrogation.</p>
                 </div>
               </div>
               <div className="flex items-start">
                 <div className="mt-1 mr-4 text-focus"><FileSearch size={20} /></div>
                 <div>
                   <h4 className="text-white font-bold mb-1">Improves submission quality</h4>
                   <p className="text-structural text-sm">Ensuring technical and commercial narratives are robust and defensible.</p>
                 </div>
               </div>
               <div className="flex items-start">
                 <div className="mt-1 mr-4 text-focus"><Scale size={20} /></div>
                 <div>
                   <h4 className="text-white font-bold mb-1">Protects margin</h4>
                   <p className="text-structural text-sm">Through structured challenge of change, programme, and commercial assumptions.</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Closing */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <p className="text-xl text-white font-light leading-relaxed mb-10">
            This is advisory-only. Engagements are defined, structured and outcome-focused. Independence is maintained.
          </p>
          <Link to="/contact">
            <Button className="px-8 py-4">Book a call</Button>
          </Link>
        </div>
      </section>

    </div>
  );
};