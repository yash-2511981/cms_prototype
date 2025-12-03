import Link from "next/link";
import Projects from "./Projects";
import { getAllProject } from "../serveraction";

export type Project = {
  id: number | null;
  title: string | null;
  description: string | null;
  heroImage: string | null;
  url: string | null;
};

export default async function AdminDashboard() {
  const { projects } = await getAllProject();
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

          <Link
            href="/dashboard/create"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
          >
            + Add New Project
          </Link>
        </div>
        <Projects projects={projects} />
      </div>
    </main>
  );
}
