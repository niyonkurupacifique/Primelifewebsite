'use client';

import HeroShareHolders from "../HeroShareHolders"
import Header from "../Header"
import Footer from "../Footer"
import Shareholders from "./Shareholders"
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const ShareHoldersComponents = () => {
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
        <section className="relative">
          <HeroShareHolders />
        </section>

        

        {/* Mission, Vision & Values Section */}
        <section className="relative" data-aos="fade-up">
          <Shareholders />
        </section>

      </main>
      <Footer />
    </div>
  )
}

export default ShareHoldersComponents