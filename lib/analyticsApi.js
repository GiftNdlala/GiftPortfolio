export async function trackPageView(path, projectId = null) {
  let sessionId = localStorage.getItem('session_id')
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    localStorage.setItem('session_id', sessionId)
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/analytics-tracker`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      type: 'pageview',
      data: { path, projectId, referrer: document.referrer, sessionId }
    })
  })
  return response.json()
}

export async function trackLinkClick(linkType, url, projectId = null) {
  const sessionId = localStorage.getItem('session_id') || crypto.randomUUID()
  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/analytics-tracker`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      type: 'click',
      data: { linkType, url, projectId, sessionId }
    })
  })
  return response.json()
}
