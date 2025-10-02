'use client';

 // Values Modal Component

  import { Target, Eye, Heart, ArrowRight, Star, Shield, Users, Award, Zap, TrendingUp, ChevronRight, X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { SetShowValuesModal, OpenValuesModal, CloseValuesModal } from './Reducers/ValuesModalReducer'

 const ValuesModel=()=>{

 const dispatch = useAppDispatch()
 const showValuesModal = useAppSelector((state) => state.valuesModal.showValuesModal)
  
  const values = [
    { 
      name: "Result Focused", 
      icon: Target, 
      description: "We strive to achieve and exceed customer expectations through our ongoing quest and drive for excellence, with unmatched innovative customer focus.", 
      color: "from-yellow-400 to-yellow-600" 
    },
    { 
      name: "Teamwork", 
      icon: Users, 
      description: "Our commitment to service reflects our collective effort: if one of us fails or succeeds, the team also fails or succeeds.", 
      color: "from-blue-400 to-blue-600" 
    },
    { 
      name: "Communication", 
      icon: Heart, 
      description: "We communicate consistently using simple, clear messages that reflect our vision and mission in all our actions and service.", 
      color: "from-pink-400 to-pink-600" 
    },
    { 
      name: "Trust", 
      icon: Shield, 
      description: "Our clients and colleagues staff can always rely on us to deliver what we promise.", 
      color: "from-green-400 to-green-600" 
    },
    { 
      name: "Learning and Growth", 
      icon: Award, 
      description: "We continuously improve employees' skills and knowledge of customer needs to maintain consistently superior service delivery.", 
      color: "from-purple-400 to-purple-600" 
    },
    { 
      name: "Meritocracy", 
      icon: Star, 
      description: "We recognize and award the best talents, ensuring continuous career development at all levels of our organization.", 
      color: "from-orange-400 to-orange-600" 
    },
    { 
      name: "Excellence", 
      icon: Zap, 
      description: "We deliver what we promise and add value that goes beyond what is expected.", 
      color: "from-red-400 to-red-600" 
    }
  ]

  
 
 
 
 const ValuesModelContents = () => (

    
    
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ease-in-out ${showValuesModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${showValuesModal ? 'opacity-100' : 'opacity-0'}`} onClick={() => dispatch(CloseValuesModal())}></div>
      <div className={`relative bg-white rounded-3xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto transition-all duration-500 ease-out transform ${showValuesModal ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}>
        <button 
          onClick={() => dispatch(CloseValuesModal())}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Core Values</h2>
          <p className="text-gray-600">The principles that guide everything we do</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <div key={index} className="group p-6 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 mb-4">Ready to experience our values in action?</p>
          <button 
            onClick={() => dispatch(CloseValuesModal())}
            className="bg-[#159fdb] hover:bg-[#1389c4] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  )

  return(
    <div>
      <button 
        onClick={() => dispatch(OpenValuesModal())}
        className="bg-[#159fdb] hover:bg-[#1389c4] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        View Our Core Values
      </button>
      <ValuesModelContents/>
    </div>
  )

  }

  export default ValuesModel