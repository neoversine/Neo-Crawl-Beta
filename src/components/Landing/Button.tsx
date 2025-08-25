'use client'
import React from 'react'
import { motion } from 'framer-motion'
interface ButtonProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    className?: string
    onClick?: () => void
}
export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
}: ButtonProps) => {
    const baseClasses =
        'rounded-lg font-medium transition-all flex items-center justify-center'
    const variantClasses = {
        primary:
            'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-700 text-white hover:shadow-lg',
        secondary: 'bg-black text-white hover:bg-gray-800',
        outline: 'border-2 border-black text-black hover:bg-black hover:text-white',
    }
    const sizeClasses = {
        sm: 'text-sm px-4 py-2',
        md: 'text-base px-6 py-3',
        lg: 'text-lg px-8 py-4',
    }
    return (
        <motion.button
            whileHover={{
                scale: 1.05,
            }}
            whileTap={{
                scale: 0.98,
            }}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.button>
    )
}
