'use client';

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ClipboardCheck, UserCheck, ShieldCheck, Heart } from 'lucide-react'

const HeroComplaints = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Complaints",
      subtitle: "Have an issue? We're here to listen and respond.",
      button: "Buy Education Insurance",
      image: "",
    },
   
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
      <div className="absolute inset-0 flex items-center  z-10">
        <div className="container px-6">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl text-center lg:text-6xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl text-center mb-8 opacity-90 leading-relaxed">
              {/* {slides[currentSlide].subtitle} */}
            </p>
          
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

export default HeroComplaints
