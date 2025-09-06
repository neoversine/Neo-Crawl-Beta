'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from './Button'
interface PricingCardProps {
    title: string
    price: string
    features: string[]
    cta: string
    popular?: boolean
    limit: string
}
export const PricingCard = ({
    title,
    price,
    features,
    cta,
    popular,
    limit,
}: PricingCardProps) => {
    return (
        <motion.div
            className={`rounded-2xl p-6 shadow-lg ${popular ? 'border-2 border-purple-500 relative' : 'border border-gray-700/50'}`}
            whileHover={{
                y: -10,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            }}
            transition={{
                duration: 0.3,
            }}
        >
            {popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                </div>
            )}
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <div className="mb-4">
                <span className="text-3xl font-bold">{price}</span>
                <span className="text-gray-500">/month</span>
            </div>
            <p className="text-gray-600 mb-4">{limit}</p>
            <ul className="mb-6 space-y-2">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <svg
                            className="w-5 h-5 text-purple-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                    </li>
                ))}
            </ul>
            <Button 
                variant={popular ? 'primary' : 'outline'} 
                className="w-full"
                href={cta === 'Get Started' ? '/login' : undefined}
            >
                {cta}
            </Button>
        </motion.div>
    )
}
