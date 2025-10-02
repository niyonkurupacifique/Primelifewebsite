'use client';

import { useState, useEffect, useRef } from 'react'
import axios from 'axios';

interface Statistics {
  numberOfPolicies: number;
  numberOfClaims: number;
}

const Stats = () => {

  const sectionRef = useRef<HTMLDivElement>(null)
  const [StatisticsNumbers, setStatisticsNumbers] = useState<Statistics | null>(null);
  const [numberOfPoliciesRecorded, SetNumberPoliciesRecorded] = useState(0)
  const [numberOfClaimsRecorded, SetnumberOfClaimsRecorded] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({
    PoliciesRecorded: numberOfPoliciesRecorded === 0 ? <div className="loader"></div> : numberOfPoliciesRecorded,
    ClaimsSettled: numberOfClaimsRecorded === 0 ? <div className="loader"></div> : numberOfClaimsRecorded,
    customersSatisfaction: 0,
    TurnAroundTime: 0
  })

  console.log("numberOfPoliciesRecorded", numberOfPoliciesRecorded)

  const fetchUsers = async () => {
    try {
      const response = await axios.get<Statistics>('https://apps.prime.rw/customerbackendtest/api/statistics/counts');
      console.log("response we have is", response)

      // Only update if the values have actually changed
      if (response.data.numberOfClaims !== numberOfClaimsRecorded ||
        response.data.numberOfPolicies !== numberOfPoliciesRecorded) {
        SetnumberOfClaimsRecorded(response.data.numberOfClaims)
        SetNumberPoliciesRecorded(response.data.numberOfPolicies)
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Initial fetch and set up polling
  useEffect(() => {
    fetchUsers();

    // Poll every 30 seconds for updates
    const pollInterval = setInterval(() => {
      fetchUsers();
    }, 30000); // 30 seconds

    return () => clearInterval(pollInterval);
  }, []);

  const statsData = [
    { id: 1, number: numberOfPoliciesRecorded == 0 ? <span className="loader"></span> : numberOfPoliciesRecorded, suffix: '', label: 'Policies are recorded', target: numberOfPoliciesRecorded },
    { id: 2, number: numberOfClaimsRecorded === 0 ? <span className="loader"></span> : numberOfClaimsRecorded, suffix: '', label: 'Claims are settled', target: numberOfClaimsRecorded }, // Fixed this line
    { id: 3, number: 82.88, suffix: '%', label: 'Customer satisfaction rate', target: 82.88 },
    { id: 4, number: 99.89, suffix: '%', label: 'turnaround time ', target: 99.89 }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  // Animate counters when data changes
  useEffect(() => {
    if (isVisible && numberOfPoliciesRecorded > 0 && !isAnimating) {
      setIsAnimating(true)

      // Clear existing counters
      setCounters({
        PoliciesRecorded: 0,
        ClaimsSettled: 0,
        customersSatisfaction: 0,
        TurnAroundTime: 0
      })

      statsData.forEach(stat => {
        const duration = 3000
        const steps = 60
        const increment = stat.target / steps
        let current = 0

        const timer = setInterval(() => {
          current += increment
          if (current >= stat.target) {
            current = stat.target
            clearInterval(timer)
          }

          setCounters(prev => ({
            ...prev,
            [stat.id === 1 ? 'PoliciesRecorded' :
              stat.id === 2 ? 'ClaimsSettled' :
                stat.id === 3 ? 'customersSatisfaction' : 'TurnAroundTime']: current
          }))
        }, duration / steps)
      })

      // Reset animation flag after animation completes
      setTimeout(() => setIsAnimating(false), 3000)
    }
  }, [isVisible, numberOfPoliciesRecorded, numberOfClaimsRecorded])

  const formatNumber = (num: number, index: number) => {
    return Math.floor(num).toLocaleString()
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-r from-primary to-blue-900 py-20 text-white overflow-hidden"
    >
      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://ext.same-assets.com/1717637306/1293266754.png"
          alt="Shape"
          className="absolute top-10 left-10 w-24 h-24 opacity-10"
        />
        <img
          src="https://ext.same-assets.com/1717637306/1380178013.png"
          alt="Shape"
          className="absolute bottom-10 right-10 w-20 h-20 opacity-10"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Choose Prime Life Insurance?
          </h2>
          <p className="text-white/80 text-lg">
            Prime Life Insurance provides credible, innovative, and reliable long-term insurance solutions.

            We simplify insurance by delivering tailored, market-leading products efficiently, ensuring our clients across Rwanda receive fit-for-purpose protection and exceptional service.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {statsData.map((stat, index) => {
            const currentValue = index === 0 ? counters.PoliciesRecorded :
              index === 1 ? counters.ClaimsSettled :
                index === 2 ? counters.customersSatisfaction : counters.TurnAroundTime

            return (
              <div
                key={stat.id}
                className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 text-center shadow-md hover:scale-105 transition-transform duration-300"
              >
                <div className=" text-4xl font-extrabold text-secondary mb-2">
                  {typeof currentValue === 'number' && !isNaN(currentValue)
                    ? formatNumber(currentValue, index)
                    : <div className="loader"></div>}

                  <span className="text-xl">{stat.suffix}</span>
                </div>
                <p className="text-lg font-medium text-white/90">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Stats