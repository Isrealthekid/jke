import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectHero from "./ProjectHero";
import ProjectContent from "./ProjectContent";
import ProjectNav from "./ProjectNav";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project ? `${project.title} — JK Egbuson` : "Project" };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) return notFound();

  const project = projects[projectIndex];
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <main style={{ backgroundColor: "#0a0a0a", minHeight: "100vh" }}>
      <ProjectHero project={project} />
      <ProjectContent project={project} />
      <ProjectNav prev={prevProject} next={nextProject} />
    </main>
  );
}
