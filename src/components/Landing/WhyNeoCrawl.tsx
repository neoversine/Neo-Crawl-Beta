'use client'
import { motion } from 'framer-motion'
import { Brain, Code, Zap } from 'lucide-react'
import React from 'react'


const WhyNeoCrawl = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-gray-200 via-black to-gray-200 bg-clip-text text-transparent pb-2">
                        Why Neo Crawl?
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Code className="w-12 h-12" />,
                            title: "Multiple Formats",
                            description: "Markdown, JSON, and n8n workflows – choose what works best for your project."
                        },
                        {
                            icon: <Brain className="w-12 h-12" />,
                            title: "AI-Integration",
                            description: "Smart concise scraping summaries powered by AI (coming soon)."
                        },
                        {
                            icon: <Zap className="w-12 h-12" />,
                            title: "Developer-First",
                            description: "Built for speed, simplicity, and flexibility. Get up and running in minutes."
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            className="relative group bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-lg border border-gray-200 hover:border-purple-400 transition-all duration-500 overflow-hidden"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            {/* Gradient Glow Background */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 via-pink-500 to-purple-700 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500"></div>

                            {/* Icon with Circle Background */}
                            <div className="flex items-center justify-center w-14 h-14 mb-5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                                {feature.description}
                            </p>

                            {/* Decorative Bottom Accent */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                        </motion.div>

                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyNeoCrawl