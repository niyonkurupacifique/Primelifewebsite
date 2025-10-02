import { Zap, ShieldCheck, Users2, HeartHandshake, CheckCircle } from 'lucide-react'

const WhyChoose = () => {
  const reasons = [
    {
      id: 1,
      icon: Zap,
      title: "Quick & Seamless Claims",
      description: "We ensure every claim is processed efficiently and transparently so you can focus on what matters."
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: "Trusted by Rwandans",
      description: "With over a decade of experience, we are one of Rwanda’s most reliable life insurance providers."
    },
    {
      id: 3,
      icon: Users2,
      title: "Tailored Insurance Products",
      description: "From family protection to driver plans, our solutions are built around the real needs of our communities."
    },
    {
      id: 4,
      icon: HeartHandshake,
      title: "People-Centered Approach",
      description: "We’re more than a business — we’re partners in protecting your loved ones and future plans."
    }
  ]

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="why-choose">
      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://ext.same-assets.com/1717637306/542675693.png"
          alt="Shape"
          className="absolute top-10 left-10 w-16 h-16 opacity-30"
        />
        <img
          src="https://ext.same-assets.com/1717637306/980257697.png"
          alt="Shape"
          className="absolute top-20 right-20 w-12 h-12 opacity-20"
        />
        <img
          src="https://ext.same-assets.com/1717637306/3754923621.png"
          alt="Shape"
          className="absolute bottom-20 left-1/4 w-14 h-14 opacity-25"
        />
      </div>

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div data-aos="fade-up">
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src="https://ext.same-assets.com/1717637306/3333512688.png"
                  alt="Shape"
                  className="w-6 h-6"
                />
                <span className="text-brown font-medium uppercase tracking-wider">Why Choose Us</span>
                <img
                  src="https://ext.same-assets.com/1717637306/2837952146.png"
                  alt="Shape"
                  className="w-6 h-6"
                />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary leading-tight">
                Why Rwandans Trust Prime Life Insurance
              </h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                We're committed to empowering every Rwandan with financial protection that’s affordable, reliable, and tailored to your life’s journey.
              </p>
            </div>

            {/* Benefit Items */}
            <div className="space-y-6">
              {reasons.map((reason, index) => {
                const Icon = reason.icon
                return (
                  <div
                    key={reason.id}
                    className="flex items-start space-x-4 group"
                    data-aos="fade-up"
                    data-aos-delay={index * 150}
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg group-hover:bg-primary/20 transition">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-1 group-hover:text-secondary transition">
                        {reason.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative" data-aos="zoom-in">
            <img
              src="https://prime.rw/public/themes/assets/img/prime-staff.jpg"
              alt="Prime Life Staff"
              className="w-full max-w-lg mx-auto rounded-xl shadow-md"
            />

            <div className="absolute bottom-8 left-8 bg-white px-4 py-3 rounded-lg shadow-lg border">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500 w-5 h-5" />
                <div>
                  <h4 className="font-semibold text-primary">Rated Excellent</h4>
                  <p className="text-xs text-gray-500">By thousands of satisfied clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChoose
