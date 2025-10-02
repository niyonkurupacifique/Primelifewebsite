import { Phone, Check } from 'lucide-react'

const About = () => {
  const benefits = [
    "Customizable life insurance packages.",
    "Quick and transparent claims process.",
    "Over 30 years serving Rwandan families."
  ]

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6">
              Empowering Rwandans Through Trusted Life Insurance
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Prime Life Insurance Rwanda offers innovative life insurance solutions tailored to meet your financial goals and family needs. We are committed to your future security and peace of mind.
            </p>

            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-gray-800">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* <a
                href="#contact"
                className="bg-secondary hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-md transition duration-300"
              >
                Get a Free Consultation
              </a> */}

              <div className="flex items-center space-x-3 text-primary">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <a
                    href="tel:+250788123456"
                    className="font-semibold text-primary hover:text-secondary"
                  >
                    +250 788 150 100
                  </a>
                  <p className="text-sm text-gray-500">Call our experts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src="./educPic.jpg"
                alt="Prime Life Family"
                className="w-full h-auto object-cover "
              />
              <div className="absolute bottom-4 left-4 bg-primary text-white py-2 px-4 rounded-lg shadow-md">
                <div className="text-xl font-semibold">30+ Years Experience</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About
