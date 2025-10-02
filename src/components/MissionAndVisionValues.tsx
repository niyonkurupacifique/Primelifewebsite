'use client';

import { Target, Eye, Heart, ArrowRight, Star, Shield, Users, Award, Zap, TrendingUp, ChevronRight, X, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { SetShowValuesModal, OpenValuesModal, CloseValuesModal } from './Reducers/ValuesModalReducer'
import { useAppDispatch, useAppSelector } from '../hooks'
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// Add CSS animations for modal
const modalStyles = `
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .modal-enter {
    animation: fadeInDown 0.6s ease-out;
  }
  
  .modal-content-enter {
    animation: fadeInUp 0.6s ease-out;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = modalStyles;
  document.head.appendChild(styleSheet);
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: 800,
  maxHeight: '90vh',
  bgcolor: '#ffffff',
  border: 'none',
  borderRadius: '16px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
  p: 0,
  overflow: 'hidden',
  outline: 'none',
  '@media (max-width: 640px)': {
    width: '95vw',
    maxHeight: '95vh',
    borderRadius: '12px',
  },
};

const MissionVisionValues = () => {
  const [activeView, setActiveView] = useState('modern') // 'cards', 'timeline', 'interactive', 'modern'
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  
const dispatch = useAppDispatch()

const showValuesModal = useAppSelector((state) => state.valuesModal.showValuesModal)

 if(showValuesModal){
  console.log("show modal state is true ")
 }
 else {
   console.log("show modal state is false ")
 }
 

  const missionData = {
    title: "Our Mission",
    content: "To ensure that each and every Rwandan has access to the appropriate insurance cover provided with the highest level of customer service and satisfaction.",
    icon: Target,
    color: "from-yellow-400 to-yellow-600",
    bgImage: "/office-man-yellow.jpg"
  }

  const visionData = {
    title: "Our Vision", 
    content: "To be the leading and most admired financial institution in Rwanda by all customers and employees.",
    icon: Eye,
    color: "from-blue-400 to-blue-600",
    bgImage: "/grass-blue.jpg"
  }

  const valuesData = {
    title: "Our Values",
    content: "",
    icon: Heart,
    color: "from-green-400 to-green-600",
    bgImage: "/ourValuesImage.jpeg"
  }

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

 

  // Modern View - New sophisticated design
  const ModernView = () => (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center  mb-10">
        <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
          Our Mission, Vision & Values
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the foundation that drives our commitment to serving Rwanda with excellence
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {/* Mission */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-[#3b82f6]/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative  rounded-3xl p-8 lg:p-10   transition-all duration-500 ">
            <div className="flex items-center justify-center w-16 h-16 bg-[#00b0ef] rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-center mb-4 text-gray-900">{missionData.title}</h3>
            <p className="text-gray-600 leading-relaxed text-center">
              {missionData.content}
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-[#3b82f6]/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative  rounded-3xl p-8 lg:p-10   transition-all duration-500 ">
            <div className="flex items-center justify-center w-16 h-16 bg-[#00b0ef] rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-center mb-4 text-gray-900">{visionData.title}</h3>
            <p className="text-gray-600 leading-relaxed text-center">
              {visionData.content}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-[#3b82f6]/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative  rounded-3xl p-8 lg:p-10   transition-all duration-500 ">
            <div className="flex items-center justify-center w-16 h-16 bg-[#00b0ef] rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-center mb-4 text-gray-900">{valuesData.title}</h3>
            <p className="text-gray-600 leading-relaxed text-center mb-6">
              {valuesData.content}
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {values.slice(0, 4).map((value, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-50 rounded-lg p-3 group-hover:bg-gray-100 transition-colors">
                  <div className="w-6 h-6 bg-[#00b0ef] rounded-lg flex items-center justify-center">
                    <value.icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium text-sm text-gray-700">{value.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Centered Call to Action Button */}
      <div className="flex justify-center items-center mt-12">
        <button 
         onClick={handleOpen}
          className="inline-flex border-2 border-[#3b82f6] items-center space-x-2 bg-white text-black hover:bg-[#00b0ef]  px-8 py-4 rounded-xl font-semibold transition-all duration-300   text-lg"
        >
          <span>Read our full values</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )

  return (
    <section className="py-16 relative overflow-hidden">
      {activeView === 'modern' && <ModernView />}
      
      {/* Modal for values */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style}>
          <div className="relative">
            {/* Header with gradient background */}
            <div className="bg-[#00b0ef] p-4 sm:p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <Typography 
                  id="modal-modal-title" 
                  variant="h4" 
                  component="h2"
                  className="font-bold text-white mb-2 text-lg sm:text-xl md:text-2xl"
                  sx={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    animation: 'fadeInDown 0.6s ease-out'
                  }}
                >
                  Our Core Values
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  className="text-white/90 font-medium text-sm sm:text-base"
                  sx={{
                    animation: 'fadeInUp 0.6s ease-out 0.2s both'
                  }}
                >
                  The principles that guide our commitment to excellence
                </Typography>
              </div>
              
              {/* Decorative elements - hidden on small screens */}
              <div className="hidden sm:block absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="hidden sm:block absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            </div>

            {/* Content area */}
            <div className="p-4 sm:p-6 max-h-96 overflow-y-auto">
              <Typography 
                id="modal-modal-description" 
                sx={{ mt: 0 }}
                className="space-y-6"
              >
                {/* Values Grid */}
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  style={{
                    animation: 'fadeInUp 0.6s ease-out 0.4s both'
                  }}
                >
                  {values.map((value, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start space-x-3">
                        {/* <div className={`w-10 h-10 bg-gradient-to-r ${value.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <value.icon className="w-5 h-5 text-white" />
                        </div> */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{value.name}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Typography>
            </div>

            {/* Footer with close button */}
            <div 
              className="bg-gray-50 px-4 sm:px-6 py-4 border-t border-gray-200 flex justify-end"
              style={{
                animation: 'fadeInUp 0.6s ease-out 0.8s both'
              }}
            >
              <button
                onClick={handleClose}
                className="px-4 sm:px-6 py-2 bg-[#00b0ef] text-white rounded-lg hover:bg-[#00b0ef]/90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00b0ef]/50 text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </section>
  )
}

export default MissionVisionValues
