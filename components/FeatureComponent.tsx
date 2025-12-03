"use client";

import { useState } from "react";
import ProjectFeatureForm, { FeatureData } from "./ProjectFeatureForm";
import FeatureList from "./FeatureList";
import {
  AddOrUpdateFeature,
  deleteProjectFeatures,
  UpdateCache,
} from "@/app/serveraction";

export default function FeatureComponent({
  initialFeatures,
  projectId,
}: {
  initialFeatures?: FeatureData[];
  projectId: number;
}) {
  const [features, setFeatures] = useState<FeatureData[]>(
    initialFeatures ?? []
  );

  const [editingFeature, setEditingFeature] = useState<FeatureData | null>(
    null
  );

  const handleDelete = async (id: number) => {
    const { success } = await deleteProjectFeatures(id);
    if (success) setFeatures((prev) => prev.filter((f) => f.id !== id));
  };

  const addFeature = (feature: FeatureData) => {
    if (feature.id) {
      setFeatures((prev) =>
        prev.map((f) => (f.id === feature.id ? feature : f))
      );
    } else {
      setFeatures((prev) => [...prev, feature]);
    }
  };

  const saveChanges = async () => {
    const { success } = await AddOrUpdateFeature(features, projectId);
    if (success) {
      UpdateCache(`project-${projectId}`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Project Features</h2>

      <ProjectFeatureForm
        projectId={projectId}
        feature={editingFeature}
        addFeature={addFeature}
      />

      {features?.length > 0 && (
        <FeatureList
          features={features}
          onEdit={(item) => setEditingFeature(item)}
          onDelete={handleDelete}
        />
      )}

      <button
        type="button"
        onClick={saveChanges}
        disabled={initialFeatures === features}
        className="h-11 rounded-lg bg-blue-500 text-white  font-semibold  transition"
      >
        Save Changes
      </button>
    </div>
  );
}
