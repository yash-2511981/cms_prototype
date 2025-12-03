import { FeatureData } from "@/components/ProjectFeatureForm";

export type ProjectDataResponse = {
  id: number | null;
  title: string;
  description: string;
  url: string;
  heroImage: string;
  features: FeatureData[];
};
