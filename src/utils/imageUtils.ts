import type { NewsImage } from '../types/news'

/**
 * Get the best quality image URL from a NewsImage object
 * Prioritizes original quality over smaller formats
 */
export const getBestImageUrl = (image: NewsImage | null | undefined): string => {
  if (!image) return '/news-banner.jpg'

  // Always prefer the original high-quality image first
  if (image.url) {
    return `https://primelife.prime.rw:8080${image.url}`
  }

  // If original is missing, fallback to larger formats first, then smaller
  if (image.formats?.large?.url) {
    return `https://primelife.prime.rw:8080${image.formats.large.url}`
  }
  
  if (image.formats?.medium?.url) {
    return `https://primelife.prime.rw:8080${image.formats.medium.url}`
  }
  
  if (image.formats?.small?.url) {
    return `https://primelife.prime.rw:8080${image.formats.small.url}`
  }
  
  if (image.formats?.thumbnail?.url) {
    return `https://primelife.prime.rw:8080${image.formats.thumbnail.url}`
  }

  // Final fallback to default image
  return '/news-banner.jpg'
}

/**
 * Get a fallback image URL for error handling
 */
export const getFallbackImageUrl = (): string => {
  return '/news-banner.jpg'
}
