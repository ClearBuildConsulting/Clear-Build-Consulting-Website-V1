import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * The signature graphic: a thin-line vector lattice over obsidian. A faint grid
 * of intersecting 1px lines, a handful of indigo nodes at intersections, and one
 * indigo path that draws itself in on load. The brand metaphor in one image:
 * map reality, then draw a clear path.
 *
 * GPU-cheap (transform + opacity only). Small-amplitude pointer parallax on
 * pointer-fine devices. Degrades to a static SVG under prefers-reduced-motion
 * and renders fully (path already drawn) for the prerendered/no-JS case.
 */

// Grid geometry, in the 0..400 viewBox space.
const W = 400;
const H = 460;
const STEP = 40;

const vLines = Array.from({ length: Math.floor(W / STEP) + 1 }, (_, i) => i * STEP);
const hLines = Array.from({ length: Math.floor(H / STEP) + 1 }, (_, i) => i * STEP);

// Indigo nodes sat on grid intersections.
const nodes = [
  { x: 80, y: 120 },
  { x: 200, y: 80 },
  { x: 320, y: 200 },
  { x: 160, y: 280 },
  { x: 280, y: 360 },
];

// The single clear-path polyline threading through the field.
const PATH = 'M 40 380 L 120 300 L 200 320 L 280 200 L 360 120';

export const StructuralLattice: React.FC<{ className?: string }> = ({ className = '' }) => {
  const prefersReduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [drawn, setDrawn] = useState(false);

  // Trigger the path draw shortly after mount (when motion is allowed).
  useEffect(() => {
    if (prefersReduced) {
      setDrawn(true);
      return;
    }
    const t = window.setTimeout(() => setDrawn(true), 200);
    return () => window.clearTimeout(t);
  }, [prefersReduced]);

  // Small-amplitude pointer parallax, fine pointers only.
  useEffect(() => {
    if (prefersReduced) return;
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        // Max ~8px drift.
        setOffset({
          x: ((e.clientX - cx) / cx) * 8,
          y: ((e.clientY - cy) / cy) * 8,
        });
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [prefersReduced]);

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        fill="none"
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: prefersReduced ? undefined : 'transform 0.4s ease-out',
        }}
      >
        {/* Faint grid field. */}
        <g stroke="#FFFFFF">
          {vLines.map((x) => (
            <line key={`v${x}`} x1={x} y1={0} x2={x} y2={H} strokeWidth={1} opacity={0.05} />
          ))}
          {hLines.map((y) => (
            <line key={`h${y}`} x1={0} y1={y} x2={W} y2={y} strokeWidth={1} opacity={0.05} />
          ))}
        </g>

        {/* A couple of brighter structural lines, the load-bearing members. */}
        <g stroke="#FFFFFF" opacity={0.1}>
          <line x1={0} y1={120} x2={W} y2={120} strokeWidth={1} />
          <line x1={200} y1={0} x2={200} y2={H} strokeWidth={1} />
        </g>

        {/* The indigo clear-path, drawing itself in. */}
        <path
          d={PATH}
          stroke="#6366F1"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: drawn ? 0 : 1,
            transition: prefersReduced ? undefined : 'stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }}
        />

        {/* Indigo nodes at intersections. */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={6} fill="#6366F1" opacity={0.12} />
            <circle cx={n.x} cy={n.y} r={2.5} fill="#6366F1" />
          </g>
        ))}
      </svg>
    </div>
  );
};
