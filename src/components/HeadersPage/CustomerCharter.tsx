'use client';

import HeroCustomerCharter from "../HeroCustomerCharter"
import Header from "../Header"
import Footer from "../Footer"
import CustomerCharterMainPage from "../CustomerCharterMainPage"
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const CustomerCharter = () => {
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
          <HeroCustomerCharter />
        </section>

        

        {/* Mission, Vision & Values Section */}
        <section className="relative" data-aos="fade-up">
          <CustomerCharterMainPage />
        </section>

      </main>
      <Footer />
    </div>
  )
}

export default CustomerCharter