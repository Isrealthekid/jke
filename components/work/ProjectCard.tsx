"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/work/${project.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-white/5">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="mt-4 flex items-baseline justify-between">
          <h3 className="font-display text-2xl text-brand-white">
            {project.title}
          </h3>
          <span className="font-body text-sm text-brand-white/40">
            {project.year}
          </span>
        </div>
        <p className="mt-1 font-body text-sm text-brand-white/60">
          {project.category}
        </p>
      </Link>
    </motion.div>
  );
}
