import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { trackPageView } from '../../lib/analyticsApi'

const AnalyticsContext = createContext()

export function AnalyticsProvider({ children }) {
  const router = useRouter()
  const [sessionId, setSessionId] = useState('')

  useEffect(() => {
    let sid = localStorage.getItem('session_id')
    if (!sid) {
      sid = crypto.randomUUID()
      localStorage.setItem('session_id', sid)
    }
    setSessionId(sid)
    trackPageView(router.asPath)

    const handleRouteChange = (url) => trackPageView(url)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [])

  const trackLinkClick = (linkType, url, projectId = null) => {
    return fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/analytics-tracker`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        type: 'click',
        data: { linkType, url, projectId, sessionId }
      }),
    })
  }

  return <AnalyticsContext.Provider value={{ trackLinkClick }}>{children}</AnalyticsContext.Provider>
}

export const useAnalytics = () => useContext(AnalyticsContext)
