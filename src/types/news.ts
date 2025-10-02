export interface NewsImage {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    thumbnail: {
      name: string
      hash: string
      ext: string
      mime: string
      path: string | null
      width: number
      height: number
      size: number
      sizeInBytes: number
      url: string
    }
    small: {
      name: string
      hash: string
      ext: string
      mime: string
      path: string | null
      width: number
      height: number
      size: number
      sizeInBytes: number
      url: string
    }
    medium: {
      name: string
      hash: string
      ext: string
      mime: string
      path: string | null
      width: number
      height: number
      size: number
      sizeInBytes: number
      url: string
    }
    large?: {
      name: string
      hash: string
      ext: string
      mime: string
      path: string | null
      width: number
      height: number
      size: number
      sizeInBytes: number
      url: string
    }
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface NewsArticle {
  id: number
  documentId: string
  Title: string
  SubTitle: string
  MainContent: string
  Picture1Contents: string
  Picture2Content: string
  Picture3Content: string
  Picture4Content: string | null
  createdAt: string
  updatedAt: string
  publishedAt: string
  MainPicture: NewsImage
  Picture1: NewsImage
  Picture2: NewsImage
  Picture3: NewsImage
  Picture4: NewsImage | null
}

// For multiple news articles (like fetchNews)
export interface NewsApiResponse {
  data: NewsArticle[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// For single news article (like fetchNewsById)
export interface SingleNewsApiResponse {
  data: NewsArticle
  meta: {}
}
