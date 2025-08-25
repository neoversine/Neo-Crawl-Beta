'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { PricingCard } from './PricingCard'
export const PricingSection = () => {
    const pricingPlans = [
        {
            title: 'Free',
            price: '$0',
            limit: '10 calls/mo',
            features: [
                'JSON format',
                'Markdown format',
                'Basic support',
                'API documentation',
            ],
            cta: 'Get Started',
            popular: false,
        },
        {
            title: 'Pro',
            price: '$7',
            limit: '3000 calls/mo',
            features: [
                'All Free features',
                'n8n integration',
                'Priority support',
                'Advanced filtering',
            ],
            cta: 'Upgrade to Pro',
            popular: true,
        },
        {
            title: 'Premium',
            price: '$10',
            limit: '5000 calls/mo',
            features: [
                'All Pro features',
                'Early access to AI features',
                'Premium support',
                'Custom solutions',
            ],
            cta: 'Go Premium',
            popular: false,
        },
    ]
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    viewport={{
                        once: true,
                        margin: '-100px',
                    }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Simple & Transparent Pricing
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Choose the plan that works for your needs. No hidden fees, no
                        surprises.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                y: 30,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                            }}
                            viewport={{
                                once: true,
                                margin: '-100px',
                            }}
                        >
                            <PricingCard
                                title={plan.title}
                                price={plan.price}
                                limit={plan.limit}
                                features={plan.features}
                                cta={plan.cta}
                                popular={plan.popular}
                            />
                        </motion.div>
                    ))}
                </div>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                        delay: 0.3,
                    }}
                    viewport={{
                        once: true,
                        margin: '-100px',
                    }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-600">
                        Need a custom plan?{' '}
                        <a
                            href="#contact"
                            className="font-medium text-purple-600 hover:text-purple-800"
                        >
                            Contact us
                        </a>{' '}
                        to get started.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
