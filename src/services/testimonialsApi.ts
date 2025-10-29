import type { TestimonialsResponse, Testimonial } from '../types/testimonials';

const API_BASE_URL = 'https://primelife.prime.rw:8080/api';

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/what-our-clients-says?populate=ProfilePic`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: TestimonialsResponse = await response.json();
    
    // Transform the API data to match our component's expected format
    return data.data.map((item) => ({
      id: item.id,
      name: item.FullNames,
      position: item.Occupation,
      image: item.ProfilePic ? `${API_BASE_URL.replace('/api', '')}${item.ProfilePic.url}` : '',
      content: extractTextFromMessage(item.Message),
      rating: 5 // Default rating since API doesn't provide it
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    // Return empty array on error to prevent component crash
    return [];
  }
};

// Helper function to extract text content from the Message array
const extractTextFromMessage = (message: any[]): string => {
  if (!message || !Array.isArray(message)) {
    return '';
  }
  
  return message
    .map((item) => {
      if (item.children && Array.isArray(item.children)) {
        return item.children
          .map((child: any) => child.text || '')
          .join(' ');
      }
      return '';
    })
    .join(' ')
    .trim();
};
