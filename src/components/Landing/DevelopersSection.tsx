'use client'
import { motion } from "framer-motion";
import Image from "next/image";

export default function DeveloperSection() {
    const devs = [
        ,
        {
            name: "Jyotirmoy",
            role: "Frontend & Product",
            img: "/landing/dev/jyoti.jpeg",
            desc: "Crafts smooth user experiences and manages product vision. Ensures Neo Crawl looks and feels amazing.",
            twitter: "https://twitter.com/jyotirmoy",
            github: "https://github.com/jyotirmoy",
            linkedin: "https://linkedin.com/in/jyotirmoy"
        }, {
            name: "Ankon",
            role: "Backend & Infrastructure",
            img: "/landing/dev/ankon.jpeg",
            desc: "Loves building scalable systems and APIs. Handles the engine behind Neo Crawl.",
            twitter: "https://twitter.com/ankon",
            github: "https://github.com/ankon",
            linkedin: "https://linkedin.com/in/ankon"
        },
        {
            name: "Arka",
            role: "AI & Automation",
            img: "/landing/dev/arka.jpeg",
            desc: "Passionate about automation workflows and AI integrations. The brain behind smart scraping outputs.",
            twitter: "https://twitter.com/arka",
            github: "https://github.com/arka",
            linkedin: "https://linkedin.com/in/arka"
        }
    ];


    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Subtle gradient background effect */}
            {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_60%)]"></div> */}

            <div className="flex items-center gap-10 max-w-7xl mx-auto px-6 relative">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-5xl font-extrabold text-white mb-6">
                        Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400">Developers</span>
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto px-10">
                        Built with passion and precision — Neo Crawl is brought to life by developers who love simplifying the complex.
                    </p>
                </motion.div>

                {/* Developer Cards */}
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {devs.map((dev, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            // whileHover={{ y: -8, scale: 1.05 }}
                            className="group relative flex flex-col items-center"
                        >
                            {/* Avatar */}
                            <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg ring-4 ring-purple-500/40 mb-5 mx-auto group-hover:scale-[115%] transition-all duration-700">
                                <Image
                                    src={dev?.img || ""}
                                    alt={dev?.name || ""}
                                    width={112}
                                    height={112}
                                    className="object-cover"
                                />
                            </div>

                            {/* Name */}
                            <h3 className="text-xl font-semibold text-white text-center">{dev?.name}</h3>
                            <p className="text-sm text-gray-400 mt-1">{dev?.role}</p>

                            {/* Social Links (optional) */}
                            {/* <div className="flex gap-4 mt-4">
                                {dev?.twitter && (
                                    <a href={dev.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                )}
                                {dev?.github && (
                                    <a href={dev.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                                        <i className="fab fa-github"></i>
                                    </a>
                                )}
                            </div> */}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

    );
}
