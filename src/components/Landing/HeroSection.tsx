'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from "framer-motion"
import { Safari } from './HeroLaptop'
import { HeroMobile } from './HeroMobile'

const HeroSection = () => {
    return (
        <section className="w-full pt-14">
            <div className="flex justify-between w-full max-w-7xl mx-auto py-10">
                {/* Left Content */}
                <article className="flex items-center w-2/5">
                    <div className="flex flex-col pt-4 pb-4">
                        <header>
                            <h1 className="text-7xl font-bold capitalize">
                                Unlock the power of <span className="relative bg-gradient-to-r from-indigo-200 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-gradient">
                                    web
                                </span>
                                <br />
                                <span className="relative bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-200 bg-clip-text text-transparent animate-gradient2">
                                    Scraping
                                </span>
                            </h1>
                        </header>

                        <p className="mt-5 text-gray-600">
                            Discover the ultimate web scraping service that empowers businesses to extract
                        </p>

                        <div className="relative flex w-fit h-fit mt-6 group">
                            <button
                                aria-label="Get started with our web scraping service"
                            >
                                <div className='bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-1 rounded-2xl shadow shadow-black/40'>
                                    <span className="relative block rounded-xl bg-white/70 backdrop-blur-2xl px-7 py-2">
                                        Get Started
                                    </span>
                                </div>
                            </button>

                        </div>
                    </div>
                </article>

                {/* Right Content */}
                <aside className="relative w-1/2">
                    <div className='absolute bottom-0 z-10 w-[150px]'>
                        <div className="relative">
                            <HeroMobile
                                className="size-full"
                                src="/landing/hero-mobile.png"
                            />
                        </div>
                    </div>
                    <div className="relative w-[80%] ml-auto mt-auto border-b rounded-md">
                        <Safari
                            url="magicui.design"
                            className="size-full"
                            imageSrc="/landing/hero-laptop.png"
                        />
                    </div>
                    {/* <Image
                        src="/landing/hero.png"
                        alt="Illustration showing web scraping technology"
                        width={300}
                        height={200}
                        className="w-full object-cover"
                    /> */}
                </aside>

            </div>
        </section>

    )
}

export default HeroSection