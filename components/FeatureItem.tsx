"use client";

import { deleteProjectFeatures } from "@/app/serveraction";
import { FeatureData } from "./ProjectFeatureForm";
import { useState } from "react";

export default function FeatureItem({
  feature,
  onEdit,
  onDelete,
}: {
  feature: FeatureData;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this feature?")) return;

    setDeleting(true);
    const { success } = await deleteProjectFeatures(feature.id);

    if (success) {
      onDelete();
    } else {
      alert("Failed to delete feature");
    }

    setDeleting(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-start">
      <div>
        <h4 className="font-semibold text-black">{feature.title}</h4>
        <p className="text-sm text-slate-600 mt-1">{feature.description}</p>
      </div>

      <div className="flex flex-col items-end gap-1">
        <button
          className="text-indigo-600 text-sm hover:underline"
          onClick={onEdit}
          disabled={deleting}
        >
          Edit
        </button>

        <button
          className="text-red-500 text-sm hover:underline disabled:opacity-50"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
