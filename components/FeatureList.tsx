import { FeatureData } from "./ProjectFeatureForm";
import FeatureItem from "./FeatureItem";

interface Props {
  features: FeatureData[];
  onEdit: (feature: FeatureData) => void;
  onDelete: (id: number) => void;
}

export default function FeatureList({ features, onEdit, onDelete }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {features.map((feature) => (
        <FeatureItem
          key={feature.title}
          feature={feature}
          onEdit={() => onEdit(feature)}
          onDelete={() => onDelete(feature.id!)}
        />
      ))}
    </div>
  );
}
