'use client';

import React, { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

interface FileData {
  id: number
  documentId: string
  name: string
  url: string
  mime: string
  size: number
}

interface ConsumerProtectionData {
  id: number
  documentId: string
  Quarter: string
  Year: string
  File: FileData
}

interface ApiResponse {
  data: ConsumerProtectionData[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

const ConsumerProtectionMainPage: React.FC = () => {
  const [customerCharterFiles, setCustomerCharterFiles] = useState<ConsumerProtectionData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)

  // Fetch consumer protection reports from Strapi API
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://primelife.prime.rw:8080/api/consumer-protection-report-managements?populate=File')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: ApiResponse = await response.json()
      
      // Sort by year (largest first), then by quarter (largest first)
      const sortedData = data.data.sort((a, b) => {
        const yearA = new Date(a.Year).getFullYear()
        const yearB = new Date(b.Year).getFullYear()
        
        // Sort by year first (descending - largest first)
        if (yearA !== yearB) {
          return yearB - yearA
        }
        
        // If years are the same, sort by quarter (descending)
        const quarterA = parseInt(a.Quarter.replace('Q', ''))
        const quarterB = parseInt(b.Quarter.replace('Q', ''))
        return quarterB - quarterA
      })
      
      setCustomerCharterFiles(sortedData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchData()

    // Create socket connection with detailed logging
    console.log('🔌 Initializing Socket.IO connection for Consumer Protection Reports...')
    const newSocket: Socket = io('https://primelife.prime.rw:8080', {
      transports: ['websocket', 'polling'],
      timeout: 5000,
      forceNew: true, // Force a new connection
    })

    // Connection event handlers
    newSocket.on('connect', () => {
      console.log('✅ Consumer Protection Reports Socket connected successfully:', newSocket.id)
    })

    newSocket.on('connect_error', (error) => {
      console.error('❌ Consumer Protection Reports Socket connection error:', error)
    })

    newSocket.on('disconnect', (reason) => {
      console.log('🔌 Consumer Protection Reports Socket disconnected:', reason)
    })

    // Listen for consumer protection report events with enhanced logging
    newSocket.on('Consumer_Protection_Report_created', (data) => {
      console.log('📥 Consumer_Protection_Report_created event received:', data)
      // Refetch all data to get the latest reports
      fetchData()
    })

    newSocket.on('Consumer_Protection_Report_updated', (data) => {
      console.log('📥 Consumer_Protection_Report_updated event received:', data)
      // Refetch all data to get the updated reports
      fetchData()
    })

    newSocket.on('Consumer_Protection_Report_deleted', (data) => {
      console.log('📥 Consumer_Protection_Report_deleted event received:', data)
      // Refetch all data to get the current reports
      fetchData()
    })

    // Listen for custom consumer protection events
    newSocket.on('Consumer_Protection_Reports_queried', (data) => {
      console.log('📥 Consumer_Protection_Reports_queried event received:', data)
    })

    newSocket.on('Consumer_Protection_Reports_searched', (data) => {
      console.log('📥 Consumer_Protection_Reports_searched event received:', data)
    })

    newSocket.on('Consumer_Protection_Reports_stats_updated', (data) => {
      console.log('📥 Consumer_Protection_Reports_stats_updated event received:', data)
    })

    newSocket.on('Consumer_Protection_broadcast', (data) => {
      console.log('📥 Consumer_Protection_broadcast event received:', data)
      // You can add a toast notification here if you want
    })

    // Listen for any events (debugging)
    newSocket.onAny((eventName, ...args) => {
      console.log('📡 Consumer Protection Reports received event:', eventName, args)
    })

    // Test connection by sending a ping
    newSocket.on('connect', () => {
      newSocket.emit('ping', 'Hello from Consumer Protection Reports frontend!')
    })

    // Set socket in state
    setSocket(newSocket)

    // Cleanup function
    return () => {
      console.log('🧹 Cleaning up Consumer Protection Reports socket connection')
      if (newSocket) {
        newSocket.off('connect')
        newSocket.off('connect_error')
        newSocket.off('disconnect')
        newSocket.off('Consumer_Protection_Report_created')
        newSocket.off('Consumer_Protection_Report_updated')
        newSocket.off('Consumer_Protection_Report_deleted')
        newSocket.off('Consumer_Protection_Reports_queried')
        newSocket.off('Consumer_Protection_Reports_searched')
        newSocket.off('Consumer_Protection_Reports_stats_updated')
        newSocket.off('Consumer_Protection_broadcast')
        newSocket.offAny()
        newSocket.disconnect()
      }
    }
  }, []) // Empty dependency array

  const handleView = (url: string) => {
    const fullUrl = `https://primelife.prime.rw:8080${url}`
    window.open(fullUrl, '_blank')
  }

  const handleDownload = (url: string, filename: string) => {
    const fullUrl = `https://primelife.prime.rw:8080${url}`
    const link = document.createElement('a')
    link.href = fullUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatYear = (yearString: string) => {
    return new Date(yearString).getFullYear().toString()
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading consumer protection reports...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-600">Error loading data: {error}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Download our consumer protection reports by quarter and year. These documents outline our commitment to providing excellent service and maintaining the highest standards of customer care.
          </p>
        </div>

        <div className="bg-white rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Quarter
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customerCharterFiles.length > 0 ? (
                  customerCharterFiles.map((file, index) => (
                    <tr key={file.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {file.File.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {file.Quarter}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {formatYear(file.Year)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => handleView(file.File.url)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 cursor-pointer"
                          >
                            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </button>
                          <button
                            onClick={() => handleDownload(file.File.url, file.File.name)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 cursor-pointer"
                          >
                            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      No consumer protection reports available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            For any questions about our consumer protection reports, please contact our customer service team.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ConsumerProtectionMainPage