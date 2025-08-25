"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  ChevronDown, 
  Book, 
  Key, 
  Code, 
  BarChart3, 
  FileText,
  Zap
} from "lucide-react";

const sidebarItems = [
  {
    title: "Getting Started",
    icon: Book,
    items: [
      { title: "Quick Start", href: "#quickstart" },
      { title: "Installation", href: "#installation" },
      { title: "First API Call", href: "#first-call" }
    ]
  },
  {
    title: "Authentication",
    icon: Key,
    items: [
      { title: "API Keys", href: "#api-keys" },
      { title: "Registration", href: "#registration" },
      { title: "Login", href: "#login" }
    ]
  },
  {
    title: "API Reference",
    icon: Code,
    items: [
      { title: "Scraper Endpoint", href: "#scraper-endpoint" },
      { title: "Rate Limits", href: "#rate-limits" },
      { title: "Response Format", href: "#response-format" }
    ]
  },
  {
    title: "Usage & Limits",
    icon: BarChart3,
    items: [
      { title: "Pricing Plans", href: "#pricing" },
      { title: "Usage Dashboard", href: "#dashboard" },
      { title: "Analytics", href: "#analytics" }
    ]
  },
  {
    title: "Examples",
    icon: FileText,
    items: [
      { title: "cURL Examples", href: "#curl-examples" },
      { title: "JavaScript", href: "#javascript" },
      { title: "Python", href: "#python" },
      { title: "Node.js", href: "#nodejs" }
    ]
  }
];

interface SidebarNavProps {
  activeSection: string;
}

export default function SidebarNav({ activeSection }: SidebarNavProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Getting Started",
    "Authentication",
    "API Reference"
  ]);

  const toggleSection = (title: string) => {
    setExpandedSections(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-80 bg-white border-r border-gray-200 h-screen sticky top-16 overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">API Documentation</h2>
            <p className="text-sm text-gray-500">Complete developer guide</p>
          </div>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections.includes(section.title);
            
            return (
              <div key={section.title}>
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center justify-between w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{section.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </motion.button>
                
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-8 mt-2 space-y-1"
                  >
                    {section.items.map((item) => {
                      const isActive = activeSection === item.href.slice(1);
                      
                      return (
                        <motion.button
                          key={item.title}
                          whileHover={{ x: 4 }}
                          onClick={() => scrollToSection(item.href)}
                          className={`block w-full text-left p-2 rounded-lg text-sm transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {item.title}
                        </motion.button>
                      );
                    })}
                  </motion.div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Quick Links */}
        <div className="mt-8 p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
          <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
          <div className="space-y-2 text-sm">
            <a href="#" className="block text-teal-600 hover:text-teal-700">
              🚀 Get API Key
            </a>
            <a href="#" className="block text-teal-600 hover:text-teal-700">
              📊 View Dashboard
            </a>
            <a href="#" className="block text-teal-600 hover:text-teal-700">
              💬 Join Community
            </a>
            <a href="#" className="block text-teal-600 hover:text-teal-700">
              🐛 Report Issues
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
