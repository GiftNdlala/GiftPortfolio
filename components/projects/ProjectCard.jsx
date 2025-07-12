import TrackedLink from '../ui/TrackedLink'
import Image from 'next/image'

// Function to get placeholder image based on project title
const getPlaceholderImage = (projectTitle) => {
  const title = projectTitle.toLowerCase()
  console.log('Project title:', projectTitle, 'Lowercase:', title)
  
  // LMS Backend project
  if (title.includes('lms')) {
    console.log('Matched LMS project')
    return '/images/lms-1.png'
  }
  
  // OOX E-commerce project
  if (title.includes('oox') && title.includes('ecom')) {
    console.log('Matched OOX E-commerce project')
    return '/images/oox-ecom.png'
  }
  
  // Alternative check for OOX E-commerce (in case title format is different)
  if (title.includes('oox ecom') || title.includes('oox-ecom')) {
    console.log('Matched OOX E-commerce project (alternative)')
    return '/images/oox-ecom.png'
  }
  
  // OOX Internal project
  if (title.includes('oox') && title.includes('internal')) {
    console.log('Matched OOX Internal project')
    return '/images/oox-internal-1.png'
  }
  
  // college-ecom and elite ai projects - return null for no image
  if (title.includes('college') || title.includes('elite')) {
    console.log('Matched college/elite project - no image')
    return null
  }
  
  // Default fallback
  console.log('Using default fallback')
  return '/images/lms-1.png'
}

export default function ProjectCard({ project }) {
  const imageSrc = project.thumbnail_url || getPlaceholderImage(project.title)
  
  return (
    <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden border border-green-400/20">
      <div className="relative h-48">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={project.title}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-900/30 to-green-700/10 dark:from-green-900 dark:to-green-800">
            <div className="text-center">
              <svg className="w-16 h-16 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-green-500 font-semibold">{project.title}</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-green-600 dark:text-green-400">{project.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{project.summary}</p>
        <div className="flex justify-between mt-4">
          <TrackedLink href={`/projects/${project.slug}`} linkType="project_detail" projectId={project.id}>
            <span className="text-green-500 hover:text-green-400 font-semibold">View Details</span>
          </TrackedLink>
          <div className="flex gap-2">
            {project.github_url && (
              <TrackedLink href={project.github_url} linkType="github" projectId={project.id}>
                <span className="text-green-500 hover:text-green-400">GitHub</span>
              </TrackedLink>
            )}
            {project.live_url && (
              <TrackedLink href={project.live_url} linkType="live_demo" projectId={project.id}>
                <span className="text-green-500 hover:text-green-400">Live</span>
              </TrackedLink>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
