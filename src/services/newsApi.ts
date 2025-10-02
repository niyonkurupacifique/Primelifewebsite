import type { NewsApiResponse, SingleNewsApiResponse, NewsArticle } from '../types/news'

const API_BASE_URL = 'http://10.10.1.17:1338/api'

export const fetchNews = async (): Promise<NewsApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/news-managements?populate=*`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: NewsApiResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching news:', error)
    throw error
  }
}

export const fetchNewsById = async (documentId: string): Promise<SingleNewsApiResponse> => {
  console.log(`api i am calling ${API_BASE_URL}/news-managements/${documentId}?populate=*`)
  try {
    const response = await fetch(`${API_BASE_URL}/news-managements/${documentId}?populate=*`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: SingleNewsApiResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching news by ID:', error)
    throw error
  }
}

export const getRecentNews = (articles: NewsArticle[], days: number = 7): NewsArticle[] => {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  
  return articles.filter(article => {
    const articleDate = new Date(article.publishedAt)
    // Include articles from the last 7 days OR future articles (for testing/demo purposes)
    return articleDate >= cutoffDate || articleDate > new Date()
  })
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
