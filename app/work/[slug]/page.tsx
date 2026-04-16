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
  if (!project) return { title: "Project — JK Egbuson" };

  return {
    title: `JK Egbuson — ${project.title}`,
    description: project.description,
    openGraph: {
      title: `JK Egbuson — ${project.title}`,
      description: project.description,
      images: [{ url: project.thumbnail, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `JK Egbuson — ${project.title}`,
      description: project.description,
      images: [project.thumbnail],
    },
  };
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
