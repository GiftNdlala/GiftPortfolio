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
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-between bg-black text-white px-6 py-16 overflow-hidden">
      {/* Matrix Rain Animation - only on desktop */}
      <div className="hidden md:block absolute left-[32%] right-[32%] top-0 bottom-0 z-0 pointer-events-none" style={{minWidth: '300px'}}>
        <MatrixRain />
      </div>
      {/* Top right: Theme toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
      {/* Left: Text */}
      <div className="z-10 flex-1 max-w-xl md:mr-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
          <span className="block text-gray-400 dark:text-gray-300">Hello<span className="text-green-500">.</span></span>
          I'm <span className="text-green-600">Gift Ndlala</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-green-500 mb-6">Software Developer</h2>
        {/* Stats Summary */}
        {stats && (
          <div className="mb-8 p-4 bg-gray-50 dark:bg-white/10 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-white/20">
            <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-300">Experience Summary</h3>
            <div className="flex gap-6 items-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">4</div>
                <div className="text-xs text-gray-500 dark:text-gray-300">Overall Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {Array.isArray(stats.certifications_and_badges) ? stats.certifications_and_badges.length : 0}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300">Certifications & Badges</div>
              </div>
              {/* Certifications List */}
              {Array.isArray(stats.certifications_and_badges) && stats.certifications_and_badges.length > 0 && (
                <div className="ml-4 max-w-xs w-full">
                  <div className="text-xs text-green-700 dark:text-green-200 mb-1 font-semibold">Certifications & Badges</div>
                  <div className="bg-gray-100 dark:bg-gray-900/70 rounded px-2 py-1 max-h-24 overflow-y-auto border border-green-400/30 text-xs text-gray-800 dark:text-gray-100 space-y-1">
                    {stats.certifications_and_badges.map((cert, idx) => (
                      <div key={idx} className="truncate" title={cert.title}>{cert.title}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="flex gap-4 mb-8">
          <a
            href="#"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded shadow transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get a project
          </a>
          <a
            href="#"
            className="bg-transparent border border-green-500 hover:bg-green-500 hover:text-white text-green-600 font-semibold py-2 px-5 rounded shadow transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            My resume
          </a>
        </div>
        <div className="flex gap-4">
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
      </div>
      {/* Right: Profile Image with Accent Circle */}
      <div className="relative flex-1 flex justify-center md:justify-end mt-12 md:mt-0 z-10">
        <div className="relative z-10">
          <img
            src="/images/profile-picture.jpg"
            alt="Gift Ndlala profile"
            className="w-72 h-72 md:w-[26rem] md:h-[26rem] rounded-full border-4 border-green-500 shadow-xl object-cover"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[28rem] md:h-[28rem] rounded-full bg-gradient-to-tr from-green-500/30 via-green-400/10 to-transparent blur-2xl z-0" />
      </div>
      {/* Decorative lines/arrows (optional) */}
      <div className="hidden md:block absolute left-0 top-1/2 w-24 h-1 bg-green-500/40 rounded-full -translate-y-1/2" />
      <div className="hidden md:block absolute right-0 top-1/2 w-24 h-1 bg-green-500/40 rounded-full -translate-y-1/2" />
    </section>
  )
}
