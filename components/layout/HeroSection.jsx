import { useState, useEffect } from 'react'
import TrackedLink from '../ui/TrackedLink'
import { getStats } from '../../lib/portfolioApi'
import ThemeToggle from './ThemeToggle'
import MatrixRain from '../ui/MatrixRain'

export default function HeroSection() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const statsData = await getStats()
        setStats(statsData)
      } catch (err) {
        console.error('Error fetching stats:', err)
      }
    }
    fetchStats()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[70vh] bg-black text-white px-4 py-16 overflow-hidden">
        {/* Matrix Rain Animation - only on desktop */}
        <div className="hidden md:block absolute left-[32%] right-[32%] top-0 bottom-0 z-0 pointer-events-none" style={{minWidth: '300px'}}>
          <MatrixRain />
        </div>
        {/* Top right: Theme toggle */}
        <div className="absolute top-6 right-6 z-20">
          <ThemeToggle />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2">
          <span className="block text-gray-400 dark:text-gray-300">Hello<span className="text-green-500">.</span></span>
          I'm <span className="text-green-600">Gift Ndlala</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-green-500 mb-4">Software Developer</h2>
        {/* Profile Image */}
        <div className="mt-6">
          <img
            src="/images/profile-picture.jpg"
            alt="Gift Ndlala profile"
            className="w-36 h-36 md:w-48 md:h-48 rounded-full border-4 border-green-500 object-cover aspect-square mx-auto shadow-xl bg-black"
          />
        </div>
        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
          >
            Get a project
          </a>
          <a
            href="/resume.pdf"
            className="border border-green-500 hover:bg-green-500 hover:text-white text-green-600 font-semibold py-2 px-6 rounded-lg shadow transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            My resume
          </a>
        </div>
        {/* Social Links */}
        <div className="flex gap-4 mt-6 justify-center">
          <TrackedLink href="https://github.com/giftndlala" linkType="github">
            <svg className="w-6 h-6 text-gray-400 hover:text-green-500 transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.012-1.243-.018-2.25-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.92.43.372.823 1.104.823 2.225 0 1.606-.015 2.898-.015 3.293 0 .322.216.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </TrackedLink>
          <TrackedLink href="https://linkedin.com/in/giftndlala" linkType="linkedin">
            <svg className="w-6 h-6 text-gray-400 hover:text-green-500 transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
            </svg>
          </TrackedLink>
        </div>
        {/* Optional: Down arrow scroll indicator */}
        <div className="mt-8 animate-bounce text-green-500 text-3xl">↓</div>
      </section>

      {/* Experience Summary Section */}
      {stats && (
        <section className="py-12 px-4 text-left md:text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-green-400">Experience Summary</h3>
          <div className="flex flex-col md:flex-row md:justify-center gap-8 mt-4">
            <div>
              <p className="text-3xl font-bold text-green-400">4</p>
              <p className="text-white">Overall Years</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-400">{Array.isArray(stats.certifications_and_badges) ? stats.certifications_and_badges.length : 0}</p>
              <p className="text-white">Certifications & Badges</p>
            </div>
          </div>
          {/* Certifications List */}
          {Array.isArray(stats.certifications_and_badges) && stats.certifications_and_badges.length > 0 && (
            <ul className="bg-gray-800 p-4 rounded-lg text-white mt-6 max-w-xl mx-auto text-left text-sm space-y-1">
              {stats.certifications_and_badges.map((cert, idx) => (
                <li key={idx}>- {cert.title}</li>
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  )
}
