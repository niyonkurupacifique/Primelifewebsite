'use client';

import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { useRouter } from 'next/navigation'


import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
  maxWidth: 700,
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



interface TeamMember {
  id: number
  Name: string
  Position: string
  Bio: Array<{
    type: string
    children: Array<{
      type: string
      text: string
    }>
  }>
  Experience: string
  Education: string
  Achievements: string
  Facebook: string | null
  Twitter: string | null
  Instagram: string | null
  Linkedin: string | null
  Image: {
    url: string
    formats?: {
      thumbnail?: { url: string }
      small?: { url: string }
    }
  }
}

const ManagementTeam = () => {
  const [expandedMembers, setExpandedMembers] = useState<number[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router=useRouter()
  const [open, setOpen] = React.useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
  const handleOpen = (member: TeamMember) => {
    setSelectedMember(member);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedMember(null);
  };

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://primelife.prime.rw:8080/api/management-teams?populate=Image')
      
      if (!response.ok) {
        throw new Error('Failed to fetch team members')
      }
      
      const data = await response.json()
      console.log("data fetched is",data)
      
      // Sort team members by position hierarchy
      const sortedMembers = (data.data || []).sort((a: TeamMember, b: TeamMember) => {
        const positionHierarchy = {
          'Chief Executive Officer': 1,
          'Chief Finance Officer': 2,
          'Technical Director': 3,
          'Director of ICT and Innovation': 4,
          'Commercial Director': 5,
          'Legal Affairs & Company Secretary Manager': 6,
        }
        
        const getPositionRank = (position: string) => {
          const normalizedPosition = position.toLowerCase().trim()
          
          // Check for exact matches first
          for (const [key, rank] of Object.entries(positionHierarchy)) {
            if (normalizedPosition === key.toLowerCase()) {
              return rank
            }
          }
          
          // Check for partial matches
          if (normalizedPosition.includes('chief executive') || normalizedPosition.includes('ceo')) {
            return positionHierarchy['Chief Executive Officer']
          }
          if (normalizedPosition.includes('chief finance') || normalizedPosition.includes('cfo')) {
            return positionHierarchy['Chief Finance Officer']
          }
          if (normalizedPosition.includes('technical director')) {
            return positionHierarchy['Technical Director']
          }
          if (normalizedPosition.includes('ict') || normalizedPosition.includes('innovation')) {
            return positionHierarchy['Director of ICT and Innovation']
          }
          if (normalizedPosition.includes('commercial director')) {
            return positionHierarchy['Commercial Director']
          }
          if (normalizedPosition.includes('legal') || normalizedPosition.includes('secretary')) {
            return positionHierarchy['Legal Affairs & Company Secretary Manager']
          }
          
          // Default rank for other positions
          return 99
        }
        
        const rankA = getPositionRank(a.Position)
        const rankB = getPositionRank(b.Position)
        
        return rankA - rankB
      })
      
      setTeamMembers(sortedMembers)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching team members:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchTeamMembers()

    // Create socket connection with detailed logging
    console.log('🔌 Initializing Socket.IO connection...')
    const socket: Socket = io('https://primelife.prime.rw:8080', {
      transports: ['websocket', 'polling'],
      timeout: 5000,
      forceNew: true, // Force a new connection
    })

    // Connection event handlers
    socket.on('connect', () => {
      console.log('✅ Socket connected successfully:', socket.id)
    })

    socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error)
    })

    socket.on('disconnect', (reason) => {
      console.log('🔌 Socket disconnected:', reason)
    })

    // Listen for board member events with enhanced logging
    socket.on('Management_Team_created', (data) => {
      console.log('📥 Management_Team_created event received:', data)
      fetchTeamMembers() // Refetch all data
    })

    socket.on('Management_Team_updated', (data) => {
      console.log('📥 Management_Team_updated event received:', data)
      fetchTeamMembers() // Refetch all data
    })

    socket.on('Management_Team_deleted', (data) => {
      console.log('📥 Management_Team_deleted deleted event received:', data)
      fetchTeamMembers() // Refetch all data
    })

    // Listen for any events (debugging)
    socket.onAny((eventName, ...args) => {
      console.log('📡 Received event:', eventName, args)
    })

    // Test connection by sending a ping
    socket.on('connect', () => {
      socket.emit('ping', 'Hello from frontend!')
    })

    // Cleanup function
    return () => {
      console.log('🧹 Cleaning up socket connection')
      socket.off('connect')
      socket.off('connect_error')
      socket.off('disconnect')
      socket.off('Management_Team_created')
      socket.off('Management_Team_updated')
      socket.off('Management_Team_deleted')
      socket.offAny()
      socket.disconnect()
    }
  }, []) // Empty dependency array

  const toggleMember = (memberId: number) => {
    setExpandedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    )
  }

  // Helper function to extract text from Bio array
  const extractBioText = (bio: TeamMember['Bio']): string => {
    return bio
      .map(block => 
        block.children
          .map(child => child.text)
          .join(' ')
      )
      .join(' ')
      .trim()
  }

  // Helper function to get image URL
  const getImageUrl = (image: TeamMember['Image']): string => {
  if (!image) return ''

  // Always prefer the original
  if (image.url) {
    return `https://primelife.prime.rw:8080${image.url}`
  }

  // If for some reason original is missing, fallback
  if (image.formats?.small?.url) {
    return `https://primelife.prime.rw:8080${image.formats.small.url}`
  }
  if (image.formats?.thumbnail?.url) {
    return `https://primelife.prime.rw:8080${image.formats.thumbnail.url}`
  }

  return ''
}


  if (loading) {
    return (
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container relative">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading team members...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container relative">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
              <p className="font-bold">Error loading team members</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decorative shape */}
      <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden opacity-5">
        <img
          src="https://ext.same-assets.com/1717637306/800176389.png"
          alt="Team Shape"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <div className="text-center mb-16 text-xl">
              Prime Life Insurance Ltd is led by a skilled management team and board of directors whose combined experience and track record maintains the financial stability and innovative thinking that sets Prime apart from its competitors. Each individual is committed to establishing Prime as Rwanda’s prime insurer, focused on meeting the needs of individual and corporate customers across the country.
        </div>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary leading-tight max-w-3xl mx-auto">
            Meet the Prime Insurance team:
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary leading-tight max-w-3xl mx-auto">
            Management Team
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member) => (
            <div key={member.id} className="group">
              <div className="relative overflow-hidden rounded-lg ">
                {/* Blue curved background element */}
                <div className="absolute inset-0 bg-white from-white to-white rounded-lg">
                  {/* Curved wave-like shape */}
                  <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-white rounded-tl-[60%] rounded-tr-[40%] transform translate-y-1/2"></div>
                </div>
                
                {/* Team member image positioned to overlap with the curved background */}
                <div className="relative z-10 h-80 flex items-end justify-center">
                  <img
                    src={getImageUrl(member.Image)}
                    alt={member.Name}
                    className="w-48 h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ maxHeight: '70%' }}
                  />
                </div>

                                {/* Social Icons Overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <div className="flex space-x-4">
                    {member.Facebook && (
                      <a
                        href={member.Facebook}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors"
                      >
                        <Facebook className="w-5 h-5" />
                      </a>
                    )}
                    {member.Twitter && (
                      <a
                        href={member.Twitter}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {member.Instagram && (
                      <a
                        href={member.Instagram}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {member.Linkedin && (
                      <a
                        href={member.Linkedin}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center mt-6">
                <p className="text-brown font-medium uppercase tracking-wider text-sm mb-2">
                  {member.Position}
                </p>
                <h3 className="text-xl font-semibold text-primary group-hover:text-secondary transition-colors mb-4">
                  <a href="#" onClick={(e) => { e.preventDefault(); handleOpen(member); }}>{member.Name}</a>
                </h3>
                
                {/* More Button */}
                {/* <button
                  onClick={() => toggleMember(member.id)}
                  className="py-2.5 px-20 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  {expandedMembers.includes(member.id) ? 'Less' : 'More'}
                </button> */}
                
             
                <div onClick={() => handleOpen(member)}  className="py-2.5  px-20 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  <Button >More</Button>
                </div>

                {/* Expanded Information */}
                {expandedMembers.includes(member.id) && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left" data-aos="fade-up">
                    <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                      {extractBioText(member.Bio)}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="font-semibold text-primary w-20">Experience:</span>
                        <span className="text-gray-600">{member.Experience}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold text-primary w-20">Education:</span>
                        <span className="text-gray-600">{member.Education}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold text-primary w-20">Achievements:</span>
                        <span className="text-gray-600">{member.Achievements}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-primary text-white rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Contact Our Expert Team Member To Take Our Best Policies
            </h3>
            <p className="text-white/90 mb-6">
              Get in touch with our professional team to discuss your insurance needs and find the perfect policy for you.
            </p>
            <button onClick={()=>router.push('/contactus')}  className="btn-secondary cursor-pointer">
              Contact Our Team
            </button>
          </div>
        </div>
      </div>

      {/* Modal for expanded member details */}
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
          {selectedMember && (
            <div className="relative">
              {/* Header with gradient background */}
              <div className="bg-[#159fdb] p-4 sm:p-6 text-white relative overflow-hidden">
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
                    {selectedMember.Name}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    className="text-white/90 font-medium text-sm sm:text-base"
                    sx={{
                      animation: 'fadeInUp 0.6s ease-out 0.2s both'
                    }}
                  >
                    {selectedMember.Position}
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
                  {/* Bio Section */}
                  <div 
                    className="space-y-3"
                    style={{
                      animation: 'fadeInUp 0.6s ease-out 0.4s both'
                    }}
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-primary border-b-2 border-primary/20 pb-2">
                      Biography
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                      {extractBioText(selectedMember.Bio)}
                    </p>
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
                  className="px-4 sm:px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </section>
  )
}

export default ManagementTeam