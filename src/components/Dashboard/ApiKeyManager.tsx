'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Copy, RefreshCcw } from 'lucide-react'

export default function ApiKeyManager() {
    const [apiKey, setApiKey] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const fetchSecret = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/auth/get-secret', {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // replace with real token handling
                },
                withCredentials: true,
            })
            setApiKey(res.data.secret_token)
        } catch (err) {
            console.error(err)
        }
    }

    const regenerateSecret = async () => {
        setLoading(true)
        try {
            const res = await axios.post(
                'http://127.0.0.1:8000/auth/generate-secret',
                {},
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    withCredentials: true,
                }
            )
            setApiKey(res.data.secret_token)
        } catch (err) {
            console.error(err)
        }
        setLoading(false)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(apiKey)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    useEffect(() => {
        fetchSecret()
    }, [])

    return (
        <div className="flex flex-col py-4">
            <div className="flex items-center bg-white text-black w-full max-w-4xl gap-4">
                <h1 className="text-xl font-semibold">Your API Key:</h1>
                <span className="font-mono text-sm truncate rounded-2xl p-4 border border-gray-300">{apiKey || 'Loading...'}</span>

                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 bg-gray-200 px-3 py-3 rounded-xl hover:bg-gray-300 transition shadow-lg"
                >
                    <Copy size={16} /> Copy
                </button>

                <div className='w-fit h-fit border border-gray-400/30 rounded-xl bg-white p-1'>
                    <button
                        onClick={regenerateSecret}
                        disabled={loading}
                        className="flex items-center gap-1 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-400  text-white px-3 py-3 rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50  shadow-inner shadow-black/50 hover:shadow active:shadow-none"
                    >
                        <RefreshCcw size={16} /> {loading ? 'Generating...' : 'Regenerate'}
                    </button>
                </div>

                {copied && <span className="text-green-600 text-sm ml-4">Copied!</span>}
            </div>
        </div>
    )
}
