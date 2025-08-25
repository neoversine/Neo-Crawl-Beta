"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Book, Home, Code, Key, BarChart3, FileText } from "lucide-react";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Quick Start", href: "#quickstart", icon: Book },
  { name: "API Reference", href: "#api-reference", icon: Code },
  { name: "Authentication", href: "#authentication", icon: Key },
  { name: "Usage Limits", href: "#limits", icon: BarChart3 },
  { name: "Examples", href: "#examples", icon: FileText },
];

export default function DocsNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("quickstart");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.filter(item => item.href.startsWith('#')).map(item => item.href.slice(1));
      
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

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NC</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Neo Crawl
              </span>
              <span className="text-sm bg-gradient-to-r from-teal-500 to-cyan-500 px-2 py-1 rounded-full text-white font-medium">
                Docs
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = item.href.startsWith('#') ? activeSection === item.href.slice(1) : false;
              
              return (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => item.href.startsWith('#') ? scrollToSection(item.href) : null}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.href === "/" ? (
                    <Link href={item.href} className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = item.href.startsWith('#') ? activeSection === item.href.slice(1) : false;
                
                return (
                  <button
                    key={item.name}
                    onClick={() => item.href.startsWith('#') ? scrollToSection(item.href) : null}
                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {item.href === "/" ? (
                      <Link href={item.href} className="flex items-center gap-3 w-full">
                        <Icon className="w-4 h-4" />
                        {item.name}
                      </Link>
                    ) : (
                      <>
                        <Icon className="w-4 h-4" />
                        {item.name}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
