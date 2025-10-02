import NewsDetail from "@/components/NewsDetail";

interface NewsDetailPageProps {
  params: {
    documentId: string;
  };
}

export default function NewsDetailPageComponent({ params }: NewsDetailPageProps) {
  return <NewsDetail />;
}
