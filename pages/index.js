import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import HeroSection from '../components/layout/HeroSection'
import ProjectCard from '../components/projects/ProjectCard'
import { getFeaturedProjects, getSkills } from '../lib/portfolioApi'

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [topSkills, setTopSkills] = useState([])
  const [loading, setLoading] = useState(true)

  // Set default theme to dark on mount
  // (Removed, now handled globally in _app.js)

  useEffect(() => {
    async function fetchHomeData() {
      try {
        setLoading(true)
        const [projectsData, skillsData] = await Promise.all([
          getFeaturedProjects(),
          getSkills()
        ])
        
        // Get featured projects (limit to 3)
        const projects = projectsData.projects || projectsData || []
        const featured = projects.slice(0, 3)
        setFeaturedProjects(featured)
        
        // Get top skills (limit to 6)
        const skills = skillsData.skills || skillsData || []
        const top = skills
          .sort((a, b) => (b.proficiency_level || 0) - (a.proficiency_level || 0))
          .slice(0, 6)
        setTopSkills(top)
      } catch (err) {
        console.error('Error fetching home data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  return (
    <>
      <Head>
        <title>Gift Ndlala - Software Developer</title>
        <meta name="description" content="Full-stack software developer specializing in modern web technologies and backend development." />
      </Head>
      
      <HeroSection />
      
      <main className="container mx-auto p-4 bg-black text-white min-h-screen">
        {/* Featured Projects Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          ) : featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No featured projects available.</p>
            </div>
          )}
          
          <div className="text-center">
            <Link 
              href="/projects"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              View All Projects
            </Link>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Technologies I Work With</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              I specialize in modern web technologies and have experience across the full stack.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          ) : topSkills.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {topSkills.map(skill => (
                <div key={skill.id} className="bg-gray-900 rounded-lg shadow-md p-4 text-center hover:shadow-lg transition border border-gray-700">
                  {skill.icon_url && (
                    <img 
                      src={skill.icon_url} 
                      alt={skill.name}
                      className="w-8 h-8 mx-auto mb-2"
                    />
                  )}
                  <p className="text-sm font-medium text-gray-200">{skill.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">Skills information not available.</p>
            </div>
          )}
          
          <div className="text-center">
            <Link 
              href="/skills"
              className="inline-block bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              View All Skills
            </Link>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Explore My Portfolio</h2>
            <p className="text-gray-300">Learn more about my work and experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/about"
              className="bg-gray-900 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition group border border-gray-700"
            >
              <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-800 transition">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">About Me</h3>
              <p className="text-gray-300 text-sm">Learn about my background, experience, and what drives me.</p>
            </Link>
            
            <Link 
              href="/projects"
              className="bg-gray-900 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition group border border-gray-700"
            >
              <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-800 transition">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">My Projects</h3>
              <p className="text-gray-300 text-sm">Browse through my portfolio of projects and applications.</p>
            </Link>
            
            <Link 
              href="/contact"
              className="bg-gray-900 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition group border border-gray-700"
            >
              <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-800 transition">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Get In Touch</h3>
              <p className="text-gray-300 text-sm">Ready to work together? Let's discuss your project.</p>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
