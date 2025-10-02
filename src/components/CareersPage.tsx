'use client';

import React from 'react'
import Header from "./Header"
import Footer from "./Footer"
import HeroCareers from './HeroCareers'
import AvailablePositions from './AvailablePositions'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const CareersPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out'
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="relative">
        {/* Hero Section */}
        <section className="relative" data-aos="fade-up">
          <HeroCareers />
        </section>
        
        {/* Available Positions Section */}
        <section className="relative" data-aos="fade-up">
          <AvailablePositions />
        </section>
        
       
      </main>
      <Footer />
    </div>
  )
}

export default CareersPage
