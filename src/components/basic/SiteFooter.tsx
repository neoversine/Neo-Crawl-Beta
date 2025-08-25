'use client'
import { motion } from "framer-motion";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

export default function SiteFooter() {
    return (
        <footer className="relative bg-black text-gray-300 py-12 mt-20 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Brand */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                        Neo Crawl
                    </h2>
                    <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                        Unlock the power of web scraping with <br />
                        APIs that deliver data in <span className="text-white font-medium">Markdown</span>,{" "}
                        <span className="text-white font-medium">JSON</span>, and{" "}
                        <span className="text-white font-medium">n8n</span>.
                    </p>
                </motion.div>

                {/* Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col space-y-2"
                >
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <a href="/docs" className="hover:text-purple-400 transition">Documentation</a>
                    <a href="/api" className="hover:text-purple-400 transition">API Playground</a>
                    <a href="/dashboard" className="hover:text-purple-400 transition">Dashboard</a>
                    <a href="#pricing" className="hover:text-purple-400 transition">Pricing</a>
                    <a href="#developers" className="hover:text-purple-400 transition">About Us</a>
                </motion.div>

                {/* Social + Newsletter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex flex-col space-y-4"
                >
                    <h3 className="text-lg font-semibold text-white">Stay Connected</h3>
                    <div className="flex space-x-4 text-xl">
                        <a href="#" className="hover:text-purple-400 transition"><FaTwitter /></a>
                        <a href="#" className="hover:text-purple-400 transition"><FaGithub /></a>
                        <a href="#" className="hover:text-purple-400 transition"><FaLinkedin /></a>
                    </div>

                    {/* Newsletter */}
                    <div className="flex mt-4">
                        <input
                            type="email"
                            placeholder="Drop your email"
                            className="w-full px-4 py-2 rounded-l-lg bg-gray-800 text-gray-200 focus:outline-none"
                        />
                        <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-r-lg text-white font-semibold hover:opacity-90 transition">
                            Subscribe
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Bottom line */}
            <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Neo Crawl. Built with ❤️ by Ankon, Arka & Jyotirmoy.
            </div>
        </footer>
    );
}
