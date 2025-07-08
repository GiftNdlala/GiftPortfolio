import { supabase } from './supabaseClient'

export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      id, title, slug, summary, thumbnail_url, github_url, live_url,
      is_featured, start_date, end_date
    `)
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('end_date', { ascending: false })

  if (error) throw error
  return data
}

export async function getProjectBySlug(slug) {
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
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) throw error

  const skills = data.project_skills.map(ps => ({
    id: ps.skills.id,
    name: ps.skills.name,
    icon_url: ps.skills.icon_url,
    category: {
      id: ps.skills.tech_categories.id,
      name: ps.skills.tech_categories.name
    }
  }))

  const sortedImages = data.project_images.sort((a, b) => a.sort_order - b.sort_order)

  return {
    ...data,
    project_skills: undefined,
    project_images: sortedImages,
    skills
  }
}
