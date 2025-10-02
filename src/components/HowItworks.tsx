import { ClipboardCheck, UserCheck, ShieldCheck, Heart } from 'lucide-react'

const steps = [
  {
    id: 1,
    icon: ClipboardCheck,
    title: "Get a Quote",
    description: "Request a personalized insurance quote online or by phone in just minutes."
  },
  {
    id: 2,
    icon: UserCheck,
    title: "Apply Easily",
    description: "Fill out a simple application form tailored to your chosen insurance product."
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Approval & Payment",
    description: "Quick approval process with flexible payment options to fit your budget."
  },
  {
    id: 4,
    icon: Heart,
    title: "Stay Protected",
    description: "Enjoy peace of mind knowing you and your loved ones are covered."
  }
]

const HowItWorks = () => {
  return (
    <section className="section-padding bg-gray-50" id="how-it-works">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary mb-12" data-aos="fade-up">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-default"
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                <div className="w-14 h-14 mx-auto flex items-center justify-center bg-primary/10 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
