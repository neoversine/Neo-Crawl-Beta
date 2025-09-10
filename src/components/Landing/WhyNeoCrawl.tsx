'use client'
import React, { useEffect, useRef } from 'react'
import { Brain, Code, Zap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WhyNeoCrawl = () => {
    const cardsRef = useRef<HTMLDivElement[]>([])
    const titleRef = useRef<HTMLHeadingElement | null>(null)

    useEffect(() => {
        // Animate title
        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 97%',
                    },
                }
            )
        }

        // Animate cards with stagger
        if (cardsRef.current.length) {
            gsap.fromTo(
                cardsRef.current,
                { y: 50, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: 'power3.out',
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: cardsRef.current[0].parentElement,
                        start: 'top 95%',
                    },
                }
            )
        }
    }, [])

    const features = [
        {
            icon: <Code className="w-12 h-12" />,
            title: 'Multiple Formats',
            description:
                'Markdown, JSON, and n8n workflows – choose what works best for your project.',
        },
        {
            icon: <Brain className="w-12 h-12" />,
            title: 'AI-Integration',
            description:
                'Smart concise scraping summaries powered by AI (coming soon).',
        },
        {
            icon: <Zap className="w-12 h-12" />,
            title: 'Developer-First',
            description:
                'Built for speed, simplicity, and flexibility. Get up and running in minutes.',
        },
    ]

    return (
        <section className="pt-32 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-gray-200 via-black to-gray-200 bg-clip-text text-transparent pb-2"
                    >
                        Why Neo Crawl?
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el
                            }}
                            className="relative group bg-white/90 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-gray-200  transition-all duration-500 overflow-hidden"
                        >

                            {/* Icon with Circle Background */}
                            <div className="flex items-center justify-center w-14 h-14 mb-5 rounded-2xl bg-gradient-to-r from-lime-400/30 via-teal-500/30 to-cyan-400/30 text-teal-700 md:text-white group-hover:text-teal-900 shadow-md group-hover:scale-[105%] transition-transform duration-300">
                                {feature.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-black  transition-colors duration-300">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                                {feature.description}
                            </p>

                            {/* Decorative Bottom Accent */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyNeoCrawl
