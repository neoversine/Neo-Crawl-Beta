import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <div className="z-10 flex flex-col items-center justify-center max-w-7xl w-full h-screen md:max-h-[450px] max-h-[600px] mx-auto py-10 px-4 text-gray-900">
            <div className="z-10 flex flex-col max-w-4xl w-full mx-auto pt-24">
                <h1 className=" leading-[90%] text-6xl text-center font-bold ">Explore the Best Scraper & Crawler API</h1>
                <p className="text-gray-600 text-center mt-5">Test your API instantly with real-time scraping in multiple formats.</p>
            </div>

            <div className="z-10 flex mx-auto gap-4 mt-8">

                {/* Secondary Button */}
                <Link
                    href={'/docs'}
                    className="px-6 py-3 rounded-xl border border-gray-300/40
                 text-gray-800 font-semibold bg-white/70 backdrop-blur-sm
                 shadow-sm hover:bg-gray-50
                 transition-all duration-300"
                >
                    Read Docs
                </Link>
                {/* Primary Button */}
                <Link
                    href={"/api"}
                    className="px-6 py-3 rounded-xl bg-black
                 text-white font-semibold shadow-md hover:shadow-lg
                 transition-all duration-300"
                >
                    Scrape It!
                </Link>
            </div>
        </div>
    )
}

export default Hero