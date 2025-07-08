import { getProjectBySlug } from '../../lib/projectsApi'

export default function ProjectDetail({ project }) {
  if (!project) return <div>Project not found.</div>
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
      {/* Add more project details here */}
    </div>
  )
}

// This is a placeholder for static generation. In a real app, use getStaticPaths/getStaticProps.
export async function getServerSideProps(context) {
  const { slug } = context.params
  try {
    const project = await getProjectBySlug(slug)
    return { props: { project } }
  } catch {
    return { props: { project: null } }
  }
}
