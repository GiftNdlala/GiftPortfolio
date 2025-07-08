import TrackedLink from '../ui/TrackedLink'
import Image from 'next/image'

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        {project.thumbnail_url ? (
          <Image
            src={project.thumbnail_url}
            alt={project.title}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{project.title}</h3>
        <p className="text-sm text-gray-600">{project.summary}</p>
        <div className="flex justify-between mt-4">
          <TrackedLink href={`/projects/${project.slug}`} linkType="project_detail" projectId={project.id}>
            View Details
          </TrackedLink>
          <div className="flex gap-2">
            {project.github_url && (
              <TrackedLink href={project.github_url} linkType="github" projectId={project.id}>GitHub</TrackedLink>
            )}
            {project.live_url && (
              <TrackedLink href={project.live_url} linkType="live_demo" projectId={project.id}>Live</TrackedLink>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
