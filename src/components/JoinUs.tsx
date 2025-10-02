import { Users, ArrowRight, Star, Heart } from 'lucide-react'

const JoinTeam = () => {
  return (
    <section
      className="py-24 bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://ext.same-assets.com/2716400488/4020305900.jpeg')`
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-32 h-32 bg-secondary rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-24 h-24 bg-secondary rounded-full"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-800/90 to-slate-700/90" />

      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto text-white" data-aos="fade-up">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/30">
            <Users className="w-4 h-4 mr-2" />
            Join Our Team
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            Want to be a part of{' '}
            <span className="block mt-2">
              <span className="text-white">something</span>{' '}
              <span className="text-secondary font-bold">special?</span>
            </span>
            <span className="block mt-2 text-white">
              Why not join our dream team?
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Be part of a team that's committed to securing Rwanda's future through innovative insurance solutions. 
            Join us in our mission to provide exceptional service and financial protection to every Rwandan.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-secondary hover:bg-secondary/90 text-primary px-8 py-4 rounded-full font-semibold transition-all duration-300 inline-flex items-center space-x-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
              <Heart className="w-5 h-5" />
              <span>Send us your details</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300 inline-flex items-center space-x-2 text-lg backdrop-blur-sm">
              <span>Learn more about careers</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">50+</h3>
              <p className="text-gray-300">Team Members</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">4.8</h3>
              <p className="text-gray-300">Employee Rating</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">100%</h3>
              <p className="text-gray-300">Job Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default JoinTeam
