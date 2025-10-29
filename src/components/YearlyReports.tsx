'use client';

import React, { useState, useEffect } from 'react';
import { Download, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import Header from './Header';
import Footer from './Footer';
import HeroYearlyReports from './HeroYearlyReports';

interface StrapiFile {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiYearlyReport {
  id: number;
  documentId: string;
  Title?: string;
  Year: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  File: StrapiFile;
}

interface YearlyReport {
  id: number;
  title: string;
  date: string;
  year: string;
  downloadUrl: string;
}

const YearlyReports: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [yearlyReports, setYearlyReports] = useState<YearlyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const reportsPerPage = 6;

  // Fetch yearly reports from Strapi API
  const fetchYearlyReports = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://primelife.prime.rw:8080/api/yearly-report-managements?populate=File');
      
      if (!response.ok) {
        throw new Error('Failed to fetch yearly reports');
      }
      
      const data = await response.json();
      
      // Transform Strapi data to our component format
      const transformedReports: YearlyReport[] = data.data.map((item: StrapiYearlyReport) => {
        const year = new Date(item.Year).getFullYear().toString();
        
        return {
          id: item.id,
          title: item.Title || item.File.name.replace('.pdf', '').replace(/_/g, ' '),
          date: year,
          year: year,
          downloadUrl: `https://primelife.prime.rw:8080${item.File.url}`
        };
      });
      
      // Sort by year (newest first)
      transformedReports.sort((a, b) => parseInt(b.year) - parseInt(a.year));
      
      setYearlyReports(transformedReports);
      setError(null);
    } catch (err) {
      console.error('Error fetching yearly reports:', err);
      setError('Failed to load yearly reports. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchYearlyReports();

    // Create socket connection with detailed logging
    console.log('🔌 Initializing Socket.IO connection for Yearly Reports...');
    const newSocket: Socket = io('https://primelife.prime.rw:8080', {
      transports: ['websocket', 'polling'],
      timeout: 5000,
      forceNew: true, // Force a new connection
    });

    // Connection event handlers
    newSocket.on('connect', () => {
      console.log('✅ Yearly Reports Socket connected successfully:', newSocket.id);
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Yearly Reports Socket connection error:', error);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('🔌 Yearly Reports Socket disconnected:', reason);
    });

    // Listen for yearly report events with enhanced logging
    newSocket.on('Yearly_Report_created', (data) => {
      console.log('📥 Yearly_Report_created event received:', data);
      // Refetch all data to get the latest reports
      fetchYearlyReports();
    });

    newSocket.on('Yearly_Report_updated', (data) => {
      console.log('📥 Yearly_Report_updated event received:', data);
      // Refetch all data to get the updated reports
      fetchYearlyReports();
    });

    newSocket.on('Yearly_Report_deleted', (data) => {
      console.log('📥 Yearly_Report_deleted event received:', data);
      // Refetch all data to get the current reports
      fetchYearlyReports();
    });

    // Listen for custom yearly reports events
    newSocket.on('Yearly_Reports_queried', (data) => {
      console.log('📥 Yearly_Reports_queried event received:', data);
    });

    newSocket.on('Yearly_Reports_searched', (data) => {
      console.log('📥 Yearly_Reports_searched event received:', data);
    });

    newSocket.on('Yearly_Reports_stats_updated', (data) => {
      console.log('📥 Yearly_Reports_stats_updated event received:', data);
    });

    newSocket.on('Yearly_Reports_broadcast', (data) => {
      console.log('📥 Yearly_Reports_broadcast event received:', data);
      // You can add a toast notification here if you want
    });

    // Listen for any events (debugging)
    newSocket.onAny((eventName, ...args) => {
      console.log('📡 Yearly Reports received event:', eventName, args);
    });

    // Test connection by sending a ping
    newSocket.on('connect', () => {
      newSocket.emit('ping', 'Hello from Yearly Reports frontend!');
    });

    // Set socket in state
    setSocket(newSocket);

    // Cleanup function
    return () => {
      console.log('🧹 Cleaning up Yearly Reports socket connection');
      if (newSocket) {
        newSocket.off('connect');
        newSocket.off('connect_error');
        newSocket.off('disconnect');
        newSocket.off('Yearly_Report_created');
        newSocket.off('Yearly_Report_updated');
        newSocket.off('Yearly_Report_deleted');
        newSocket.off('Yearly_Reports_queried');
        newSocket.off('Yearly_Reports_searched');
        newSocket.off('Yearly_Reports_stats_updated');
        newSocket.off('Yearly_Reports_broadcast');
        newSocket.offAny();
        newSocket.disconnect();
      }
    };
  }, []); // Empty dependency array

  // Calculate pagination
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = yearlyReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(yearlyReports.length / reportsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDownload = (report: YearlyReport) => {
    // Open the PDF file in a new tab for download
    window.open(report.downloadUrl, '_blank');
  };

  // Reset to first page when reports change
  useEffect(() => {
    setCurrentPage(1);
  }, [yearlyReports.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header></Header>
      {/* Hero Section */}
      <HeroYearlyReports></HeroYearlyReports>

      {/* Reports Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
           
            
            {/* Loading and Error States */}
            {loading && (
              <div className="text-center py-12">
                <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                  Loading yearly reports...
                </div>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-md">
                  {error}
                </div>
              </div>
            )}

            {/* Reports Table */}
            {!loading && !error && yearlyReports.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold text-lg">
                          Title
                        </th>
                        <th className="px-6 py-4 text-center font-semibold text-lg">
                          Date
                        </th>
                        <th className="px-6 py-4 text-center font-semibold text-lg">
                          Download
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentReports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                <FileText className="h-8 w-8 text-red-500" />
                              </div>
                              <div>
                                <p className="text-gray-900 font-medium text-sm leading-tight">
                                  {report.title}
                                </p>
                                <p className="text-gray-500 text-xs mt-1">
                                   {report.year}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              {report.date}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleDownload(report)}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* No Reports Message */}
            {!loading && !error && yearlyReports.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500">
                  No yearly reports available at the moment.
                </div>
              </div>
            )}

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-primary text-white'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            )}

          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default YearlyReports;
