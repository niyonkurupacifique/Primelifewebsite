import JobDetailsPage from "@/components/JobDetailsPage";

interface JobDetailsPageProps {
  params: {
    documentId: string;
  };
}

export default function JobDetailsPageComponent({ params }: JobDetailsPageProps) {
  return <JobDetailsPage />;
}
