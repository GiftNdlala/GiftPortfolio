import { useState, useEffect } from 'react'
import { getProfile, getStats } from '../lib/portfolioApi'
import TrackedLink from '../components/ui/TrackedLink'

export default function AboutPage() {
  const [profile, setProfile] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const profileData = await getProfile()
        setProfile(profileData.profile || profileData)
        const statsData = await getStats()
        setStats(statsData)
      } catch (err) {
        console.error('Error fetching profile or stats:', err)
        setError('Failed to load profile or stats')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Profile information not available.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8 bg-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            {profile.profile_image_url ? (
              <img
                src={profile.profile_image_url}
                alt={profile.full_name || 'Profile'}
                className="w-32 h-32 rounded-full mx-auto border-4 border-green-500 shadow-lg object-cover"
              />
            ) : (
              <img
                src="/images/profile-picture.png"
                alt={profile.full_name || 'Profile'}
                className="w-32 h-32 rounded-full mx-auto border-4 border-green-500 shadow-lg object-cover"
              />
            )}
          </div>
          <h1 className="text-4xl font-bold mb-4">{profile.full_name || 'Gift Ndlala'}</h1>
          <h2 className="text-2xl text-green-600 dark:text-green-400 mb-6">{profile.title || 'Software Developer'}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {profile.bio || 'Passionate software developer with expertise in full-stack development and modern technologies.'}
          </p>
        </div>

        {/* Stats Section */}
        {stats && (
          <div className="bg-gray-800 rounded-lg shadow-md p-8 mb-8 border border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-green-400">Stats & Certifications</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="mb-2 text-lg font-semibold">Years of Experience</div>
                <div className="flex gap-6">
                  <div className="bg-green-900/30 rounded-lg px-4 py-2 text-center">
                    <div className="text-2xl font-bold text-green-400">4</div>
                    <div className="text-xs text-gray-300">Overall Years</div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-2 text-lg font-semibold">Certifications & Badges</div>
                <ul className="space-y-4">
                  {Array.isArray(stats.certifications_and_badges) && stats.certifications_and_badges.map((cert, idx) => (
                    <li key={idx} className="bg-gray-900/70 rounded-lg px-4 py-2">
                      <div className="font-bold text-green-300">{cert.title}</div>
                      <div className="text-xs text-gray-400 mb-1">{cert.issuer} &middot; {cert.issued_on}</div>
                      <div className="text-sm text-gray-200">{cert.description}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-gray-800 rounded-lg shadow-md p-8 mb-8 border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-green-400">Get In Touch</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.email && (
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${profile.email}`} className="text-gray-200 hover:text-green-400">
                  {profile.email}
                </a>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-200">{profile.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-gray-800 rounded-lg shadow-md p-8 mb-8 border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-green-400">Connect With Me</h3>
          <div className="flex flex-wrap gap-4">
            {profile.github_url && (
              <TrackedLink 
                href={profile.github_url} 
                linkType="github"
                className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.012-1.243-.018-2.25-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.92.43.372.823 1.104.823 2.225 0 1.606-.015 2.898-.015 3.293 0 .322.216.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </TrackedLink>
            )}
            {profile.linkedin_url && (
              <TrackedLink 
                href={profile.linkedin_url} 
                linkType="linkedin"
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                </svg>
                <span>LinkedIn</span>
              </TrackedLink>
            )}
            {profile.resume_url && (
              <TrackedLink 
                href={profile.resume_url} 
                linkType="resume"
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Resume</span>
              </TrackedLink>
            )}
          </div>
        </div>

        {/* Additional Information */}
        {profile.additional_info && (
          <div className="bg-gray-800 rounded-lg shadow-md p-8 border border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-green-400">More About Me</h3>
            <div className="prose max-w-none text-gray-200">
              {profile.additional_info}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
