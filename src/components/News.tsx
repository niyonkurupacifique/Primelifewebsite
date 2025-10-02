'use client';

import { Calendar, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { fetchNews, getRecentNews, formatDate } from '../services/newsApi'
import type { NewsArticle } from '../types/news'
import { io, Socket } from 'socket.io-client'

const News = () => {
  const router = useRouter()
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)

  // API call function directly in component
  const fetchNewsData = async (): Promise<NewsArticle[]> => {
    try {
      console.log("🔄 Starting to fetch news...")
      const response = await fetchNews()
      console.log("📰 Raw API response:", response)
      console.log("📊 Response data length:", response.data?.length || 0)
      
      if (!response.data || response.data.length === 0) {
        console.log("⚠️ No news data found in response")
        return []
      }
      
      // For now, show all articles without date filtering (since articles are from future dates)
      const allNews = response.data
      console.log("📅 All news articles:", allNews.length)
      
      const finalNews = allNews.slice(0, 3) // Show only 3 most recent articles
      console.log("✅ Final news to display:", finalNews.length)
      
      return finalNews
    } catch (error) {
      console.error('❌ Error fetching news:', error)
      throw error // Re-throw to trigger error state
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
      console.log('✅ Connected to Socket.IO server for News')
    })

    newSocket.on('connect_error', (error) => {
      console.error('❌ Socket.IO connection error for News:', error)
    })

    // Listen for real-time updates
    newSocket.on('News_Management_created', (data) => {
      console.log('🆕 New news article created:', data)
      // Refresh news to get the latest data
      fetchNewsData().then(newNews => {
        setNewsArticles(newNews)
        // Show notification or update UI as needed
        console.log("all newsss",newNews)
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
        console.log("🚀 Loading news component...")
        setLoading(true)
        setError(null)
        const data = await fetchNewsData()
        console.log("📋 Setting news articles:", data)
        setNewsArticles(data)
      } catch (err) {
        console.error('💥 Error in loadNews:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch news')
      } finally {
        setLoading(false)
        console.log("🏁 Loading finished")
      }
    }

    loadNews()
  }, [])

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 sm:mb-4">
              News & Insights
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Stay updated with the latest news, product updates, and helpful tips from Prime Life Insurance Rwanda.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-gray-600">Loading news...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 sm:mb-4">
              News & Insights
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Stay updated with the latest news, product updates, and helpful tips from Prime Life Insurance Rwanda.
            </p>
          </div>
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
      </section>
    )
  }

  // Debug logging
  console.log("🔍 Current state:", { loading, error, newsArticles: newsArticles.length })

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 sm:mb-4">
            News & Insights
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Stay updated with the latest news, product updates, and helpful tips from Prime Life Insurance Rwanda.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {newsArticles.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No recent news articles found.</p>
              <p className="text-gray-400 text-sm mt-2">Check back later for updates.</p>
            </div>
          ) : (
            newsArticles.map((article) => (
            <article key={article.id} className=" rounded-lg overflow-hidden shadow-md  hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              {/* Article Image */}
              <div className="relative overflow-hidden">
                <img
                 src={`${ 'http://10.10.1.17:1338'}${article.MainPicture.url}`}
                  alt={article.MainPicture.alternativeText || article.Title}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            ))
          )}
        </div>

        {/* Call to Action Button */}
        <div className="flex justify-center items-center mt-8 sm:mt-10 md:mt-12">
          <button 
            onClick={() => router.push('/allnews')}
            className="btn-responsive bg-primary hover:bg-primary/90 text-white"
          >
            View All Articles
          </button>
        </div>
      </div>
    </section>
  )
}

export default News
