"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HamburgerIcon } from "lucide-react";
import { PiHamburger } from "react-icons/pi";
import { GiHamburger } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";

export default function SiteNavbar() {
    // const [scrolled, setScrolled] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         setScrolled((window.scrollY > 1470 && window.scrollY < 2040) || (window.scrollY > 2250 && window.scrollY < 2590) || (window.scrollY > 2660 && window.scrollY < 3060)); // Trigger after 20px scroll
    //     };
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    return (
        <div className="sticky top-4 z-30 max-md:px-2">
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto py-4 px-5 md:px-9 rounded-3xl border-4 border-white 
           bg-gradient-to-r from-lime-400/30 via-teal-500/30 to-cyan-400/30 
           backdrop-blur-3xl shadow-lg">
                {/* Logo */}
                <Link href="/" className="hidden md:flex items-center gap-2">
                    <h1 className={`text-2xl font-bold my-auto text-teal-950`}>Neo Crawl</h1>
                </Link>

                <Link href="/" className="flex md:hidden items-center gap-2">
                    <h1 className={`text-2xl font-bold my-auto text-teal-950`}>NC</h1>
                </Link>



                {/* Button */}
                <div className="max-md:hidden relative flex w-fit h-fit group">
                    <Link href="/signup">
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.90 }}
                            className={`z-10 py-2 px-5 rounded-full border-white 
                           cursor-pointer backdrop-blur-3xl
                           hover:text-black hover:shadow hover:shadow-gray-700 
                           transition-all duration-500 text-black bg-white border-2`}
                        >
                            Get Started
                        </motion.button>
                    </Link>
                </div>


                <div className="md:hidden relative flex w-fit h-fit group">
                    <Link href="/signup">
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.90 }}
                            className={`z-10 py-2 px-2 rounded-full border-white 
                           cursor-pointer backdrop-blur-3xl
                           hover:text-black hover:shadow hover:shadow-gray-700 
                           transition-all duration-500 text-black bg-white border-2`}
                        >
                            <RxHamburgerMenu />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
