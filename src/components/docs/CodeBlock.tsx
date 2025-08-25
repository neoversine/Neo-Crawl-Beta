"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative group">
      {title && (
        <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-medium rounded-t-lg border-b border-gray-700">
          {title}
        </div>
      )}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-gray-400 text-sm font-medium">{language}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1 text-sm text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition-all duration-200"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </motion.button>
        </div>
        <pre className="p-4 overflow-x-auto text-sm">
          <code className="text-gray-300 font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
}
