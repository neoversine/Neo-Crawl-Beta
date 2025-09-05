'use client'
import SiteNavbar from "@/components/basic/SiteNavbar";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import ReactMarkdown from "react-markdown";


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
    const [error, setError] = useState("");
    const [scraperResult, setScraperResult] = useState<unknown>(null);
    const [secretToken, setSecretToken] = useState("");

    const handleScrape = async () => {
        setError("");
        setScraperResult(null);
        console.log("ss")

        if (!url.trim()) {
            setError("Please enter a valid URL");
            return;
        }

        try {
            setLoading(true);

            // Get access token from localStorage
            const accessToken = localStorage.getItem("token");
            if (!accessToken) {
                console.log("Not logged in. Please login first.")
                setError("Not logged in. Please login first.");
                return;
            }


            // Step 1: Call /auth/get-secret
            const secretRes = await fetch("http://localhost:8000/auth/get-secret", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!secretRes.ok) {
                const data = await secretRes.json();
                throw new Error(data.detail || "Failed to get secret token");
            }

            const secretData = await secretRes.json();
            setSecretToken(secretData.secret_token);
            console.log(secretData);
            // Step 2: Call /scrapper with x-api-key
            const scraperRes = await fetch(
                `http://localhost:8000/api/scrapper?url=${encodeURIComponent(url)}`,
                {
                    headers: {
                        "X-Api-Key": secretData.secret_token,
                    },
                }
            );
            console.log(scraperRes);

            if (!scraperRes.ok) {
                const data = await scraperRes.json();
                throw new Error(data.detail || "Scraper request failed");
            }

            const scraperData = await scraperRes.json();
            setScraperResult(scraperData);
            setResult({
                json: scraperData.result2,
                markdown: JSON.parse(scraperData.result1).markdown,
                n8n: ""
            })
            console.log(scraperData);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
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
                className="absolute inset-0 z-0 h-screen max-h-[800px]"
                style={{
                    backgroundImage: `
        linear-gradient(to right, #0b4f4a30 1px, transparent 1px),
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
                            <div className="prose max-w-none">
                                {result.markdown ? (
                                    <ReactMarkdown>{result.markdown}</ReactMarkdown>
                                ) : (
                                    "⚡ Run scrape to see Markdown output..."
                                )}
                            </div>
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