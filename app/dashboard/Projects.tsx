import { ProjectData } from "@/components/ProjectDataForm";
import Image from "next/image";
import Link from "next/link";

const Projects = async ({ projects }: { projects: ProjectData[] }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.length === 0 ? (
        <div className="col-span-full text-center text-sm py-8">
          No project pages created yet.
        </div>
      ) : (
        projects.map((p) => (
          <div
            key={p.id}
            className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden text-black"
          >
            <div className="h-36 relative bg-slate-100">
              <Image
                src={p.heroImage || "/placeholder.png"}
                alt={p.title || "project image"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold line-clamp-1">{p.title}</h3>

              <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                {p.description}
              </p>

              <p className="text-xs mt-2 text-indigo-600">{p.url}</p>

              <div className="flex items-center justify-between mt-4">
                <Link
                  href={`/dashboard/project/${p.id}`}
                  className="text-indigo-600 text-sm font-medium hover:underline"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Projects;
