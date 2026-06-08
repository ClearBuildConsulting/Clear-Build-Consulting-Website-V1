import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  lead: string;
  whatYouGet: string;
  whoItsFor: string;
  outcome: string;
  to: string;
  cta: string;
  /** The primary (AI) service gets the indigo accent edge. */
  accent?: boolean;
}

/**
 * A tall service explorer card: an indigo left edge on the primary service, a
 * quiet lift on hover, and a structured micro-panel (what you get / who it's
 * for / typical outcome) under the lead. Replaces the old flat service grid.
 */
export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  lead,
  whatYouGet,
  whoItsFor,
  outcome,
  to,
  cta,
  accent = false,
}) => {
  const edge = accent ? 'border-l-2 border-l-focus' : 'border-l-2 border-l-white/10';
  const hoverBorder = accent ? 'hover:border-focus/60' : 'hover:border-white/20';
  const iconTone = accent ? 'text-focus' : 'text-structural';

  return (
    <div
      className={`group relative flex flex-col h-full bg-surface ${edge} border-y border-r border-white/5 ${hoverBorder} rounded-sm p-8 md:p-10 transition-all duration-300 hover:-translate-y-1`}
    >
      <div
        className={`w-12 h-12 bg-obsidian border border-white/10 flex items-center justify-center mb-6 ${iconTone} group-hover:border-focus/40 transition-colors`}
      >
        {icon}
      </div>

      <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-focus transition-colors">
        {title}
      </h3>
      <p className="text-structural leading-relaxed mb-8">{lead}</p>

      <dl className="space-y-4 mb-8 border-t border-white/5 pt-6">
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.15em] text-structural/70 mb-1">
            What you get
          </dt>
          <dd className="text-sm text-white/90 leading-relaxed">{whatYouGet}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.15em] text-structural/70 mb-1">
            Who it's for
          </dt>
          <dd className="text-sm text-white/90 leading-relaxed">{whoItsFor}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.15em] text-structural/70 mb-1">
            Typical outcome
          </dt>
          <dd className="text-sm text-white/90 leading-relaxed">{outcome}</dd>
        </div>
      </dl>

      <Link
        to={to}
        className="mt-auto inline-flex items-center text-sm font-bold text-white hover:text-focus transition-colors"
      >
        {cta}
        <ArrowRight
          size={16}
          className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
};
