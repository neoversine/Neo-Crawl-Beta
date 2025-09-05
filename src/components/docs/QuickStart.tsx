"use client";
import { motion } from "framer-motion";
import { 
  Zap, 
  Shield, 
  Globe, 
  Code, 
  ArrowRight,
  CheckCircle
} from "lucide-react";
import CodeBlock from "./CodeBlock";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get structured data from any website in milliseconds with our optimized scraping engine."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Built with security-first approach. All data is encrypted and API keys are securely managed."
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Scrape websites from anywhere in the world with our distributed infrastructure."
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description: "Simple REST API with comprehensive documentation and multiple response formats."
  }
];

const steps = [
  {
    number: "01",
    title: "Create Account",
    description: "Sign up for a free account to get started with Neo Crawl API",
    endpoint: "POST /auth/register"
  },
  {
    number: "02", 
    title: "Get API Key",
    description: "Generate your unique API key for authentication",
    endpoint: "POST /auth/generate-secret"
  },
  {
    number: "03",
    title: "Start Scraping",
    description: "Make your first API call and get structured data",
    endpoint: "GET /api/scrapper"
  }
];

export default function QuickStart() {
  const registerCode = `{
  "username": "your_username",
  "password": "your_password"
}`;

  const exampleCode = `curl -X GET "https://api.neocrawl.com/api/scrapper?url=https://example.com" \\
  -H "x-api-key: your_api_key"`;

  const responseCode = `{
  "message": "Success",
  "url": "https://example.com",
  "result1": {
    "title": "Example Domain",
    "headings": ["Welcome to Example"],
    "links": [...]
  },
  "result2": "Clean text content...",
  "result3": "# Markdown formatted content"
}`;

  return (
    <section id="quickstart" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
            Get Started in Minutes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform any website into clean, structured data with just a few API calls. 
            Our service is faster, more reliable, and easier to use than traditional web scraping.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Start Steps */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Three Simple Steps
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-full">
                  <div className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent mb-4">
                    {step.number}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h4>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <code className="text-sm bg-gray-100 px-3 py-2 rounded-lg text-teal-600 font-mono">
                    {step.endpoint}
                  </code>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-8"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Example Usage
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                1. Register Account
              </h4>
              <CodeBlock 
                code={registerCode}
                language="json"
                title="POST /auth/register"
              />
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                2. Make API Call
              </h4>
              <CodeBlock 
                code={exampleCode}
                language="bash"
                title="Scrape a Website"
              />
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              3. Get Structured Response
            </h4>
            <CodeBlock 
              code={responseCode}
              language="json"
              title="API Response"
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Building Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
