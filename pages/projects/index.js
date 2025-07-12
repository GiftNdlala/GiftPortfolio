import { useState, useEffect } from 'react'
import ProjectCard from '../../components/projects/ProjectCard'
import { getProjects } from '../../lib/portfolioApi'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        const data = await getProjects()
        setProjects(data.projects || data || [])
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-8 bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">Projects</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">Projects</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-500">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 text-lg">No projects found.</p>
          </div>
        ) : (
          projects.map(project => <ProjectCard key={project.id} project={project} />)
        )}
      </div>
    </div>
  )
}
