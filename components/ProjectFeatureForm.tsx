"use client";

import { ChangeEvent, useEffect, useState } from "react";

export type FeatureData = {
  id: number | null;
  projectId?: number | null;
  title: string;
  description: string;
};

export default function ProjectFeatureForm({
  projectId,
  feature,
  addFeature,
}: {
  projectId: number;
  feature?: FeatureData | null;
  addFeature: (feature: FeatureData) => void;
}) {
  const [form, setForm] = useState<FeatureData>({
    id: null,
    projectId,
    title: "",
    description: "",
  });

  useEffect(() => {
    if (feature) {
      setForm(feature);
    } else {
      setForm({ id: null, projectId, title: "", description: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feature]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "projectId" ? Number(value) || null : value,
    }));
  };

  const handleSubmit = () => {
    const { title, description } = form;
    if (!title || !description) return;
    addFeature(form);
    setForm({
      id: null,
      projectId,
      title: "",
      description: "",
    });
  };

  return (
    <form className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-sm border border-black/20">
      <h3 className="text-lg font-semibold text-black">
        {form.id ? "Edit Feature" : "Add New Feature"}
      </h3>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-black">Feature Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          type="text"
          className="h-11 px-4 rounded-lg border border-black/30 bg-white text-black placeholder-gray-500 focus:border-black"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-black">
          Feature Description
        </label>
        <textarea
          name="description"
          rows={3}
          value={form.description}
          onChange={handleChange}
          className="p-4 rounded-lg border border-black/30 bg-white text-black placeholder-gray-500 focus:border-black"
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="h-11 rounded-lg bg-black text-white font-semibold hover:bg-neutral-800 transition"
      >
        {form.id ? "Update feature" : "Add Feature"}
      </button>
    </form>
  );
}
