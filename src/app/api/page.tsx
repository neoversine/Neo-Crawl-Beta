'use client'
import SiteNavbar from "@/components/basic/SiteNavbar";
import { useState } from "react";
import { motion } from 'framer-motion'

export default function ScraperTester() {
    const [url, setUrl] = useState<string>("");

    const [format, setFormat] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<"json" | "markdown" | "n8n" | "ai">("markdown");
    const [result, setResult] = useState<{ json: string; markdown: string; n8n: string }>({
        json: "",
        markdown: "",
        n8n: "",
    });

    const apiKey: string = "YOUR_PREPOPULATED_API_KEY";

    const handleScrape = (): void => {
        setLoading(true);
        // Mock scrape result
        setTimeout(() => {
            setResult({
                json: JSON.stringify({ title: "Sample Title", data: [1, 2, 3] }, null, 2),
                markdown: `# Sample Markdown\n- Item 1\n- Item 2`,
                n8n: JSON.stringify({ workflow: "n8n format here" }, null, 2),
            });
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="min-h-screen w-full bg-[#f9fafb] relative">
            {/* Diagonal Fade Grid Background - Top Right */}
            {/* <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
                    backgroundSize: "32px 32px",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
                    maskImage:
                        "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
                }}
            />
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
                    backgroundSize: "32px 32px",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
                    maskImage:
                        "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
                }}
            /> */}

            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        linear-gradient(to right, rgba(79,70,229,0.3) 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
      `,
                    backgroundSize: "40px 40px",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
                    maskImage:
                        "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
                }}
            />
            <SiteNavbar />
            <div className="z-10 flex flex-col items-center max-w-7xl w-full mx-auto py-10 px-4 text-gray-900">

                <div className="z-10 flex flex-col max-w-4xl w-full mx-auto py-24">
                    <h1 className=" leading-[90%] text-6xl text-center font-bold ">Explore the Best Scraper & Crawler API</h1>
                    <p className="text-gray-600 text-center mt-5">Test your API instantly with real-time scraping in multiple formats.</p>
                </div>

                {/* Scrape Input Box */}
                <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl flex items-center py-3 px-4 space-x-4 border-2 border-gray-400/20">
                    <span className="text-gray-400">https://</span>
                    <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="www.example.com"
                        className="z-10 flex-1 outline-none text-gray-800"
                    />
                    {/* <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-purple-400 transition-all duration-200 cursor-pointer"
                    >
                        <option value="markdown">📄 Format: Markdown</option>
                        <option value="json">🗂 Format: JSON</option>
                        <option value="n8n">⚙️ Format: n8n</option>
                    </select> */}

                    <div className="z-10 p-1 rounded-xl bg-white shadow border border-gray-400/10">
                        <button
                            onClick={handleScrape}
                            disabled={loading}
                            className="px-4 py-2 rounded-lg bg-gradient-to-br from-lime-400/50 via-teal-500/50 to-cyan-400/50
 text-teal-900 font-medium hover:opacity-90 disabled:opacity-60 hover:shadow hover:shadow-green-800 hover:scale-[101%] active:shadow-none active:scale-[100%]"
                        >
                            {loading ? "Scraping..." : "Start scraping"}
                        </button>
                    </div>
                </div>

                {/* Result Tabs */}
                <div className="w-full max-w-5xl mt-10">
                    <div className="relative flex text-sm font-medium">
                        <motion.div
                            animate={{ x: activeTab === "markdown" ? 0 : 125 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            }}
                            className={`absolute top-0 z-0 h-12 w-32 rounded-full bg-black `}></motion.div>
                        <button
                            onClick={() => setActiveTab("markdown")}
                            className={`z-10 flex justify-center items-center h-12 w-32  ${activeTab === "markdown" ? " text-white" : "text-gray-500"}`}
                        >
                            Markdown
                        </button>
                        <button
                            onClick={() => setActiveTab("json")}
                            className={`z-10 flex justify-center items-center h-12 w-32  ${activeTab === "json" ? " text-white" : "text-gray-500"}`}
                        >
                            JSON Response
                        </button>
                    </div>

                    <div className="p-6 bg-gray-50 font-mono text-sm overflow-x-auto">
                        {activeTab === "markdown" && (
                            <pre>{result.markdown || "⚡ Run scrape to see Markdown output..."}</pre>
                        )}
                        {activeTab === "json" && (
                            <pre>{result.json || "⚡ Run scrape to see JSON response..."}</pre>
                        )}
                    </div>
                </div>

                {/* Bottom Actions */}
                {/* <div className="flex justify-between w-full max-w-5xl mt-6 text-sm text-gray-600">
                    <span>⚠️ Report issue</span>
                    <div className="space-x-2">
                        <button className="px-3 py-1 border rounded-md hover:bg-gray-100">JSON</button>
                        <button className="px-3 py-1 border rounded-md hover:bg-gray-100">Markdown</button>
                    </div>
                </div> */}
            </div>


            {/* Your Content/Components */}
            {/* </div> */}
        </div>

    );
}