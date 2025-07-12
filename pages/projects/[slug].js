import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getProjectBySlug } from '../../lib/portfolioApi'
import TrackedLink from '../../components/ui/TrackedLink'

export default function ProjectDetail() {
  const router = useRouter()
  const { slug } = router.query
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProject() {
      if (!slug) return
      
      try {
        setLoading(true)
        const data = await getProjectBySlug(slug)
        setProject(data.project || data)
      } catch (err) {
        console.error('Error fetching project:', err)
        setError('Project not found')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [slug])

  if (loading) {
    return (
      <div className="container mx-auto p-8 bg-black text-white">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="container mx-auto p-8 bg-black text-white">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-6">{error || 'The project you are looking for does not exist.'}</p>
          <TrackedLink 
            href="/projects" 
            linkType="back_to_projects"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            Back to Projects
          </TrackedLink>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8 bg-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <TrackedLink 
            href="/projects" 
            linkType="back_to_projects"
            className="text-green-500 hover:text-green-400 mb-4 inline-block"
          >
            ← Back to Projects
          </TrackedLink>
          <h1 className="text-4xl font-bold mb-4 text-green-500">{project.title}</h1>
          <p className="text-xl text-gray-300 mb-6">{project.summary}</p>
          
          {/* Project Links */}
          <div className="flex gap-4 mb-6">
            {project.github_url && (
              <TrackedLink 
                href={project.github_url} 
                linkType="github" 
                projectId={project.id}
                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </TrackedLink>
            )}
            {project.live_url && (
              <TrackedLink 
                href={project.live_url} 
                linkType="live_demo" 
                projectId={project.id}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </TrackedLink>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-6 border border-green-400/20">
              <h2 className="text-2xl font-bold mb-4 text-green-400">About This Project</h2>
              <p className="text-gray-200 leading-relaxed">
                {project.description || project.summary}
              </p>
            </div>

            {/* Project Images */}
              <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-green-400/20">
                <h2 className="text-2xl font-bold mb-4 text-green-400">Project Screenshots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Use placeholder images based on project type */}
                {(() => {
                  const title = project.title.toLowerCase()
                  console.log('Project detail - title:', project.title, 'Lowercase:', title)
                  let images = []
                  
                  if (title.includes('lms')) {
                    console.log('Matched LMS project in detail page')
                    images = [
                      { id: 1, src: '/images/lms-1.png', caption: 'LMS Dashboard' },
                      { id: 2, src: '/images/lms-2.png', caption: 'Course Management' },
                      { id: 3, src: '/images/lms-3.png', caption: 'User Interface' }
                    ]
                    // Always show images for LMS, skip placeholder
                  } else if (title.includes('oox') && title.includes('ecom')) {
                    console.log('Matched OOX E-commerce project in detail page')
                    images = [
                      { id: 1, src: '/images/oox-ecom.png', caption: 'E-commerce Platform' }
                    ]
                  } else if (title.includes('oox ecom') || title.includes('oox-ecom')) {
                    console.log('Matched OOX E-commerce project in detail page (alternative)')
                    images = [
                      { id: 1, src: '/images/oox-ecom.png', caption: 'E-commerce Platform' }
                    ]
                  } else if (title.includes('oox') && title.includes('internal')) {
                    console.log('Matched OOX Internal project in detail page')
                    images = [
                      { id: 1, src: '/images/oox-internal-1.png', caption: 'Admin Dashboard' },
                      { id: 2, src: '/images/oox-internal-2.png', caption: 'Internal Tools' }
                    ]
                  } else if (title.includes('college') || title.includes('elite')) {
                    console.log('Matched college/elite project in detail page - no images')
                    // No images for these projects
                    images = []
                  } else {
                    console.log('Using default fallback in detail page')
                    // Default fallback - no images, will show placeholder
                    images = []
                  }
                  
                  if (images.length === 0 && !title.includes('lms')) {
                    return (
                      <div className="col-span-full text-center py-12">
                        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                          <svg className="w-16 h-16 text-orange-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <h3 className="text-lg font-semibold text-orange-400 mb-2">Project Details</h3>
                          <p className="text-orange-300">Screenshots coming soon...</p>
                        </div>
                      </div>
                    )
                  }
                  
                  return images.map((image) => (
                    <div key={image.id} className="relative">
                      <img
                        src={image.src}
                        alt={image.caption}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                        <p className="text-sm text-gray-300 mt-2">{image.caption}</p>
                    </div>
                  ))
                })()}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-green-400/20">
              <h3 className="text-lg font-bold mb-4 text-green-400">Project Info</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-200">Status:</span>
                  <span className="ml-2 px-2 py-1 bg-green-900/30 text-green-300 rounded-full text-sm">
                    {project.is_featured ? 'Featured' : 'Completed'}
                  </span>
                </div>
                {project.start_date && (
                  <div>
                    <span className="font-semibold text-gray-200">Started:</span>
                    <span className="ml-2 text-gray-300">
                      {new Date(project.start_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {project.end_date && (
                  <div>
                    <span className="font-semibold text-gray-200">Completed:</span>
                    <span className="ml-2 text-gray-300">
                      {new Date(project.end_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills Used */}
            {project.skills && project.skills.length > 0 && (
              <div className="dark:bg-gray-900 bg-white rounded-lg shadow-md p-6 border border-green-700/20 dark:border-green-400/20">
                <h3 className="text-lg font-bold mb-4 text-green-600 dark:text-green-400">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
