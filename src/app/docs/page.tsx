"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DocsNavbar from "@/components/docs/DocsNavbar";
import SidebarNav from "@/components/docs/SidebarNav";
import QuickStart from "@/components/docs/QuickStart";
import ApiEndpoint from "@/components/docs/ApiEndpoint";
import CodeBlock from "@/components/docs/CodeBlock";
import { 
  Shield, 
  BarChart3, 
  Code, 
  Database,
  CheckCircle,
  AlertTriangle,
  Zap
} from "lucide-react";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("quickstart");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "quickstart",
        "authentication", 
        "api-reference",
        "limits",
        "examples"
      ];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // API Examples
  const registerExample = `{
  "username": "your_username",
  "password": "your_secure_password"
}`;

  const registerResponse = `{
  "msg": "user created",
  "user_id": "12345"
}`;

  const loginExample = `# Form Data
username=your_username
password=your_secure_password`;

  const loginResponse = `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600
}`;

  const generateSecretExample = `curl -X POST "https://api.neocrawl.com/auth/generate-secret" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`;

  const secretResponse = `{
  "secret_token": "ncl_sk_1234567890abcdef...",
  "created_at": "2025-08-25T10:00:00Z"
}`;

  const scrapeExample = `curl -X GET "https://api.neocrawl.com/api/scrapper?url=https://example.com" \\
  -H "x-api-key: ncl_sk_1234567890abcdef..."`;

  const scrapeResponse = `{
  "message": "Success",
  "url": "https://example.com",
  "result1": {
    "title": "Example Domain",
    "meta_description": "This domain is for use in illustrative examples...",
    "headings": {
      "h1": ["Example Domain"],
      "h2": ["About", "Contact"],
      "h3": []
    },
    "links": [
      {
        "text": "More information...",
        "href": "https://www.iana.org/domains/example",
        "type": "external"
      }
    ],
    "images": [
      {
        "src": "https://example.com/logo.png",
        "alt": "Example Logo",
        "width": 200,
        "height": 100
      }
    ],
    "structured_data": {}
  },
  "result2": "Example Domain\\n\\nThis domain is for use in illustrative examples in documents...",
  "result3": "# Example Domain\\n\\nThis domain is for use in illustrative examples..."
}`;

  const dashboardExample = `curl -X GET "https://api.neocrawl.com/usage/dashboard" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`;

  const dashboardResponse = `{
  "user_id": "12345",
  "plan": 1,
  "monthly_limit": 20,
  "calls_made": 15,
  "calls_remaining": 5,
  "reset_date": "2025-09-01T00:00:00Z",
  "usage_history": [
    {
      "date": "2025-08-25",
      "calls": 3,
      "success_rate": 100
    }
  ]
}`;

  const jsExample = `const neoCrawl = async (url) => {
  const response = await fetch(\`https://api.neocrawl.com/api/scrapper?url=\${encodeURIComponent(url)}\`, {
    headers: {
      'x-api-key': 'your_api_key'
    }
  });
  
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  
  return await response.json();
};

// Usage
try {
  const data = await neoCrawl('https://example.com');
  console.log('Scraped data:', data.result1);
} catch (error) {
  console.error('Error:', error);
}`;

  const pythonExample = `import requests

class NeoCrawl:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.neocrawl.com"
    
    def scrape(self, url):
        headers = {"x-api-key": self.api_key}
        params = {"url": url}
        
        response = requests.get(
            f"{self.base_url}/api/scrapper",
            headers=headers,
            params=params
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()

# Usage
crawler = NeoCrawl("your_api_key")
result = crawler.scrape("https://example.com")
print(result["result1"])`;

  const nodejsExample = `const axios = require('axios');

class NeoCrawl {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.neocrawl.com';
  }

  async scrape(url) {
    try {
      const response = await axios.get(\`\${this.baseURL}/api/scrapper\`, {
        params: { url },
        headers: { 'x-api-key': this.apiKey }
      });
      
      return response.data;
    } catch (error) {
      throw new Error(\`Neo Crawl API Error: \${error.response?.data?.message || error.message}\`);
    }
  }
}

// Usage
const crawler = new NeoCrawl('your_api_key');
crawler.scrape('https://example.com')
  .then(data => console.log(data.result1))
  .catch(error => console.error(error));`;

  return (
    <div className="min-h-screen bg-gray-50">
      <DocsNavbar />
      
      <div className="flex pt-16">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <SidebarNav activeSection={activeSection} />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-white via-teal-50 to-cyan-50 py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Neo Crawl API
                  </h1>
                </div>
                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Transform any website into clean, structured data with our blazing-fast web scraping API. 
                  Better than Firecrawl, faster than traditional scrapers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Started Free
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 transition-all duration-300"
                  >
                    View Examples
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Quick Start */}
          <QuickStart />

          {/* Authentication Section */}
          <section id="authentication" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-teal-500" />
                  <h2 className="text-4xl font-bold text-gray-900">Authentication</h2>
                </div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Secure your API access with our robust authentication system. Get your API key in three simple steps.
                </p>
              </motion.div>

              <div className="space-y-8">
                <ApiEndpoint
                  method="POST"
                  endpoint="/auth/register"
                  title="Create Account"
                  description="Register a new user account to get started with Neo Crawl API."
                  parameters={[
                    { name: "username", type: "string", required: true, description: "Your unique username" },
                    { name: "password", type: "string", required: true, description: "Strong password (min 8 characters)" }
                  ]}
                  requestExample={registerExample}
                  responseExample={registerResponse}
                />

                <ApiEndpoint
                  method="POST"
                  endpoint="/auth/login"
                  title="User Login"
                  description="Authenticate and receive an access token for API operations."
                  parameters={[
                    { name: "username", type: "string", required: true, description: "Your username" },
                    { name: "password", type: "string", required: true, description: "Your password" }
                  ]}
                  requestExample={loginExample}
                  responseExample={loginResponse}
                  requestLanguage="text"
                />

                <ApiEndpoint
                  method="POST"
                  endpoint="/auth/generate-secret"
                  title="Generate API Key"
                  description="Generate your secret API key for making scraping requests."
                  headers={[
                    { name: "Authorization", value: "Bearer YOUR_ACCESS_TOKEN", description: "Access token from login" }
                  ]}
                  requestExample={generateSecretExample}
                  responseExample={secretResponse}
                  requestLanguage="bash"
                />
              </div>
            </div>
          </section>

          {/* API Reference Section */}
          <section id="api-reference" className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Database className="w-8 h-8 text-teal-500" />
                  <h2 className="text-4xl font-bold text-gray-900">API Reference</h2>
                </div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Complete reference for all Neo Crawl API endpoints with detailed examples and response formats.
                </p>
              </motion.div>

              <div className="space-y-8">
                <ApiEndpoint
                  method="GET"
                  endpoint="/api/scrapper"
                  title="Scrape Website"
                  description="Extract structured data from any website URL. Returns JSON, text, and markdown formats."
                  parameters={[
                    { name: "url", type: "string", required: true, description: "The URL to scrape (must be properly encoded)" }
                  ]}
                  headers={[
                    { name: "x-api-key", value: "YOUR_API_KEY", description: "Your secret API key" }
                  ]}
                  requestExample={scrapeExample}
                  responseExample={scrapeResponse}
                  requestLanguage="bash"
                />

                <ApiEndpoint
                  method="GET"
                  endpoint="/usage/dashboard"
                  title="Usage Dashboard"
                  description="Get detailed analytics and usage statistics for your API consumption."
                  headers={[
                    { name: "Authorization", value: "Bearer YOUR_ACCESS_TOKEN", description: "Access token from login" }
                  ]}
                  requestExample={dashboardExample}
                  responseExample={dashboardResponse}
                  requestLanguage="bash"
                />
              </div>
            </div>
          </section>

          {/* Usage Limits Section */}
          <section id="limits" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <BarChart3 className="w-8 h-8 text-teal-500" />
                  <h2 className="text-4xl font-bold text-gray-900">Usage Limits & Pricing</h2>
                </div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Flexible pricing plans to suit your needs, from hobby projects to enterprise applications.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {[
                  {
                    plan: "Free",
                    planNumber: 0,
                    price: "$0",
                    calls: "10",
                    features: ["10 API calls/month", "Basic support", "JSON + Text output", "Rate limit: 1/sec"]
                  },
                  {
                    plan: "Starter",
                    planNumber: 1,
                    price: "$9",
                    calls: "20",
                    features: ["20 API calls/month", "Email support", "All output formats", "Rate limit: 2/sec"],
                    popular: true
                  },
                  {
                    plan: "Pro",
                    planNumber: 2,
                    price: "$29",
                    calls: "30",
                    features: ["30 API calls/month", "Priority support", "Advanced features", "Rate limit: 5/sec"]
                  }
                ].map((tier, index) => (
                  <motion.div
                    key={tier.plan}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                      tier.popular ? 'border-teal-500 scale-105' : 'border-gray-200'
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.plan}</h3>
                      <div className="text-4xl font-bold text-gray-900 mb-1">{tier.price}</div>
                      <div className="text-gray-500 mb-6">per month</div>
                      <div className="text-lg font-semibold text-teal-600 mb-6">
                        {tier.calls} API calls included
                      </div>
                      <ul className="space-y-3 mb-8">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                          tier.popular
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg hover:shadow-xl'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        Get Started
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Important Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-amber-50 border border-amber-200 rounded-2xl p-6"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Important Notes</h4>
                    <ul className="text-amber-700 space-y-1 text-sm">
                      <li>• API limits reset monthly on your registration date</li>
                      <li>• Exceeding your limit returns a <code className="bg-amber-100 px-1 rounded">403 Forbidden</code> error</li>
                      <li>• Upgrade anytime to increase your monthly quota</li>
                      <li>• Enterprise plans available for higher volume needs</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Examples Section */}
          <section id="examples" className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Code className="w-8 h-8 text-teal-500" />
                  <h2 className="text-4xl font-bold text-gray-900">Code Examples</h2>
                </div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Ready-to-use code examples in your favorite programming language. Copy, paste, and start scraping!
                </p>
              </motion.div>

              <div className="space-y-12">
                {/* JavaScript Example */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">JS</span>
                    </div>
                    JavaScript / Browser
                  </h3>
                  <CodeBlock code={jsExample} language="javascript" />
                </motion.div>

                {/* Python Example */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">PY</span>
                    </div>
                    Python
                  </h3>
                  <CodeBlock code={pythonExample} language="python" />
                </motion.div>

                {/* Node.js Example */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">JS</span>
                    </div>
                    Node.js
                  </h3>
                  <CodeBlock code={nodejsExample} language="javascript" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <section className="py-20 bg-gradient-to-r from-teal-500 to-cyan-500">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Zap className="w-10 h-10 text-white" />
                  <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Ready to Start Scraping?
                  </h2>
                </div>
                <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of developers who trust Neo Crawl for their web scraping needs. 
                  Get started in minutes, not hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Create Free Account
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-teal-600 transition-all duration-300"
                  >
                    View Pricing
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
