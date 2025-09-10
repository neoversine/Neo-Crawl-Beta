// 'use client'
import SiteNavbar from '@/components/basic/SiteNavbar'
import HowNeoCrawlWorks from '@/components/Landing/HowNeoCrawlWorks'
import Clients from '@/components/Landing/Clients'
import HeroSection from '@/components/Landing/HeroSection'
import Potential from '@/components/Landing/Potential'
import React from 'react'
import WhyNeoCrawl from '@/components/Landing/WhyNeoCrawl'
import DeveloperSection from '@/components/Landing/DevelopersSection'
import IntegrationShowcase from '@/components/Landing/IntegrationShowcase'
import { PricingSection } from '@/components/Landing/PricingSection'
import GetInTouch from '@/components/Landing/GetInTouch'
import SiteFooter from '@/components/basic/SiteFooter'
import Hero from '@/components/Landing/Hero'
import DashboardShowcase from '@/components/Landing/DashboardShowcase'
// import { motion } from "framer-motion";

const page = () => {
  return (
    <div className='min-h-screen w-full bg-[#f9fafb] relative'>
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
      <Hero />
      <WhyNeoCrawl />
      {/* <Clients /> */}
      {/* <HeroSection /> */}

      <DashboardShowcase />
      <HowNeoCrawlWorks />
      {/* <IntegrationShowcase /> */}
      <DeveloperSection />
      <PricingSection />
      <GetInTouch />
      <SiteFooter />
      {/* <Potential /> */}
    </div>
  )
}

export default page