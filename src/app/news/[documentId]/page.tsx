import NewsDetail from "@/components/NewsDetail";

interface NewsDetailPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

export default async function NewsDetailPageComponent({ params }: NewsDetailPageProps) {
  // Note: NewsDetail component gets documentId from useParams internally
  return <NewsDetail />;
}
