'use client';

import React, { useState, useEffect } from 'react'
import { MapPin, Calendar, Eye, Search, Filter } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { io, Socket } from 'socket.io-client'

// Job type interface
interface Job {
  id: number
  title: string
  location: string
  department: string
  validityStart: string
  validityEnd: string
  status: string
  documentId: string
}

const AvailablePositions: React.FC = () => {
  const [jobsData, setJobsData] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filterDepartment, setFilterDepartment] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)

  const router = useRouter()

  // Fetch jobs function
  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://primelife.prime.rw:8080/api/job-managements')
      if (!response.ok) {
        throw new Error('Failed to fetch job data')
      }

      const data = await response.json()

      const formattedJobs: Job[] = data.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        documentId: item.documentId,
        location: item.location,
        department: item.department,
        validityStart: item.validityStart,
        validityEnd: item.validityEnd,
        status: item.JobStatus?.toLowerCase() || 'closed',
      }))

      setJobsData(formattedJobs)
      setError(null)
    } catch (err) {
      setError((err as Error).message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchJobs()

    // Create socket connection with detailed logging
    //console.log('🔌 Initializing Socket.IO connection for Available Positions...')
    const newSocket: Socket = io('https://primelife.prime.rw:8080', {
      transports: ['websocket', 'polling'],
      timeout: 5000,
      forceNew: true, // Force a new connection
    })

    // Connection event handlers
    newSocket.on('connect', () => {
      //console.log('✅ Available Positions Socket connected successfully:', newSocket.id)
    })

    newSocket.on('connect_error', (error) => {
      console.error('❌ Available Positions Socket connection error:', error)
    })

    newSocket.on('disconnect', (reason) => {
      //console.log('🔌 Available Positions Socket disconnected:', reason)
    })

    // Listen for job management events with enhanced logging
    newSocket.on('Job_created', (data) => {
      //console.log('📥 Job_created event received:', data)
      // Refetch all jobs to get the latest data
      //console.log('🔄 Refreshing jobs data due to creation event')
      fetchJobs()
    })

    newSocket.on('Job_updated', (data) => {
      //console.log('📥 Job_updated event received:', data)
      // Refetch all jobs to get the updated data
      //console.log('🔄 Refreshing jobs data due to update event')
      fetchJobs()
    })

    newSocket.on('Job_deleted', (data) => {
      //console.log('📥 Job_deleted event received:', data)
      // Refetch all jobs to get the current data
      //console.log('🔄 Refreshing jobs data due to deletion event')
      fetchJobs()
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
      //console.log('📡 Available Positions received event:', eventName, args)
    })

    // Test connection by sending a ping
    newSocket.on('connect', () => {
      newSocket.emit('ping', 'Hello from Available Positions frontend!')
    })

    // Set socket in state
    setSocket(newSocket)

    // Cleanup function
    return () => {
      //console.log('🧹 Cleaning up Available Positions socket connection')
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
  }, []) // Empty dependency array

  const departments = Array.from(new Set(jobsData.map((job) => job.department)))

  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = filterDepartment === 'all' || job.department === filterDepartment
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const handleViewDetails = (documentId: string) => {
    router.push(`/careers/${documentId}`)
    window.scrollTo(0, 0)
  }

  const getStatusBadge = (status: string) => {
    if (status === 'open') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Open
        </span>
      )
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Closed
        </span>
      )
    }
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading jobs...</div>
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Filters */}
        <div className=" rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {jobsData.length} positions
          </p>
        </div>

        {/* Job Table */}
        <div className=" rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-1">{job.title}</div>
                        <div className="text-sm text-gray-500">{job.department}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        {job.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center mb-1">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          {job.validityStart}
                        </div>
                        <div className="text-xs text-gray-500">to {job.validityEnd}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(job.status)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewDetails(job.documentId)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        See details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                No positions found matching your search criteria.
              </div>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilterDepartment('all')
                  setFilterStatus('all')
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

       
      </div>
    </div>
  )
}

export default AvailablePositions