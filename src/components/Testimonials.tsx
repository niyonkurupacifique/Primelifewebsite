'use client';

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Testimonial } from '../types/testimonials'
import { io, Socket } from 'socket.io-client'

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)

  // API call function directly in component
  const fetchTestimonials = async (): Promise<Testimonial[]> => {
    const API_BASE_URL = 'https://primelife.prime.rw:8080/api';
    
    try {
      const response = await fetch(`${API_BASE_URL}/what-our-clients-says?populate=ProfilePic`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform the API data to match our component's expected format
      return data.data.map((item: any) => ({
        id: item.id,
        name: item.FullNames,
        position: item.Occupation,
        image: item.ProfilePic ? `${API_BASE_URL.replace('/api', '')}${item.ProfilePic.url}` : '',
        content: extractTextFromMessage(item.Message),
        rating: item.RateOutOfFive
      }));
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      // Return empty array on error to prevent component crash
      return [];
    }
  };

  // Helper function to extract text content from the Message array
  const extractTextFromMessage = (message: any[]): string => {
    if (!message || !Array.isArray(message)) {
      return '';
    }
    
    return message
      .map((item) => {
        if (item.children && Array.isArray(item.children)) {
          return item.children
            .map((child: any) => child.text || '')
            .join(' ');
        }
        return '';
      })
      .join(' ')
      .trim();
  };

  // Socket.IO setup and event listeners
  useEffect(() => {
    // Initialize Socket.IO connection
    const newSocket = io('https://primelife.prime.rw:8080', {
      transports: ['websocket', 'polling'],
      timeout: 20000,
    });

    newSocket.on('connect', () => {
      //console.log('✅ Connected to Socket.IO server');
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Socket.IO connection error:', error);
    });

    // Listen for real-time updates
    newSocket.on('What_Our_Clients_Say_created', (data) => {
      //console.log('🆕 New testimonial created:', data);
      // Refresh testimonials to get the latest data
      fetchTestimonials().then(newTestimonials => {
        setTestimonials(newTestimonials);
        // Show notification or update UI as needed
      });
    });

    newSocket.on('What_Our_Clients_Say_updated', (data) => {
      //console.log('🔄 Testimonial updated:', data);
      // Refresh testimonials to get the latest data
      fetchTestimonials().then(newTestimonials => {
        setTestimonials(newTestimonials);
        // Show notification or update UI as needed
      });
    });

    newSocket.on('What_Our_Clients_Say_deleted', (data) => {
      //console.log('🗑️ Testimonial deleted:', data);
      // Remove the deleted testimonial from state
      setTestimonials(prev => prev.filter(testimonial => testimonial.id !== data.data.id));
      // Show notification or update UI as needed
    });

    setSocket(newSocket);

    // Cleanup function
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true)
        const data = await fetchTestimonials()
        setTestimonials(data)
        setError(null)
      } catch (err) {
        setError('Failed to load testimonials')
        console.error('Error loading testimonials:', err)
      } finally {
        setLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  const nextSlide = () => {
    if (testimonials.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }
  }

  const prevSlide = () => {
    if (testimonials.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(nextSlide, 5000)
      return () => clearInterval(timer)
    }
  }, [testimonials])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg sm:text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ))
  }

  // Loading state
  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 px-4" id="testimonials">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 sm:mb-4">
            What Our Clients Say
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4">
            At Prime Life Insurance Rwanda, our clients are at the heart of everything we do.
          </p>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 sm:py-16 md:py-20 px-4" id="testimonials">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 sm:mb-4">
            What Our Clients Say
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4">
            At Prime Life Insurance Rwanda, our clients are at the heart of everything we do.
          </p>
          <div className="text-red-600 py-8">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  // No testimonials state
  if (testimonials.length === 0) {
    return (
      <section className="py-12 sm:py-16 md:py-20 px-4" id="testimonials">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 sm:mb-4">
            What Our Clients Say
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4">
            At Prime Life Insurance Rwanda, our clients are at the heart of everything we do.
          </p>
          <div className="text-gray-500 py-8">
            <p>No testimonials available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4" id="testimonials">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 sm:mb-4">
          What Our Clients Say
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4">
          At Prime Life Insurance Rwanda, our clients are at the heart of everything we do.
        </p>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-3 sm:px-4 md:px-6">
                  <div className="bg-blue-50 p-4 sm:p-6 md:p-8 rounded-xl shadow-md text-center mx-auto max-w-lg">
                    <img
                      src={testimonial.image || 'https://randomuser.me/api/portraits/lego/1.jpg'}
                      alt={testimonial.name}
                      className="w-16 h-16 sm:w-18 h-18 md:w-20 h-20 rounded-full mx-auto mb-3 sm:mb-4 object-cover border-3 sm:border-4 border-blue-100"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://randomuser.me/api/portraits/lego/1.jpg';
                      }}
                    />
                    <h3 className="text-lg sm:text-xl font-semibold text-blue-900">{testimonial.name}</h3>
                    <p className="text-blue-700 text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3">{testimonial.position}</p>
                    <div className="mb-3 sm:mb-4">{renderStars(testimonial.rating)}</div>
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg italic leading-relaxed">"{testimonial.content}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows - Better positioned and sized for mobile */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 sm:left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white p-2 sm:p-3 rounded-full shadow-md hover:bg-blue-700 transition-colors touch-manipulation z-10"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 h-5 md:w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 sm:right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white p-2 sm:p-3 rounded-full shadow-md hover:bg-blue-700 transition-colors touch-manipulation z-10"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 h-5 md:w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Dots - Better spacing and touch targets for mobile */}
        {testimonials.length > 1 && (
          <div className="flex justify-center mt-4 sm:mt-6 space-x-2 sm:space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 sm:w-4 h-4 rounded-full transition-colors touch-manipulation ${
                  index === currentSlide ? 'bg-blue-900' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials