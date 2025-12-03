"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import ImageUploadComponent from "./ImageUploadComponent";
import { AddOrUpdateProjectData } from "@/app/serveraction";
import { useRouter } from "next/navigation";

export type ProjectData = {
  id: number | null;
  title: string;
  description: string;
  url: string;
  heroImage: string;
};

interface PageProps {
  project?: ProjectData;
}

export default function ProjectDataForm({ project }: PageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [projectData, setProjectData] = useState<ProjectData>({
    id: project?.id || null,
    title: project?.title || "",
    description: project?.description || "",
    url: project?.url || "",
    heroImage: project?.heroImage || "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!projectData.title || !projectData.url || !projectData.description) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    const { success, error: apiError } = await AddOrUpdateProjectData(
      projectData
    );
    console.log(success);

    if (success) {
      router.refresh();
      router.push("/dashboard");
    } else {
      setError(apiError || "Failed to save project");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-sm border border-black/20"
    >
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Title */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-black">Page Title</label>
        <input
          onChange={handleInputChange}
          value={projectData.title}
          type="text"
          name="title"
          className="h-11 px-4 rounded-lg border border-black/30 outline-none bg-white text-black placeholder-gray-500 focus:border-black"
          disabled={loading}
        />
      </div>

      {/* URL */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-black">Page URL</label>
        <input
          onChange={handleInputChange}
          value={projectData.url}
          type="text"
          name="url"
          placeholder="https://example.com"
          className="h-11 px-4 rounded-lg border border-black/30 outline-none bg-white text-black placeholder-gray-500 focus:border-black"
          disabled={loading}
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-black">Description</label>
        <textarea
          name="description"
          value={projectData.description}
          rows={4}
          onChange={handleInputChange}
          className="p-4 rounded-lg border border-black/30 outline-none bg-white text-black placeholder-gray-500 focus:border-black"
          disabled={loading}
        />
      </div>

      {/* Image Upload */}
      <ImageUploadComponent
        initialUrl={projectData.heroImage}
        onUpload={(url) =>
          setProjectData((prev) => ({ ...prev, heroImage: url }))
        }
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="h-11 rounded-lg bg-black text-white font-semibold hover:bg-neutral-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Saving..." : "Save Project"}
      </button>
    </form>
  );
}
