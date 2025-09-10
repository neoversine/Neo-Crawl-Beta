'use client'
import React from 'react'
import { Safari } from './HeroLaptop'
import { HeroMobile } from './HeroMobile'

const DashboardShowcase = () => {
    return (
        <section className="w-full py-32 sm:pt-32 lg:pt-40">
            <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-6xl mx-auto py-10 px-6 lg:px-0 gap-10">

                {/* Left Content */}
                <article className="flex items-center w-full lg:w-2/5 pr-0 lg:pr-10 text-center lg:text-left">
                    <div className="flex flex-col pt-4 pb-4">
                        <header>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold capitalize leading-snug">
                                Unlock the power of
                                <br />
                                <span className="relative bg-gradient-to-r from-teal-900 to-teal-600 bg-clip-text text-transparent text-4xl sm:text-5xl lg:text-6xl animate-gradient">
                                    Web Scraping
                                </span>
                            </h1>
                        </header>

                        <p className="mt-4 text-sm sm:text-base text-gray-700 max-w-md mx-auto lg:mx-0">
                            Discover the ultimate web scraping service that empowers businesses to extract
                        </p>

                        <div className="relative flex justify-center lg:justify-start gap-4 w-fit h-fit mt-6 mx-auto lg:mx-0 group">
                            <span className="px-6 py-3 rounded-lg bg-black
                                text-white font-semibold shadow-md hover:shadow-lg
                                transition-all duration-300 cursor-pointer">
                                Start Crawling
                            </span>
                        </div>
                    </div>
                </article>

                {/* Right Content */}
                <aside className="relative w-full lg:w-1/2 flex flex-col items-center lg:items-end">
                    {/* Mobile Preview */}
                    <div className="absolute -bottom-8 lg:-bottom-0 left-1/2 lg:left-auto -translate-x-1/2 lg:translate-x-0 z-10 w-[100px] sm:w-[130px] lg:w-[150px]">
                        <HeroMobile
                            className="size-full"
                            src="/landing/hero-mobile.png"
                        />
                    </div>

                    {/* Laptop Preview */}
                    <div className="relative w-full sm:w-[90%] lg:w-[80%] ml-auto md:mt-16 lg:mt-auto border-b rounded-md">
                        <Safari
                            url="magicui.design"
                            className="size-full"
                            imageSrc="/landing/hero-laptop.png"
                        />
                    </div>
                </aside>
            </div>
        </section>
    )
}

export default DashboardShowcase
