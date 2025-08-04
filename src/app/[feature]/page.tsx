import { notFound } from "next/navigation";
import TaskPage from "@/components/TaskPage.component";

const validFeatures = ['today', 'upcoming', 'expired', 'completed', 'all'] as const;
type FeatureOptions = typeof validFeatures[number];

interface PageProps {
  params: { feature: string };
}

export async function generateStaticParams() {
  return validFeatures.map((feature) => ({ feature }));
}

export default async function Page({ params }: PageProps) {
  const { feature } = await params;

  if (!validFeatures.includes(feature as FeatureOptions)) {
    notFound();
  }

  const filter = feature as FeatureOptions;

  return <TaskPage filter={filter} />;
}
