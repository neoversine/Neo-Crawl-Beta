'use client'
import { motion } from "framer-motion";
import Image from "next/image";

export default function HowNeoCrawlWorks() {
    const steps = [
        {
            img: "/landing/how/login.png",
            title: "Register",
            text: "Create your account and step into the world of web scraping.",
        },
        {
            img: "/landing/how/token.png",
            title: "Get Token",
            text: "Secure your unique token to unlock our powerful API services.",
        },
        {
            img: "/landing/how/crawl.png",
            title: "Crawl Sites",
            text: "Easily scrape and collect data from the sites you need.",
        },
        {
            img: "/landing/how/dashboard.png",
            title: "Get Analytics",
            text: "Turn raw data into meaningful insights with smart analytics.",
        },
    ];

    return (
        <div className="w-full bg-black py-20">
            <div className="flex w-full max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center w-full">
                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-4xl sm:text-5xl tracking-wide font-bold text-white text-center"
                    >
                        How Neo Crawl Works
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-gray-400 mt-4 text-center max-w-2xl"
                    >
                        Revolutionize your data-driven decision making with our cutting edge
                        web scraping solution
                    </motion.p>

                    {/* Steps */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full mt-16 gap-10">
                        {steps.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2, duration: 0.6 }}
                                viewport={{ once: true }}
                                // whileHover={{ scale: 1.05 }}
                                className="w-full h-fit p-8 bg-white/5 border border-gray-700 rounded-2xl shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-[105%] duration-500 cursor-pointer"
                            >
                                <div className="flex flex-col items-center text-center space-y-5">
                                    <div className="p-4 bg-white rounded-full shadow-md">
                                        <Image
                                            src={item.img}
                                            alt={item.title}
                                            height={100}
                                            width={100}
                                            className="w-[80px] h-[80px] object-contain"
                                        />
                                    </div>
                                    <h2 className="text-lg font-semibold uppercase tracking-wide text-white">
                                        {item.title}
                                    </h2>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {item.text}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
