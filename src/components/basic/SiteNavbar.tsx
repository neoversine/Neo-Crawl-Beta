"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SiteNavbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled((window.scrollY > 1470 && window.scrollY < 2040) || (window.scrollY > 2250 && window.scrollY < 2590) || (window.scrollY > 2660 && window.scrollY < 3060)); // Trigger after 20px scroll
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.div
            initial={{
                borderRadius: 0,
                width: "100%",
                top: "0px",
                background:
                    "linear-gradient(to right, rgba(163, 230, 53, 0.3), rgba(20, 184, 166, 0.3), rgba(34, 211, 238, 0.3)); ",
                backdropFilter: "blur(0px)",
            }}
            animate={{
                borderRadius: "1.5rem",
                width: "1300px",
                top: "16px",
                background:
                    "linear-gradient(to right, rgba(163, 230, 53, 0.3), rgba(20, 184, 166, 0.3), rgba(34, 211, 238, 0.3)); ",
                backdropFilter: "blur(15px)", // = backdrop-blur-3xl
                border: "3px solid #ffffff"
            }
            }
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="sticky z-30 mx-auto bg-gradient-to-r from-lime-400/30 via-teal-500/30 to-cyan-400/30

 shadow-lg"
        >
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto py-4 px-6">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    {/* <Image src="/logo.png" alt="logo" height={35} width={35} /> */}
                    <h1 className={`text-2xl font-bold my-auto ${scrolled ? 'text-white' : 'text-teal-950 '}`}>Neo Crawl</h1>
                </div>

                {/* Button */}
                <div className="relative flex w-fit h-fit group">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`z-10 py-2 px-5 rounded-full border-white 
                       cursor-pointer backdrop-blur-3xl
                       hover:text-black hover:shadow hover:shadow-purple-950 
                       transition-all duration-500 text-black bg-white border-2`}
                    >
                        Get Started
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
