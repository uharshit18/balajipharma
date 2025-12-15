import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hoverEffect = true,
    ...props
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={hoverEffect ? { y: -5, boxShadow: "0 10px 40px -3px rgba(0, 0, 0, 0.08)" } : {}}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`bg-white rounded-xl border border-slate-100 shadow-soft p-6 ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};
