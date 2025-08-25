'use client'
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function GetInTouch() {
    return (
        <section className="relative py-16 bg-white text-white overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

            <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-extrabold mb-2 text-black"
                >
                    Let’s <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Get in Touch</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-lg text-gray-600 mb-10"
                >
                    Have questions, ideas, or just want to say hi? Drop your email and we’ll reach out to you.
                </motion.p>

                {/* Email Input Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-full shadow-xl p-[6px] flex items-center justify-between gap-4 border border-black"
                >
                    <div className="flex w-full pl-4 pr-2 py-2 bg-black rounded-full">

                        <div className="grow flex items-center w-full py-1">
                            <Mail className="w-6 h-6 text-white/70 mr-3" />
                            <input
                                type="email"
                                placeholder="Enter your email..."
                                className="w-full bg-transparent text-white placeholder-white/50 focus:outline-none text-lg"
                            />
                        </div>
                        <button
                            className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 text-gray-900 font-semibold shadow-lg hover:shadow-pink-500/40 transition-all whitespace-nowrap"
                        >
                            Get in Touch
                        </button>
                    </div>
                </motion.div>
            </div>
        </section >
    );
}
