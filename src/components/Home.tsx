'use client';

import Header from './Header'
import Hero from './Hero'
import Features from './Features'
import About from './About'
import Test from './Test'
import Services from './Services'
import WhyChoose from './WhyChoose'
import Stats from './Stats'
import QuoteForm from './QuoteForm'
import Team from './Team'
import Testimonials from './Testimonials'
import News from './News'
import Footer from './Footer'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'
import HowItWorks from './HowItworks'



function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true // only animate once on scroll
    })
  }, [])
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Stats />
        {/* <Features /> */}
        <About />
        <Services />
        {/* <HowItWorks /> */}
        
        {/* <QuoteForm />
        <Team /> */}
        <Testimonials />
        <News />
      </main>
      <Footer />
    </div>
  )
}

export default Home
