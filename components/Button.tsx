import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors duration-200 font-sans border rounded-sm";
  
  const variants = {
    primary: "bg-paper text-obsidian border-paper hover:bg-structural hover:border-structural hover:text-obsidian",
    secondary: "bg-surface text-paper border-surface hover:bg-slate-800",
    outline: "bg-transparent text-paper border-structural hover:border-paper hover:text-white",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};