import ProjectCard from '../../components/projects/ProjectCard'
// import { getProjects } from '../../lib/projectsApi' // Uncomment when data fetching is set up

export default function ProjectsPage() {
  // const projects = await getProjects() // For SSR/SSG, use getServerSideProps or getStaticProps
  const projects = [] // Placeholder for now
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map(project => <ProjectCard key={project.id} project={project} />)
        )}
      </div>
    </div>
  )
}
