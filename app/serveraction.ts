"use server";

import { ProjectData } from "@/components/ProjectDataForm";
import { FeatureData } from "@/components/ProjectFeatureForm";
import {
  CREATE_FEATURE,
  CREATE_PROJECTS,
  DELETE_FEATURE,
  GET_PROJECT,
  GET_PROJECTS,
} from "@/constants";
import { ProjectDataResponse } from "@/lib/types";
import { del, put } from "@vercel/blob";
import { updateTag } from "next/cache";

type ActionResult = {
  success: boolean;
  error?: string;
};

type ProjectResult = {
  success: boolean;
  projects: ProjectData[];
  error?: string;
};

type ProjectDetailResult = {
  success: boolean;
  project?: ProjectDataResponse;
  error?: string;
};


export const getAllProject = async (): Promise<ProjectResult> => {
  try {
    const res = await fetch(GET_PROJECTS, {
      next: { tags: ["projects"], revalidate: 60 },
    });

    if (!res.ok) {
      return {
        success: false,
        projects: [],
        error: "Failed to fetch projects",
      };
    }

    const data = await res.json();
    return { success: true, projects: data.projects || [] };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { success: false, projects: [], error: "Network error" };
  }
};

export const AddOrUpdateProjectData = async (
  data: ProjectData
): Promise<ActionResult> => {
  try {
    const res = await fetch(CREATE_PROJECTS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return { success: false, error: "Failed to create/update project" };
    }

    const result = await res.json();
    return { success: result.success };
  } catch (error) {
    console.error("Error adding/updating project:", error);
    return { success: false, error: "Network error" };
  }
};

export const AddOrUpdateFeature = async (
  data: FeatureData[],
  projectId: number
): Promise<ActionResult> => {
  try {
    const res = await fetch(CREATE_FEATURE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ features: data, projectId }),
    });

    if (!res.ok) {
      return { success: false, error: "Failed to create/update feature" };
    }

    const result = await res.json();
    return { success: result.success };
  } catch (error) {
    console.error("Error adding/updating feature:", error);
    return { success: false, error: "Network error" };
  }
};

export const getProjectAndFeatures = async (
  id: number
): Promise<ProjectDetailResult> => {
  try {
    const res = await fetch(`${GET_PROJECT}/${id}`, {
      next: { tags: [`project-${id}`] },
    });

    if (!res.ok) {
      return { success: false };
    }

    const data = await res.json();
    return { success: data.success, project: data.project };
  } catch (error) {
    console.error("Error fetching project:", error);
    return { success: false };
  }
};

export const deleteProjectFeatures = async (
  id: number | null
): Promise<ActionResult> => {
  if (id === null) {
    return { success: false, error: "Feature ID is required" };
  }

  try {
    const res = await fetch(`${DELETE_FEATURE}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return { success: false, error: "Failed to delete feature" };
    }

    const result = await res.json();
    return { success: result.success };
  } catch (error) {
    console.error("Error deleting feature:", error);
    return { success: false, error: "Network error" };
  }
};

export const UploadImage = async (
  file: File,
  currentUrl?: string
): Promise<{ success: boolean; url: string }> => {
  try {
    if (currentUrl) await del(currentUrl);
    const blobPath = `cms_project/${Date.now()}-${file.name}`;
    const { url } = await put(blobPath, file, { access: "public" });
    return { success: true, url };
  } catch (error) {
    console.log("Failed to delete old image:", error);
    return { success: false, url: "" };
  }
};

export const UpdateCache = async (tag: string) => {
  updateTag(tag);
};
