'use client';

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

const HeroWhoWeAre = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "About Prime Life",
      subtitle: "Prime Life Insurance Ltd is a leading Rwandan company providing innovative and reliable long-term life insurance solutions tailored to meet the needs of individuals and businesses.",
      image: "./employeeprotectionImage.jpeg",
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
    <section className="relative  min-h-[350px] overflow-hidden">
      {/* Background Image with Overlay */}
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
            {/* Enhanced overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl text-white">
            

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl mb-6 opacity-90 leading-relaxed max-w-2xl">
              {slides[currentSlide].subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
     
    </section>
  )
}

export default HeroWhoWeAre
