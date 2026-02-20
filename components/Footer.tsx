import React from 'react';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-obsidian border-t border-white/10 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Logo />
          </div>
          
          <div>
            <h4 className="font-display font-bold text-white mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-structural">
              <li><Link to="/ai-advisory" className="hover:text-white transition-colors">AI Advisory</Link></li>
              <li><Link to="/domestic-tender-packs" className="hover:text-white transition-colors">Domestic Tender Packs</Link></li>
              <li><Link to="/built-environment" className="hover:text-white transition-colors">Built Environment Advisory</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-structural">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-structural">
          <p>&copy; {new Date().getFullYear()} ClearBuild Consulting. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <span className="opacity-50">Intellect and outcome, not just hours.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};