'use client'
import { motion } from "framer-motion";
import Image from "next/image";

export default function DeveloperSection() {
    const devs = [
        {
            name: "Jyotirmoy",
            role: "Frontend & Product",
            img: "/landing/dev/jyoti.jpeg",
            desc: "Crafts smooth user experiences and manages product vision. Ensures Neo Crawl looks and feels amazing.",
            twitter: "https://twitter.com/jyotirmoy",
            github: "https://github.com/jyotirmoy",
            linkedin: "https://linkedin.com/in/jyotirmoy",
        },
        {
            name: "Ankon",
            role: "Backend & Infrastructure",
            img: "/landing/dev/ankon.jpeg",
            desc: "Loves building scalable systems and APIs. Handles the engine behind Neo Crawl.",
            twitter: "https://twitter.com/ankon",
            github: "https://github.com/ankon",
            linkedin: "https://linkedin.com/in/ankon",
        },
        {
            name: "Arka",
            role: "AI & Automation",
            img: "/landing/dev/arka.jpeg",
            desc: "Passionate about automation workflows and AI integrations. The brain behind smart scraping outputs.",
            twitter: "https://twitter.com/arka",
            github: "https://github.com/arka",
            linkedin: "https://linkedin.com/in/arka",
        },
    ];

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="flex max-md:flex-col items-center gap-10 max-w-6xl mx-auto px-6 relative">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center md:w-[30%]"
                >
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                        Meet the{" "}
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-900 text-5xl">
                            Developers
                        </span>
                    </h2>
                    {/* <p className="text-gray-600 max-w-2xl mx-auto text-base">
                        Built with passion and precision — Neo Crawl is brought to life by
                        developers who love simplifying the complex.
                    </p> */}
                </motion.div>

                {/* Developer Cards */}
                <div className="md:w-[70%] grid grid-cols-3">
                    {devs.map((dev, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            className="group relative flex flex-col items-center p-3 transition-all"
                        >
                            {/* Avatar */}
                            <div className="w-32 h-32 md:w-24 md:h-24 rounded-full overflow-hidden shadow ring-4 ring-indigo-200 mb-5 group-hover:scale-110 transition-all duration-500">
                                <Image
                                    src={dev.img}
                                    alt={dev.name}
                                    width={96}
                                    height={96}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* Name */}
                            <h3 className="text-lg font-semibold text-gray-900 text-center">
                                {dev.name}
                            </h3>
                            <p className="text-sm text-center text-indigo-600 mt-1">{dev.role}</p>
                            {/* <p className="text-xs text-gray-500 text-center mt-2">
                                {dev.desc}
                            </p> */}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
