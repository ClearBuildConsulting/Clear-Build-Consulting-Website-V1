import React from 'react';
import { Button } from '../components/Button';
import { Seo } from '../components/Seo';
import { Section, Container, Reveal } from '../components/primitives';

export const Contact: React.FC = () => {
  return (
    <div className="bg-obsidian min-h-screen">
      <Seo
        title="Contact"
        description="Start a short, structured conversation with Clear Build Consulting. Tell us about your firm and the problem you are looking at, and we will arrange a call."
        path="/contact"
      />
      <Section spacing="none" className="pt-32 pb-24">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Start the conversation.
            </h1>

            <p className="text-xl text-structural leading-relaxed mb-12 font-light">
              The fastest way to explore working together is a short email. Tell me a little about your firm and the problem you are looking at, and I will come back to you to arrange a call.
            </p>

            <div className="flex flex-col items-center justify-center gap-12">
              <a href="mailto:mike.anderson@clearbuildconsulting.co.uk">
                <Button className="px-8 py-4 text-lg">Email me</Button>
              </a>

              <div className="text-sm text-structural">
                <p><a href="mailto:mike.anderson@clearbuildconsulting.co.uk" className="text-white underline hover:text-focus transition-colors">mike.anderson@clearbuildconsulting.co.uk</a></p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
};
