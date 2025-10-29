'use client'
import { useRouter } from 'next/navigation'

const PrimeInsurance = () => {
  const router = useRouter()

  return (
    <section className="relative min-h-screen py-16 md:py-24 flex items-center" style={{ backgroundColor: '#00adef' }}>
      <div className="container mx-auto px-4 w-full">
        <div className="flex flex-col items-center justify-center space-y-8 md:space-y-12">
          {/* Logo Section */}
          <div className="flex items-center justify-center w-full">
            <img
              src="/primeGroupImage-removebg-preview.png"
              alt="Prime Group Insurance"
              className="h-32 md:h-40 lg:h-48 w-auto  "
            />
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl px-4">
            {/* Life Insurance Button */}
            <button
              onClick={() => router.push('/Home')}
              className="flex-1 bg-[#00b0ef]  hover:bg-gray-50 px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md  transform  transition-all duration-300 group"
            >
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-center">
                <span style={{ color: '#f4cb0d' }}>Life</span>{' '}
                <span className="text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Insurance</span>
              </h3>
            </button>

            {/* General Insurance Button */}
            <button
              onClick={() => router.push('/general-insurance')}
              className="flex-1 bg-[#00b0ef] hover:bg-gray-50 px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-md  transform  transition-all duration-300 group"
            >
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-center">
                <span style={{ color: '#f4cb0d' }}>General</span>{' '}
                <span className="text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Insurance</span>
              </h3>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrimeInsurance

