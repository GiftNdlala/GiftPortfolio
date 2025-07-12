import '../styles/globals.css'
import { AnalyticsProvider } from '../components/analytics/AnalyticsProvider'
import Layout from '../components/layout/Layout'
import { useEffect } from 'react'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement
      if (!localStorage.getItem('theme')) {
        root.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      }
    }
  }, [])
  return (
    <AnalyticsProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AnalyticsProvider>
  )
}
