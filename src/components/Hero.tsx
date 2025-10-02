'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ClipboardCheck, UserCheck, ShieldCheck, Heart } from 'lucide-react'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Prime Life Insurance",
      subtitle: "Secure tomorrow today.",
      video: "./Prime Life Insurance - Web Animation 2.mp4",
    },
    // {
    //   id: 2,
    //   title: "Prime Life Insurance",
    //   subtitle: "Secure tomorrow today.",
    //   video: "/backgroundvid.mp4",
    // },
    // {
    //   id: 3,
    //   title: "Prime Life Insurance.",
    //   subtitle: "Secure tomorrow today",
    //   video: "/backgroundvid.mp4",
    // }
  ]

  const steps = [
    {
      id: 1,
      icon: ClipboardCheck,
      title: "Get a Quote",
      description: "Request a personalized insurance quote online or by phone in just minutes.",
      action: () => {
        // Scroll to products section
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: "Make a Claim",
      description: "Start your claim process in just a few steps.",
      action: () => {
        // Open external link
        window.open('https://apps.prime.rw/customerportaltest/Home/products', '_blank');
      }
    },
    {
      id: 3,
      icon: ShieldCheck,
      title: "Statements & Contracts",
      description: "Access your policy documents and financial statements with ease.",
      action: () => {
        // Open external link
        window.open('https://apps.prime.rw/customerportaltest/Home/products', '_blank');
      }
    },
    {
      id: 4,
      icon: Heart,
      title: "Customer Testimonies",
      description: "Hear what our customers are saying about us.",
      action: () => {
        // Scroll to testimonials section
        const testimonialsSection = document.getElementById('testimonials');
        if (testimonialsSection) {
          testimonialsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
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
    <section className="relative min-h-screen h-screen overflow-hidden">
      {/* Video Background */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 duration-1000 transition-opacity ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={slide.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-primary/20 max-sm:bg-primary/5" />
          </div>
        ))}
      </div>

      {/* Centered Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl">
          <div className="max-w-4xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              {/* {slides[currentSlide].title} */}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 leading-relaxed max-w-2xl">
              {/* {slides[currentSlide].subtitle} */}
            </p>
            {/* CTA Button for mobile */}
            <div className="block md:hidden">
              {/* <button className="bg-secondary hover:bg-yellow-600 text-primary font-semibold px-6 py-3 rounded-md transition duration-300">
                Get Started Today
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Better positioned for mobile */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-colors z-20 touch-manipulation"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-colors z-20 touch-manipulation"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6" />
      </button>

      {/* How It Works Cards - Responsive positioning and sizing */}
      <div className="absolute bottom-0 left-0 w-full px-3 sm:px-4 md:px-6 lg:px-12 pb-4 sm:pb-28 md:pb-8 lg:pb-24 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={step.id}
                  onClick={step.action}
                  className="bg-white backdrop-blur-sm p-2 sm:p-3 md:p-4 lg:p-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105 border border-white/20"
                >
                  <div className="w-6 h-6 sm:w-8 h-8 md:w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-1 sm:mb-2 md:mb-3 lg:mb-4 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-3 h-3 sm:w-4 h-4 md:w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <h4 className="text-xs sm:text-base max-sm:text-black md:text-base lg:text-lg font-semibold text-primary text-center mb-1 sm:mb-2">{step.title}</h4>
                  <p className="text-xs text-gray-600 text-center leading-tight">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
