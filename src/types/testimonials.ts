export interface TestimonialMessage {
  type: string;
  children: Array<{
    type: string;
    text: string;
  }>;
}

export interface TestimonialProfilePic {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: any | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TestimonialData {
  id: number;
  documentId: string;
  FullNames: string;
  Occupation: string;
  Message: TestimonialMessage[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  ProfilePic: TestimonialProfilePic;
}

export interface TestimonialsResponse {
  data: TestimonialData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  image: string;
  content: string;
  rating: number;
}
