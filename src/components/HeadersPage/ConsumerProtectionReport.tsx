'use client';

import HeroConsumerProtectionReport from "../HeroConsumerProtectionReport"
import Header from "../Header"
import Footer from "../Footer"
import ConsumerProtectionMainPage from "../ConsumerProtectionMainPage"
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const ConsumerProtectionReport = () => {
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
       
        <section className="relative">
          <HeroConsumerProtectionReport />
        </section>

        

        
        <section className="relative" data-aos="fade-up">
          <ConsumerProtectionMainPage />
        </section>

      </main>
      <Footer />
    </div>
  )
}

export default ConsumerProtectionReport