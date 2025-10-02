'use client';

import HeroWhoWeAre from "../HeroWhoWeAre"
import Header from "../Header"
import Footer from "../Footer"
import HistorySection from "../History"
import MissionVisionValues from "../MissionAndVisionValues"
import WorkingHours from "../WorkingHours"
import JoinTeam from "../JoinUs"
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const WhoWeArePage = () => {
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
        <section className="relative bg-gradient-to-r from-primary via-primary to-primary">
          <HeroWhoWeAre />
        </section>

        {/* History Section */}
        <section className="relative " data-aos="fade-up">
          <HistorySection />
        </section>

        {/* Mission, Vision & Values Section */}
        <section className="relative" data-aos="fade-up">
          <MissionVisionValues />
        </section>

        {/* Working Hours Section */}
        <section className="relative " data-aos="fade-up">
          <WorkingHours />
        </section>

       
      </main>
      <Footer />
    </div>
  )
}

export default WhoWeArePage