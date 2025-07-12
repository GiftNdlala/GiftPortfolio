import { supabase } from './supabaseClient'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!SUPABASE_URL) {
  console.error('NEXT_PUBLIC_SUPABASE_URL is not defined')
}

if (!SUPABASE_ANON_KEY) {
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined')
}

// Base function to call Edge Functions
async function callEdgeFunction(functionName, options = {}) {
  // Make sure SUPABASE_URL is correctly defined and doesn't have a trailing slash
  const supabaseUrl = SUPABASE_URL?.replace(/\/$/, '') || ''
  
  // Ensure the URL is properly formatted
  const url = `${supabaseUrl}/functions/v1/${functionName}`
  
  // Debug logging
  console.log('Calling Edge Function:', {
    functionName,
    url,
    supabaseUrl: SUPABASE_URL,
    hasAnonKey: !!SUPABASE_ANON_KEY
  })
  
  try {
    const response = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  })

  if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error calling ${functionName}:`, error)
    throw error
  }
}

// Portfolio API functions using database functions
export async function getProjects() {
  console.log('Fetching projects using database function...')
  
  try {
    // Use the get_projects database function
    const { data, error } = await supabase
      .rpc('get_projects', {
        _featured_only: false
      })
    
    if (error) {
      console.error('Database function error:', error)
      throw error
    }
    
    console.log('Projects data:', data)
    
    return { projects: data }
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw error
  }
}

export async function getFeaturedProjects() {
  console.log('Fetching featured projects...')
  
  try {
    // Use the get_projects database function with featured_only = true
    const { data, error } = await supabase
      .rpc('get_projects', {
        _featured_only: true
      })
    
    if (error) {
      console.error('Database function error:', error)
      throw error
    }
    
    console.log('Featured projects data:', data)
    
    return { projects: data }
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    throw error
  }
}

export async function getProjectBySlug(slug) {
  console.log('Fetching project by slug:', slug)
  
  try {
    // Use the get_project_by_slug database function
    const { data, error } = await supabase
      .rpc('get_project_by_slug', {
        _slug: slug
      })
    
    if (error) {
      console.error('Database function error:', error)
      throw error
    }
    
    console.log('Project data:', data)
    
    // The function returns an array, but we want a single project
    const project = data && data.length > 0 ? data[0] : null
    
    return { project }
  } catch (error) {
    console.error('Error fetching project by slug:', error)
    throw error
  }
}

export async function getProjectWithSkills(slug) {
  console.log('Fetching project with skills:', slug)
  
  try {
    // Use the get_project_with_skills database function
    const { data, error } = await supabase
      .rpc('get_project_with_skills', {
        project_slug: slug
      })
    
    if (error) {
      console.error('Database function error:', error)
      throw error
    }
    
    console.log('Project with skills data:', data)
    
    // The function returns an array, but we want a single project
    const project = data && data.length > 0 ? data[0] : null
    
    return { project }
  } catch (error) {
    console.error('Error fetching project with skills:', error)
    throw error
  }
}

export async function getProjectById(id) {
  console.log('Fetching project by ID:', id)
  
  try {
    // Use direct query for get by ID since there's no specific function
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        project_images (id, image_url, caption, sort_order),
        project_skills!inner (
          skills!inner (
            id, name, icon_url, category_id,
            tech_categories!inner (id, name)
          )
        )
      `)
      .eq('id', id)
      .eq('is_published', true)
      .single()
    
    if (error) {
      console.error('Database error:', error)
      throw error
    }
    
    console.log('Project by ID data:', data)
    
    return { project: data }
  } catch (error) {
    console.error('Error fetching project by ID:', error)
    throw error
  }
}

export async function getSkills() {
  console.log('Fetching skills by category...')
  
  try {
    // Use the get_skills_by_category database function
    const { data, error } = await supabase
      .rpc('get_skills_by_category')
    
    if (error) {
      console.error('Database function error:', error)
      throw error
    }
    
    console.log('Skills by category data:', data)
    
    // Transform the data to match the expected format
    const skills = data.flatMap(category => 
      category.skills.map(skill => ({
        ...skill,
        category: {
          id: category.category_id,
          name: category.category_name,
          description: category.category_description,
          icon_url: category.category_icon_url
        }
      }))
    )
    
    return { skills }
  } catch (error) {
    console.error('Error fetching skills:', error)
    throw error
  }
}

export async function getCategories() {
  console.log('Fetching tech categories...')
  
  try {
    // Direct query for categories
    const { data, error } = await supabase
      .from('tech_categories')
      .select('id, name, description, icon_url')
      .order('name')
    
    if (error) {
      console.error('Database error:', error)
      throw error
    }
    
    console.log('Categories data:', data)
    
    return { categories: data }
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export async function getProfile() {
  console.log('Fetching profile...')
  
  try {
    // Direct query for profile - get first profile if multiple exist
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('Database error:', error)
      throw error
    }
    
    // Get the first profile if multiple exist
    const profile = data && data.length > 0 ? data[0] : null
    
    console.log('Profile data:', profile)
    
    return { profile }
  } catch (error) {
    console.error('Error fetching profile:', error)
    throw error
  }
}

export async function submitContactForm(formData) {
  console.log('Submitting contact form...')
  
  try {
    // Insert into messages table
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        created_at: new Date().toISOString()
      }])
      .select()
    
    if (error) {
      console.error('Database error:', error)
      throw error
    }
    
    console.log('Contact form submitted:', data)
    
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    throw error
  }
}

// Additional utility functions
export async function getAllProjectsWithSkills() {
  console.log('Fetching all projects with skills...')
  
  try {
    // Use the get_all_projects_with_skills database function
    const { data, error } = await supabase
      .rpc('get_all_projects_with_skills', {
        include_unpublished: false
      })
    
    if (error) {
      console.error('Database function error:', error)
      throw error
    }
    
    console.log('All projects with skills data:', data)
    
    return { projects: data }
  } catch (error) {
    console.error('Error fetching all projects with skills:', error)
    throw error
  }
} 

export async function getStats() {
  const { data, error } = await supabase
    .from('stats')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  if (error) throw error;
  return data;
} 