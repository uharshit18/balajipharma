import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    background?: 'white' | 'light' | 'dark';
    container?: boolean;
}

export const Section: React.FC<SectionProps> = ({
    children,
    className = '',
    background = 'white',
    container = true
}) => {
    const bgColors = {
        white: 'bg-white',
        light: 'bg-slate-50',
        dark: 'bg-slate-900',
    };

    return (
        <section className={`py-16 md:py-24 ${bgColors[background]} ${className}`}>
            {container ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            ) : (
                children
            )}
        </section>
    );
};
