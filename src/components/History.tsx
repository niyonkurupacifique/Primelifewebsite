import { Clock, Users, Award, Target, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

const HistorySection = () => {
  const [showValues, setShowValues] = useState(false)
  const milestones = [
    {
      year: "2011",
      title: "Company Establishment",
      description: "Prime Life Assurance Ltd was established in December 2011 by COGEAR Ltd"
    },
    {
      year: "2012",
      title: "Regulatory Licensing",
      description: "In May 2012, Prime Life Assurance Ltd obtained a license from the National Bank of Rwanda to offer life insurance services."
    },
    {
      year: "",
      title: "Ownership Evolution",
      description: "2014 – Owned by Greenoaks Global Holdings\n\n 2017 – Rwanda Mountain Tea & SP Aviation became major shareholders\n\n 2023 – FINAFRICA acquired majority ownership"
    },

    {
      year: "2017",
      title: "Major Shareholders",
      description: "FINAFRICA and SP Aviation"
    },
    {
      year: "2023",
      title: "Current Era",
      description: "FINAFRICA acquired majority ownership"
    },
    {
      year: "",
      title: "Strategic Focus",
      description: "Focusing on credible, innovative, and customer-centric products"
    }
  ]

  return (
    <section className=" py-2  relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Clock className="w-4 h-4 mr-2" />
              Our Journey
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-primary">About</span> Prime Life
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our journey of trust, innovation, and commitment to securing Rwanda's future through comprehensive life insurance solutions.
            </p>
          </div>

          {/* Timeline Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: Timeline */}
            <div className="space-y-8" data-aos="fade-right">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:bg-secondary transition-colors duration-300">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Content */}
            <div className="space-y-8" data-aos="fade-left">
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl border border-primary/10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Foundation
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Prime Life Assurance Ltd was established in December 2011 by COGEAR Ltd to comply with regulatory
                  directives mandating the separation of short-term and long-term insurance policies. In May 2012, Prime
                  Life Assurance Ltd obtained a license from the National Bank of Rwanda to offer life insurance services.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Licensed & Regulated</h4>
                    <p className="text-sm text-gray-600">By National Bank of Rwanda</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-secondary/5 to-primary/5 p-8 rounded-2xl border border-secondary/10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Leading Life Insurance Provider in Rwanda
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Prime Life Insurance Ltd operates as a leading life insurer across Rwanda, with strong roots in the local market.
                </p>




              </div>
            </div>
          </div>



        </div>
      </div>
    </section>
  )
}

export default HistorySection
