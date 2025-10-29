import JobDetailsPage from "@/components/JobDetailsPage";

interface JobDetailsPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

export default async function JobDetailsPageComponent({ params }: JobDetailsPageProps) {
  // Note: JobDetailsPage component gets documentId from useParams internally
  return <JobDetailsPage />;
}
