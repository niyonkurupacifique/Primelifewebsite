'use client';

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Calendar, ArrowLeft, Share2 } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import { fetchNewsById, fetchNews } from '../services/newsApi'
import type { NewsArticle } from '../types/news'
import { io, Socket } from 'socket.io-client'

const NewsDetail = () => {
  const { documentId } = useParams<{ documentId: string }>()

  console.log("document id is",documentId)
  const router = useRouter()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [recentNews, setRecentNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)

  // API call functions directly in component
  const fetchArticleData = async (): Promise<NewsArticle | null> => {
    if (!documentId) return null
    
    try {
      const response = await fetchNewsById(documentId)
      console.log("response",response)
      if (response.data) {
        return response.data
      } else {
        return null
      }
    } catch (error) {
      console.error('Error fetching article:', error)
      return null
    }
  }

  const fetchRecentNewsData = async (): Promise<NewsArticle[]> => {
    try {
      const response = await fetchNews()
      if (response.data && Array.isArray(response.data)) {
        // Get 3 most recent news articles, excluding the current one
        const filteredNews = response.data
          // .filter(news => news.documentId !== documentId)
          .filter(news => news.documentId)
          .slice(0, 3)
        return filteredNews
      }
      return []
    } catch (error) {
      console.error('Error fetching recent news:', error)
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
      console.log('✅ Connected to Socket.IO server for NewsDetail')
    })

    newSocket.on('connect_error', (error) => {
      console.error('❌ Socket.IO connection error for NewsDetail:', error)
    })

    // Listen for real-time updates
    newSocket.on('News_Management_created', (data) => {
      console.log('🆕 New news article created:', data)
      // Refresh recent news to get the latest data
      fetchRecentNewsData().then(newRecentNews => {
        setRecentNews(newRecentNews)
      })
    })

    newSocket.on('News_Management_updated', (data) => {
      console.log('🔄 News article updated:', data)
      // If the current article was updated, refresh it
      if (data.data && data.data.documentId === documentId) {
        fetchArticleData().then(updatedArticle => {
          if (updatedArticle) {
            setArticle(updatedArticle)
          }
        })
      }
      // Also refresh recent news
      fetchRecentNewsData().then(newRecentNews => {
        setRecentNews(newRecentNews)
      })
    })

    newSocket.on('News_Management_deleted', (data) => {
      console.log('🗑️ News article deleted:', data)
      // If the current article was deleted, show error
      if (data.data && data.data.documentId === documentId) {
        setError('This article has been deleted')
        setArticle(null)
      }
      // Refresh recent news
      fetchRecentNewsData().then(newRecentNews => {
        setRecentNews(newRecentNews)
      })
    })

    setSocket(newSocket)

    // Cleanup function
    return () => {
      if (newSocket) {
        newSocket.disconnect()
      }
    }
  }, [documentId])

  useEffect(() => {
    const loadArticle = async () => {
      if (!documentId) return
      
      try {
        setLoading(true)
        setError(null)
        const articleData = await fetchArticleData()
        if (articleData) {
          setArticle(articleData)
        } else {
          setError('Article not found')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch article')
        console.error('Error loading article:', err)
      } finally {
        setLoading(false)
      }
    }

    const loadRecentNews = async () => {
      try {
        const recentNewsData = await fetchRecentNewsData()
        setRecentNews(recentNewsData)
      } catch (err) {
        console.error('Error loading recent news:', err)
      }
    }

    loadArticle()
    loadRecentNews()
  }, [documentId])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isRecent = (dateString: string) => {
    const articleDate = new Date(dateString)
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    return articleDate >= oneWeekAgo
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading article...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="text-red-500 mb-4">
                <p className="text-lg font-semibold">Error loading article</p>
                <p className="text-sm">{error || 'Article not found'}</p>
              </div>
              <button
                onClick={() => router.push('/allnews')}
                className="btn-responsive bg-primary hover:bg-primary/90 text-white"
              >
                Back to News
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
      <main>
        {/* Article Header */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <button
              onClick={() => router.push('/allnews')}
              className="inline-flex items-center space-x-2 text-primary hover:text-secondary mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to News</span>
            </button>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="bg-primary text-white px-3 py-1 rounded text-sm font-medium uppercase tracking-wider">
                {isRecent(article.publishedAt) ? 'Recent' : ''}
              </span>
            </div>

            {/* Article Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight">
              {article.Title}
            </h1>

            {/* Article Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-4xl">
              {article.SubTitle}
            </p>

            {/* Meta Information */}
            <div className="flex items-center space-x-4 text-gray-500">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <button className="flex items-center space-x-2 hover:text-primary transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </section>

        {/* Main Article Content with Sidebar */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Main Image */}
                <div className="mb-8">
                  <img
                    src={`${'http://10.10.1.17:1338'}${article.MainPicture.url}`}
                    alt={article.Title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg"
                  />
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none mb-8">
                  {article.MainContent.split('\n').map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Additional Images - Full Size with Bold Content */}
                {article.Picture1 && (
                  <div className="mb-8">
                    <img
                      src={`${'http://10.10.1.17:1338'}${article.Picture1.url}`}
                      alt={article.Picture1Contents}
                      className="w-full h-64 md:h-96 object-cover rounded-lg mb-4"
                    />
                    <p className="text-lg font-bold text-gray-800 text-center">
                      {article.Picture1Contents}
                    </p>
                  </div>
                )}

                {article.Picture2 && (
                  <div className="mb-8">
                    <img
                      src={`${ 'http://10.10.1.17:1338'}${article.Picture2.url}`}
                      alt={article.Picture2Content}
                      className="w-full h-64 md:h-96 object-cover rounded-lg mb-4"
                    />
                    <p className="text-lg font-bold text-gray-800 text-center">
                      {article.Picture2Content}
                    </p>
                  </div>
                )}

                {article.Picture3 && (
                  <div className="mb-8">
                    <img
                      src={`${ 'http://10.10.1.17:1338'}${article.Picture3.url}`}
                      alt={article.Picture3Content}
                      className="w-full h-64 md:h-96 object-cover rounded-lg mb-4"
                    />
                    <p className="text-lg font-bold text-gray-800 text-center">
                      {article.Picture3Content}
                    </p>
                  </div>
                )}

                {/* Call to Action */}
                <div className="mt-12 text-center">
                  <button
                    onClick={() => router.push('/allnews')}
                    className="btn-responsive bg-primary hover:bg-primary/90 text-white"
                  >
                    View All News
                  </button>
                </div>
              </div>

              {/* Sidebar - Recent News */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                  <h3 className="text-xl font-bold text-primary mb-6">Latest Posts</h3>
                  
                  {recentNews.length > 0 ? (
                    <div className="space-y-6">
                      {recentNews.map((news: NewsArticle) => (
                        <div key={news.documentId} className="border-b border-gray-200 pb-4 last:border-b-0">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <img
                                src={`${ 'http://10.10.1.17:1338'}${news.MainPicture.url}`}
                                alt={news.Title}
                                className="w-16 h-16 object-cover rounded"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              {/* <p className="text-xs text-gray-500 mb-1">by Admin</p> */}
                              <h4 className="text-sm font-medium text-gray-900 leading-tight hover:text-primary cursor-pointer"
                                  onClick={() => router.push(`/news/${news.documentId}`)}>
                                {news.Title}
                              </h4>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No recent news available</p>
                  )}

                 

                
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default NewsDetail 