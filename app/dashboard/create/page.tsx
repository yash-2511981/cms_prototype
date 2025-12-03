import ProjectDataForm from "@/components/ProjectDataForm";

function CreateProjectPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-2xl font-semibold">Create New Project</h1>

        <ProjectDataForm />

        <div className="p-6 bg-slate-50 rounded-lg text-center text-slate-600 text-sm">
          Save the project first to add features
        </div>
      </div>
    </div>
  );
}

export default CreateProjectPage;
