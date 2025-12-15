import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const baseStyles = "px-6 py-2.5 rounded font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brandBlue hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-white text-brandBlue hover:bg-gray-50 focus:ring-white border border-transparent",
    outline: "bg-transparent border border-white text-white hover:bg-white/10 focus:ring-white",
    white: "bg-white text-slate-800 hover:bg-gray-100 border border-gray-200"
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