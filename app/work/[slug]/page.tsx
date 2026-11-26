import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectDetail from "./ProjectDetail";
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
  if (!project) return { title: "Project | Joy Karenate-Egbuson — The Joie TV" };

  return {
    title: `${project.title} | Joy Karenate-Egbuson — The Joie TV`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Joy Karenate-Egbuson — The Joie TV`,
      description: project.description,
      images: [{ url: project.thumbnail, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${project.title} | Joy Karenate-Egbuson — The Joie TV`,
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
    <main style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      <ProjectDetail project={project} />
      <ProjectNav prev={prevProject} next={nextProject} />
    </main>
  );
}
