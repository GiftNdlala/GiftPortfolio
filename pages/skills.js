import { useState, useEffect } from 'react'
import { getSkills, getCategories } from '../lib/portfolioApi'

export default function SkillsPage() {
  const [skills, setSkills] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchSkillsData() {
      try {
        setLoading(true)
        const [skillsData, categoriesData] = await Promise.all([
          getSkills(),
          getCategories()
        ])
        
        setSkills(skillsData.skills || skillsData || [])
        setCategories(categoriesData.categories || categoriesData || [])
      } catch (err) {
        console.error('Error fetching skills:', err)
        setError('Failed to load skills')
      } finally {
        setLoading(false)
      }
    }

    fetchSkillsData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-8 bg-black text-white">
        <h1 className="text-3xl font-bold mb-6">Skills & Technologies</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 bg-black text-white">
        <h1 className="text-3xl font-bold mb-6">Skills & Technologies</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    )
  }

  // Group skills by category
  const skillsByCategory = categories.reduce((acc, category) => {
    acc[category.id] = {
      ...category,
      skills: skills.filter(skill => skill.category_id === category.id)
    }
    return acc
  }, {})

  return (
    <div className="container mx-auto p-8 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Skills & Technologies</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.values(skillsByCategory).map((category) => (
          <div key={category.id} className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-orange-600">{category.name}</h2>
            <div className="space-y-3">
              {category.skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {skill.icon_url && (
                      <img 
                        src={skill.icon_url} 
                        alt={skill.name}
                        className="w-6 h-6"
                      />
                    )}
                    <span className="font-medium text-gray-200">{skill.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-3 h-3 rounded-full ${
                          level <= (skill.proficiency_level || 0)
                            ? 'bg-orange-500'
                            : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No skills found.</p>
        </div>
      )}
    </div>
  )
}
