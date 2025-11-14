'use client';

import React, { useEffect, useState, type JSX } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, MapPin, Calendar, Clock, Users, Mail, FileText, CheckCircle, AlertCircle, Building, Award, Target } from 'lucide-react'
import { io, Socket } from 'socket.io-client'
import Header from './Header'
import Footer from './Footer'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Type definitions for new API response
interface JobSummary {
  id: number;
  Label: string;
  Value: string;
}

interface APIJobData {
  id: number;
  documentId: string;
  title: string;
  location: string;
  department: string;
  validityStart: string;
  validityEnd: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  JobStatus: string;
  CompanyProfile: string;
  RequirementsAndSkills: string[];
  ApplicationProcedure: string;
  JobSummary: JobSummary[];
}

interface APIResponse {
  data: APIJobData[];
  meta: Record<string, any>;
}

// Type definitions for transformed job data
interface TransformedJob {
  id: number;
  documentId: string;
  title: string;
  location: string;
  department: string;
  validityStart: string;
  validityEnd: string;
  status: string;
  companyProfile: string;
  requirementsAndSkills: string[];
  applicationProcedure: string;
  jobSummary: JobSummary[];
}

const JobDetailsPage: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>()
  const router = useRouter()
  const [job, setJob] = useState<TransformedJob | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out'
    })
  }, [])

  // Fetch job data function
  const fetchJobData = async (): Promise<void> => {
    if (!documentId) {
      setError('No document ID provided')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`https://primelife.prime.rw:8080/api/job-managements?populate=*`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result: APIResponse = await response.json()
      
      // Find the specific job by documentId
      const jobData = result.data.find(job => job.documentId === documentId)
      
      if (!jobData) {
        throw new Error('Job not found')
      }
      
      // Transform API data to match component expectations
      const transformedJob: TransformedJob = {
        id: jobData.id,
        documentId: jobData.documentId,
        title: jobData.title,
        location: jobData.location,
        department: jobData.department,
        validityStart: jobData.validityStart,
        validityEnd: jobData.validityEnd,
        status: jobData.JobStatus?.toLowerCase() || 'closed',
        companyProfile: jobData.CompanyProfile || 'Company profile not available',
        requirementsAndSkills: jobData.RequirementsAndSkills || [],
        applicationProcedure: jobData.ApplicationProcedure || 'Application procedure not specified',
        jobSummary: jobData.JobSummary || []
      }
      
      setJob(transformedJob)
      setError(null)
    } catch (err) {
      //console.error('Error fetching job data:', err)
      setError('Failed to load job details. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchJobData()

    // Create socket connection with detailed logging
    //console.log('🔌 Initializing Socket.IO connection for Job Management...')
    const newSocket: Socket = io('https://primelife.prime.rw:8080', {
      transports: ['websocket', 'polling'],
      timeout: 5000,
      forceNew: true, // Force a new connection
    })

    // Connection event handlers
    newSocket.on('connect', () => {
      //console.log('✅ Job Management Socket connected successfully:', newSocket.id)
    })

    newSocket.on('connect_error', (error) => {
      console.error('❌ Job Management Socket connection error:', error)
    })

    newSocket.on('disconnect', (reason) => {
      //console.log('🔌 Job Management Socket disconnected:', reason)
    })

    // Listen for job management events with enhanced logging
    newSocket.on('Job_created', (data) => {
      //console.log('📥 Job_created event received:', data)
      // If this is the job we're currently viewing, refresh the data
      if (data.data && data.data.documentId === documentId) {
        //console.log('🔄 Refreshing job data due to creation event')
        fetchJobData()
      }
    })

    newSocket.on('Job_updated', (data) => {
      //console.log('📥 Job_updated event received:', data)
      // If this is the job we're currently viewing, refresh the data
      if (data.data && data.data.documentId === documentId) {
        //console.log('🔄 Refreshing job data due to update event')
        fetchJobData()
      }
    })

    newSocket.on('Job_deleted', (data) => {
      //console.log('📥 Job_deleted event received:', data)
      // If this is the job we're currently viewing, show error
      if (data.data && data.data.documentId === documentId) {
        //console.log('🗑️ Current job was deleted')
        setError('This job position has been removed and is no longer available.')
        setJob(null)
      }
    })

    // Listen for custom job management events
    newSocket.on('Job_Management_queried', (data) => {
      //console.log('📥 Job_Management_queried event received:', data)
    })

    newSocket.on('Job_Management_searched', (data) => {
      //console.log('📥 Job_Management_searched event received:', data)
    })

    newSocket.on('Job_Management_stats_updated', (data) => {
      //console.log('📥 Job_Management_stats_updated event received:', data)
    })

    newSocket.on('Job_Management_broadcast', (data) => {
      //console.log('📥 Job_Management_broadcast event received:', data)
      // You can add a toast notification here if you want
    })

    // Listen for any events (debugging)
    newSocket.onAny((eventName, ...args) => {
      //console.log('📡 Job Management received event:', eventName, args)
    })

    // Test connection by sending a ping
    newSocket.on('connect', () => {
      newSocket.emit('ping', 'Hello from Job Management frontend!')
    })

    // Set socket in state
    setSocket(newSocket)

    // Cleanup function
    return () => {
      //console.log('🧹 Cleaning up Job Management socket connection')
      if (newSocket) {
        newSocket.off('connect')
        newSocket.off('connect_error')
        newSocket.off('disconnect')
        newSocket.off('Job_created')
        newSocket.off('Job_updated')
        newSocket.off('Job_deleted')
        newSocket.off('Job_Management_queried')
        newSocket.off('Job_Management_searched')
        newSocket.off('Job_Management_stats_updated')
        newSocket.off('Job_Management_broadcast')
        newSocket.offAny()
        newSocket.disconnect()
      }
    }
  }, [documentId]) // Add documentId as dependency

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-900">Loading job details...</h1>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error ? 'Error Loading Job' : 'Job Not Found'}
          </h1>
          <p className="text-gray-600 mb-8">
            {error || "The job position you're looking for doesn't exist or has been removed."}
          </p>
          <button
            onClick={() => router.push('/careers')}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Careers
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const getStatusBadge = (status: string): JSX.Element => {
    if (status === 'open') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-4 w-4 mr-1" />
          Open for Applications
        </span>
      )
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
          <Clock className="h-4 w-4 mr-1" />
          Application Closed
        </span>
      )
    }
  }

  // Extract email from application procedure text
  const extractEmail = (text: string): string => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    const emails = text.match(emailRegex)
    return emails ? emails[0] : 'info@prime.rw'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6" data-aos="fade-right">
          <button
            onClick={() => router.push('/careers')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Available Positions
          </button>
        </div>

        {/* Job Header */}
        <div className=" rounded-lg  shadow-md p-8 mb-8" data-aos="fade-up">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {job.department}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {job.validityStart} - {job.validityEnd}
                </div>
              </div>
              {getStatusBadge(job.status)}
            </div>
          </div>
        </div>

        {/* Company Profile */}
        <div className=" rounded-lg shadow-md p-8 mb-8" data-aos="fade-up">
          <div className="flex items-center mb-4">
            <Building className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Company Profile</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">{job.companyProfile}</p>
        </div>

        {/* Requirements and Skills */}
        <div className=" rounded-lg shadow-md p-8 mb-8" data-aos="fade-up">
          <div className="flex items-center mb-6">
            <Award className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Requirements and Skills</h2>
          </div>
          <ul className="space-y-3">
            {job.requirementsAndSkills.map((requirement: string, index: number) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{requirement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Job Summary */}
        {job.jobSummary.length > 0 && (
          <div className=" rounded-lg shadow-md p-8 mb-8" data-aos="fade-up">
            <div className="flex items-center mb-6">
              <Target className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Job Summary</h2>
            </div>
            <div className="space-y-3">
              {job.jobSummary.map((summary: JobSummary) => (
                <div key={summary.id} className="flex items-start">
                  <span className="font-bold text-gray-900 mr-2">{summary.Label}:</span>
                  <span className="text-gray-900">{summary.Value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Application Procedure */}
        <div className=" rounded-lg shadow-md p-8 mb-8" data-aos="fade-up">
          <div className="flex items-center mb-6">
            <FileText className="h-6 w-6 text-orange-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Application Procedure</h2>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-gray-700 leading-relaxed">{job.applicationProcedure}</p>
            </div>
            
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <span className="font-medium text-gray-900">Email:</span>
                <br />
                <a href={`mailto:${extractEmail(job.applicationProcedure)}`} className="text-blue-600 hover:text-blue-800">
                  {extractEmail(job.applicationProcedure)}
                </a>
              </div>
            </div>
          </div>
        </div>

       

        {job.status === 'closed' && (
          <div className="bg-gray-100 rounded-lg shadow-lg p-8 text-center" data-aos="fade-up">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Closed</h2>
            {/* <p className="text-gray-600 mb-6">
              The application deadline for this position has passed. Check back for similar opportunities.
            </p> */}
            <button
              onClick={() => router.push('/careers')}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              View Other Positions
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default JobDetailsPage