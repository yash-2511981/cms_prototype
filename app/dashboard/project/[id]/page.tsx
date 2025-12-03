import { Suspense } from "react";
import Project from "./Project";
import Link from "next/link";

async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Edit Project</h1>
          <Link href="/dashboard/" className="px-2 py-2 ">
            Go back
          </Link>
        </div>
        <Suspense>
          <Project params={params} />
        </Suspense>
      </div>
    </div>
  );
}

export default EditProjectPage;
