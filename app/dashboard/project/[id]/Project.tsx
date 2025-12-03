import { getProjectAndFeatures } from "@/app/serveraction";
import FeatureComponent from "@/components/FeatureComponent";
import ProjectDataForm from "@/components/ProjectDataForm";
import { notFound } from "next/navigation";

async function Project({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectId = parseInt(id);
  console.log(id);

  const { success, project } = await getProjectAndFeatures(projectId);

  if (!success) {
    return notFound();
  }

  return (
    <>
      <ProjectDataForm project={project} />

      <FeatureComponent
        projectId={projectId}
        initialFeatures={project?.features || []}
      />
    </>
  );
}

export default Project;
