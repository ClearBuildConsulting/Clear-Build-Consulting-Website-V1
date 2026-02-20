import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Abstract Symbol: The Transparent Stack */}
      <div className="relative w-8 h-8">
        {/* Bottom solid block (Physical build) */}
        <div className="absolute bottom-0 left-0 w-5 h-5 bg-white rounded-sm"></div>
        {/* Top outlined block (Strategy/Clarity) */}
        <div className="absolute top-0 right-0 w-5 h-5 border-2 border-white bg-obsidian rounded-sm z-10"></div>
      </div>
      <div className="flex flex-col justify-center">
        <span className="font-display font-bold text-xl tracking-tight leading-none text-paper">
          ClearBuild
        </span>
        <span className="font-sans text-[10px] tracking-[0.2em] font-medium text-structural uppercase leading-none mt-1">
          Consulting
        </span>
      </div>
    </div>
  );
};