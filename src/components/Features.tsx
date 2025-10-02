import { Shield,FileText,Zap } from "lucide-react"

const Features = () => {
  const features = [
    {
      id: 1,
      icon: Shield,
      title: "Safe your money",
      description: "Lorem ipsum dolor amet consectetur adipiscing elit do eiusmod tempor incid idunt ut labore.",
      link: "#"
    },
    {
      id: 2,
      icon: FileText,
      title: "Get free quote",
      description: "Lorem ipsum dolor amet consectetur adipiscing elit do eiusmod tempor incid idunt ut labore.",
      link: "#"
    },
    {
      id: 3,
      icon: Zap,
      title: "Fast & reliable",
      description: "Lorem ipsum dolor amet consectetur adipiscing elit do eiusmod tempor incid idunt ut labore.",
      link: "#"
    }
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4">
            Why Choose Prime Life?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Discover the advantages that make us the trusted choice for life insurance in Rwanda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="w-14 h-14 sm:w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors group-hover:scale-110 transform duration-300">
                      <img
                        src="https://ext.same-assets.com/1717637306/2547667607.png"
                        alt="Feature Icon"
                        className="w-7 h-7 sm:w-8 h-8"
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2 sm:mb-3 group-hover:text-secondary transition-colors">
                      <a href={feature.link} className="hover:underline">
                        {feature.title}
                      </a>
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}

export default Features
