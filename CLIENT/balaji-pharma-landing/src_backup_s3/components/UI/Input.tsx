import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                    {label}
                </label>
            )}
            <input
                className={`
          w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-brandBlue focus:border-transparent
          transition-all duration-200
          ${error ? 'border-red-500 focus:ring-red-200' : ''}
          ${className}
        `}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};
