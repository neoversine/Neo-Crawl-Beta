'use client'
import React from "react";
import { motion } from "framer-motion";
import { MousePointerClick, User, Key, Globe, BarChart } from "lucide-react";


const steps = [
    {
        title: "Register",
        text: "Create your account to get started and personalize your experience.",
        icon: <User className="h-6 w-6" />,
    },
    {
        title: "Get Token",
        text: "Generate your secure API token to start crawling safely.",
        icon: <Key className="h-6 w-6" />,
    },
    {
        title: "Crawl Sites",
        text: "Start your first crawl and structure the extracted data.",
        icon: <Globe className="h-6 w-6" />,
    },
    {
        title: "Get Analytics",
        text: "Monitor performance, track success rates, and export insights.",
        icon: <BarChart className="h-6 w-6" />,
    },
];



export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900 relative">
            {/* Decorative background blur */}
            <div className="max-md:hidden absolute inset-0 -z-10">
                <div className="absolute top-20 left-1/3 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
            </div>

            <section className="mx-auto max-w-6xl px-4 py-16">
                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 text-center md:text-left">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight text-neutral-900">
                            Your 4-Step Journey
                        </h2>
                        <p className="mt-3 text-lg text-neutral-600">
                            Follow this flow to launch your first crawl in minutes.
                        </p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-sm text-neutral-500">
                        <MousePointerClick className="h-4 w-4" /> Interactive steps
                    </div>
                </div>

                {/* Timeline */}
                <ol className="relative grid gap-8 md:gap-10">
                    {/* Timeline vertical line */}
                    <div className="absolute left-[32px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-teal-400 via-cyan-400 to-transparent"></div>

                    {steps.map((s, i) => (
                        <motion.li
                            key={s.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 * i, duration: 0.6 }}
                            className="group relative flex items-start gap-6"
                        >
                            {/* Step Badge with Icon */}
                            <div className="relative z-10 flex-shrink-0 bg-white">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-400/30 via-teal-500/30 to-cyan-400/30 text-teal-950 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    {s.icon}
                                </div>
                            </div>

                            {/* Step Card */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex-1 rounded-3xl border border-neutral-200 bg-white/80 backdrop-blur-lg p-6 shadow-sm hover:shadow-lg transition-all"
                            >
                                <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                                <p className="mt-2 text-neutral-600">{s.text}</p>

                                {/* Guidance Bullets */}
                                {s.title === "Register" && (
                                    <ul className="mt-3 grid gap-1.5 text-sm text-neutral-600">
                                        <li>• Use a work email to keep tokens scoped to your org.</li>
                                        <li>• Enable 2FA in <span className="font-medium">Settings → Security</span>.</li>
                                    </ul>
                                )}
                                {s.title === "Get Token" && (
                                    <ul className="mt-3 grid gap-1.5 text-sm text-neutral-600">
                                        <li>• Go to <span className="font-medium">Dashboard → API Tokens</span>.</li>
                                        <li>• Create a token with <span className="font-medium">read/write</span> scope.</li>
                                        <li>• Store securely in <span className="font-medium">.env</span>.</li>
                                    </ul>
                                )}
                                {s.title === "Crawl Sites" && (
                                    <ul className="mt-3 grid gap-1.5 text-sm text-neutral-600">
                                        <li>• POST <code className="rounded bg-neutral-100 px-1 py-0.5">/api/crawl</code> with target URL.</li>
                                        <li>• Configure selectors or use auto-extract.</li>
                                        <li>• Respect robots.txt and rate limits.</li>
                                    </ul>
                                )}
                                {s.title === "Get Analytics" && (
                                    <ul className="mt-3 grid gap-1.5 text-sm text-neutral-600">
                                        <li>• Track success rates, response times, data volume.</li>
                                        <li>• Export as CSV/JSON or connect a warehouse.</li>
                                        <li>• Set alerts for anomalies.</li>
                                    </ul>
                                )}
                            </motion.div>
                        </motion.li>
                    ))}
                </ol>
            </section>
        </div>

    );
}
