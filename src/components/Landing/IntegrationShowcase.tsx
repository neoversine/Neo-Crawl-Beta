'use client'
import { Check, Copy } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { s } from 'framer-motion/client'

const IntegrationShowcase = () => {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopiedCode(type);
        setTimeout(() => setCopiedCode(null), 2000);
    };
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="w-fit text-center mb-16 mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent pb-4 py-5 tracking-wider leading-[90%] bg-[radial-gradient(circle,black,#6c6c6c)] text-center">
                        Seamlessly Integrate
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: "JSON Output",
                            code: `{
  "title": "Example Page",
  "content": "Scraped content...",
  "links": ["url1", "url2"],
  "metadata": {
    "timestamp": "2025-01-27"
  }
}`
                        },
                        {
                            title: "Markdown Output",
                            code: `# Example Page

Scraped content with **formatting** preserved.

## Links Found
- [Link 1](url1)
- [Link 2](url2)

*Scraped on 2025-01-27*`
                        },
                        {
                            title: "n8n Workflow",
                            code: `{
  "nodes": [
    {
      "name": "Neo Crawl",
      "type": "neo-crawl",
      "parameters": {
        "url": "https://example.com",
        "format": "json"
      }
    }
  ]
}`
                        }
                    ].map((example, index) => (
                        <motion.div
                            key={index}
                            className="bg-gradient-to-b from-black to-gray-600 rounded-2xl p-6 relative border-b-6 border-purple-500"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-semibold">{example.title}</h3>
                                <button
                                    onClick={() => copyToClipboard(example.code, example.title)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {copiedCode === example.title ? (
                                        <Check className="w-5 h-5 text-green-400" />
                                    ) : (
                                        <Copy className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <pre className="text-sm text-gray-100 overflow-x-auto">
                                <code>{example.code}</code>
                            </pre>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default IntegrationShowcase