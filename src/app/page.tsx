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
// import { motion } from "framer-motion";

const page = () => {
  return (
    <div className='bg-white'>
      <SiteNavbar />
      <HeroSection />
      <WhyNeoCrawl />
      <Clients />
      <HowNeoCrawlWorks />
      <IntegrationShowcase />
      <DeveloperSection />
      <PricingSection />
      <GetInTouch />
      <SiteFooter />
      {/* <Potential /> */}
    </div>
  )
}

export default page