'use client';

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ClipboardCheck, UserCheck, ShieldCheck, Heart } from 'lucide-react'


const HeroIntego = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Intego Insurance",
      subtitle: "enables subscriber to do short term or long term savings for future better life during retirement",
      button: "Buy Intego Insurance",
      image: "./IntegoImage.jpeg",
    }
    // {
    //   id: 2,
    //   title: "Loan Protection",
    //   subtitle: "Protecting you even when times are tough",
    //   button: "Buy Loan Insurance",
    //   image: "/LoanProtectionImage.jpeg",
    // },
    // {
    //   id: 3,
    //   title: "Loan Protection",
    //   subtitle: "Protecting you even when times are tough",
    //   button: "Buy Loan Insurance",
    //   image: "/LoanProtectionImage.jpeg",
    // }
  ]

  const steps = [
    {
      id: 1,
      icon: ClipboardCheck,
      title: "Get a Quote",
      description: "Request a personalized insurance quote online or by phone in just minutes."
    },
    {
      id: 2,
      icon: UserCheck,
      title: "Apply Easily",
      description: "Fill out a simple application form tailored to your chosen insurance product."
    },
    {
      id: 3,
      icon: ShieldCheck,
      title: "Approval & Payment",
      description: "Quick approval process with flexible payment options to fit your budget."
    },
    {
      id: 4,
      icon: Heart,
      title: "Stay Protected",
      description: "Enjoy peace of mind knowing you and your loved ones are covered."
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section style={{height:'409.01666259765625px'}} className="relative h-screen overflow-hidden">
      {/* Slider Images */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 duration-1000 transition-opacity ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-primary/70" />
          </div>
        ))}
      </div>

      {/* Centered Content */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="container px-6">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              {slides[currentSlide].subtitle}
            </p>
            <button style={{backgroundColor:'#00AFF3'}} type="button" className="text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{slides[currentSlide].button}</button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      {/* <div className="absolute bottom-44 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-secondary' : 'bg-white/50'
            }`}
          />
        ))}
      </div> */}

      
    </section>
  )
}

export default HeroIntego
