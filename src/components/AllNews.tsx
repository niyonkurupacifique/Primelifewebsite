'use client';

import { Calendar, ArrowRight, Search, Filter } from 'lucide-react'
import { useState, useEffect } from 'react'

import Header from './Header'
import Footer from './Footer'
import HeroNews from './HeroNews'
import { fetchNews, getRecentNews, formatDate } from '../services/newsApi'
import type { NewsArticle } from '../types/news'
import { io, Socket } from 'socket.io-client'
import { useRouter } from 'next/navigation'

const AllNews = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)

  // API call function directly in component
  const fetchNewsData = async (): Promise<NewsArticle[]> => {
    try {
      const response = await fetchNews()
      return response.data
    } catch (error) {
      console.error('Error fetching news:', error)
      return []
    }
  }

  // Socket.IO setup and event listeners
  useEffect(() => {
    // Initialize Socket.IO connection
    const newSocket = io('http://10.10.1.17:1338', {
      transports: ['websocket', 'polling'],
      timeout: 20000,
    })

    newSocket.on('connect', () => {
      console.log('✅ Connected to Socket.IO server for AllNews')
    })

    newSocket.on('connect_error', (error) => {
      console.error('❌ Socket.IO connection error for AllNews:', error)
    })

    // Listen for real-time updates
    newSocket.on('News_Management_created', (data) => {
      console.log('🆕 New news article created:', data)
      // Refresh news to get the latest data
      fetchNewsData().then(newNews => {
        setNewsArticles(newNews)
        // Show notification or update UI as needed
      })
    })

    newSocket.on('News_Management_updated', (data) => {
      console.log('🔄 News article updated:', data)
      // Refresh news to get the latest data
      fetchNewsData().then(newNews => {
        setNewsArticles(newNews)
        // Show notification or update UI as needed
      })
    })

    newSocket.on('News_Management_deleted', (data) => {
      console.log('🗑️ News article deleted:', data)
      // Refresh news to get the latest data
      fetchNewsData().then(newNews => {
        setNewsArticles(newNews)
        // Show notification or update UI as needed
      })
    })

    setSocket(newSocket)

    // Cleanup function
    return () => {
      if (newSocket) {
        newSocket.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchNewsData()
        setNewsArticles(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news')
        console.error('Error loading news:', err)
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  // Get unique categories for filter
  const categories = ['All', 'Recent', 'Older']

  // Filter articles based on search and category
  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch = 
      article.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.SubTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.MainContent.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedCategory === 'All') {
      return matchesSearch
    } else if (selectedCategory === 'Recent') {
      const isRecent = getRecentNews([article], 7).length > 0
      return matchesSearch && isRecent
    } else if (selectedCategory === 'Older') {
      const isRecent = getRecentNews([article], 7).length > 0
      return matchesSearch && !isRecent
    }

    return matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <HeroNews />
        <main className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-gray-600">Loading news...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <HeroNews />
        <main className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-red-600 mb-4">Error loading news: {error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="btn-responsive bg-primary hover:bg-primary/90 text-white"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <HeroNews />
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

            
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-sm text-gray-600">
            Showing {filteredArticles.length} of {newsArticles.length} articles
          </div>

          {/* News Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredArticles.map((article) => (
                <article key={article.id} className=" rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                  {/* Article Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={`http://10.10.1.17:1338${article.MainPicture.url}`}
                      alt={article.MainPicture.alternativeText || article.Title}
                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary text-white px-2 py-1 rounded text-xs font-medium uppercase tracking-wider">
                        {getRecentNews([article], 7).length > 0 ? 'Recent' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {article.Title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
                      {article.SubTitle}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <button
                      onClick={() => router.push(`/news/${article.documentId}`)}
                      className="inline-flex items-center space-x-2 text-primary hover:text-secondary font-medium transition-colors duration-300 group-hover:translate-x-1"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No news articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                className="mt-4 text-primary hover:text-secondary underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AllNews
