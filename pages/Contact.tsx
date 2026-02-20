import React from 'react';
import { Button } from '../components/Button';

export const Contact: React.FC = () => {
  return (
    <div className="bg-obsidian min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
          Start the conversation.
        </h1>
        
        <p className="text-xl text-structural leading-relaxed mb-12 font-light">
          The fastest way to explore working together is a focused 15-minute call.
        </p>

        <div className="flex flex-col items-center justify-center gap-12">
          <a 
            href="https://calendly.com/clearbuild-consulting/30min" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button className="px-8 py-4 text-lg">Book a 15-minute call</Button>
          </a>

          <div className="text-sm text-structural">
            <p>Prefer email? <a href="mailto:mike.anderson@clearbuildconsulting.co.uk" className="text-white underline hover:text-focus transition-colors">mike.anderson@clearbuildconsulting.co.uk</a></p>
          </div>
        </div>

      </div>
    </div>
  );
};