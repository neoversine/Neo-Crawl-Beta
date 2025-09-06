'use client'
import SiteNavbar from "@/components/basic/SiteNavbar";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import ReactMarkdown from "react-markdown";


export default function ScraperTester() {
    const [url, setUrl] = useState<string>("");

    const [format, setFormat] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<"json" | "markdown" | "text" | "ai">("markdown");
    const [result, setResult] = useState<{ json: string; markdown: string; text: string }>({
        json: "",
        markdown: "",
        text: "",
    });
    const [error, setError] = useState("");
    const [scraperResult, setScraperResult] = useState<unknown>(null);
    const [secretToken, setSecretToken] = useState("");

    const handleScrape = async () => {
        setError("");
        setScraperResult(null);

        if (!url.trim()) {
            setError("Please enter a valid URL");
            return;
        }

        try {
            setLoading(true);

            // Get access token from localStorage
            const accessToken = localStorage.getItem("token");
            if (!accessToken) {
                setError("Not logged in. Please login first.");
                return;
            }


            // Step 1: Call /auth/get-secret
            const secretRes = await fetch("https://fasttools.neoversine.in/auth/get-secret", {
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
            
            // Step 2: Call /scrapper with x-api-key
            const scraperRes = await fetch(
                `https://fasttools.neoversine.in/api/scrapper?url=${encodeURIComponent(url)}`,
                {
                    headers: {
                        "X-Api-Key": secretData.secret_token,
                    },
                }
            );

            if (!scraperRes.ok) {
                const data = await scraperRes.json();
                throw new Error(data.detail || "Scraper request failed");
            }

            const scraperData = await scraperRes.json();
            setScraperResult(scraperData);
            
            // Try to parse result1, handle errors gracefully
            let parsedResult1;
            try {
                parsedResult1 = JSON.parse(scraperData.result1);
            } catch (error) {
                console.error("Failed to parse result1:", error);
                parsedResult1 = {
                    json: null,
                    markdown: "Failed to parse markdown content",
                    html: "",
                    links: [],
                    summary: "",
                    metadata: {}
                };
            }
            
            // Format and structure the results properly - INCLUDE EVERYTHING
            const formattedJSON = {
                success: true,
                message: scraperData.message || "API call successful",
                url: scraperData.url || "Unknown URL",
                api_usage: {
                    calls_today: scraperData.calls_today || 0,
                    calls_made_month: scraperData.calls_made_month || 0,
                    plan_limit: scraperData.plan_limit || 0,
                    last_reset: {
                        daily: scraperData.last_day_reset || "Unknown",
                        monthly: scraperData.last_month_reset || "Unknown"
                    }
                },
                scraped_content: {
                    // Raw results from API
                    result1_structured: parsedResult1,
                    result2_clean_text: scraperData.result2 || "No text content",
                    result3_markdown: scraperData.result3 || "No markdown content",
                    
                    // Parsed structured data
                    company_info: parsedResult1.json || {
                        company_name: null,
                        company_description: null
                    },
                    
                    // All extracted content
                    markdown_content: parsedResult1.markdown || "No markdown available",
                    html_content: parsedResult1.html || "No HTML available",
                    clean_text: parsedResult1.summary || "No summary available",
                    
                    // Links and navigation
                    extracted_links: parsedResult1.links || [],
                    
                    // Technical metadata
                    scrape_metadata: parsedResult1.metadata || {
                        language: "unknown",
                        scrapeId: "unknown",
                        sourceURL: "unknown",
                        url: "unknown",
                        statusCode: 0,
                        contentType: "unknown",
                        proxyUsed: "unknown",
                        cacheState: "unknown",
                        creditsUsed: 0
                    }
                },
                
                // Include the complete raw response for debugging
                raw_api_response: {
                    full_result1: scraperData.result1,
                    full_result2: scraperData.result2,
                    full_result3: scraperData.result3,
                    all_metadata: {
                        calls_today: scraperData.calls_today,
                        calls_made_month: scraperData.calls_made_month,
                        plan_limit: scraperData.plan_limit,
                        last_day_reset: scraperData.last_day_reset,
                        last_month_reset: scraperData.last_month_reset,
                        message: scraperData.message,
                        url: scraperData.url
                    }
                }
            };
            
            // Clean and format markdown (handle \n properly)
            const cleanMarkdown = parsedResult1.markdown
                ? parsedResult1.markdown.replace(/\\n/g, '\n').trim()
                : 'No markdown content available';
            
            // Clean and format text (handle \n properly)  
            const cleanText = scraperData.result2
                ? scraperData.result2.replace(/\\n/g, '\n').replace(/={40,}/g, '\n---\n').trim()
                : 'No text content available';
            
            setResult({
                json: JSON.stringify(formattedJSON, null, 2),
                markdown: cleanMarkdown,
                text: cleanText
            })
            
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

                {/* Error Display */}
                {error && (
                    <div className="w-full max-w-3xl mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center">
                            <div className="text-red-400 mr-3">⚠️</div>
                            <div>
                                <h3 className="text-red-800 font-medium">Error occurred</h3>
                                <p className="text-red-600 text-sm mt-1">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Result Tabs */}
                <div className="w-full max-w-5xl mt-10">
                    <div className="relative flex text-sm font-medium">
                        <motion.div
                            animate={{ 
                                x: activeTab === "markdown" ? 0 : 
                                   activeTab === "json" ? 130 : 
                                   activeTab === "text" ? 260 : 0 
                            }}
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
                        <button
                            onClick={() => setActiveTab("text")}
                            className={`z-10 flex justify-center items-center h-12 w-32  ${activeTab === "text" ? " text-white" : "text-gray-500"}`}
                        >
                            Clean Text
                        </button>
                    </div>

                    <div className="p-6 bg-gray-50 text-sm overflow-x-auto">
                        {activeTab === "markdown" && (
                            <div className="prose prose-sm max-w-none bg-white p-6 rounded-lg shadow-sm">
                                {result.markdown && result.markdown !== 'No markdown content available' ? (
                                    <ReactMarkdown 
                                        components={{
                                            h1: ({children}) => <h1 className="text-2xl font-bold text-gray-900 mb-4">{children}</h1>,
                                            h2: ({children}) => <h2 className="text-xl font-semibold text-gray-800 mb-3">{children}</h2>,
                                            h3: ({children}) => <h3 className="text-lg font-medium text-gray-700 mb-2">{children}</h3>,
                                            p: ({children}) => <p className="text-gray-700 mb-3 leading-relaxed">{children}</p>,
                                            ul: ({children}) => <ul className="list-disc list-inside text-gray-700 mb-3">{children}</ul>,
                                            ol: ({children}) => <ol className="list-decimal list-inside text-gray-700 mb-3">{children}</ol>,
                                            li: ({children}) => <li className="mb-1">{children}</li>,
                                            code: ({children}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>,
                                            pre: ({children}) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">{children}</pre>
                                        }}
                                    >
                                        {result.markdown}
                                    </ReactMarkdown>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-gray-400 text-lg mb-2">📄</div>
                                        <p className="text-gray-500 font-medium">No markdown content available</p>
                                        <p className="text-gray-400 text-sm">Run a scrape to see formatted content</p>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === "json" && (
                            <div className="bg-gray-900 p-6 rounded-lg shadow-sm">
                                {result.json ? (
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-white font-medium">Structured Response</h3>
                                            <button 
                                                onClick={() => navigator.clipboard.writeText(result.json)}
                                                className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded border border-gray-600 hover:border-gray-400"
                                            >
                                                Copy JSON
                                            </button>
                                        </div>
                                        <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                                            {result.json}
                                        </pre>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-gray-400 text-lg mb-2">⚡</div>
                                        <p className="text-gray-300 font-medium">No JSON data available</p>
                                        <p className="text-gray-400 text-sm">Run a scrape to see structured data</p>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === "text" && (
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                {result.text && result.text !== 'No text content available' ? (
                                    <div className="font-sans text-gray-800 leading-relaxed">
                                        {result.text.split('\n').map((line, index) => {
                                            // Handle separator lines
                                            if (line.includes('---')) {
                                                return <hr key={index} className="my-4 border-gray-300" />;
                                            }
                                            // Handle headers (lines ending with :)
                                            if (line.endsWith(':') && line.length > 1) {
                                                return <h3 key={index} className="font-semibold text-gray-900 mt-6 mb-2 text-lg">{line}</h3>;
                                            }
                                            // Handle empty lines
                                            if (line.trim() === '') {
                                                return <br key={index} />;
                                            }
                                            // Handle regular content
                                            return <p key={index} className="mb-2 text-gray-700">{line}</p>;
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-gray-400 text-lg mb-2">📝</div>
                                        <p className="text-gray-500 font-medium">No text content available</p>
                                        <p className="text-gray-400 text-sm">Run a scrape to see clean text output</p>
                                    </div>
                                )}
                            </div>
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