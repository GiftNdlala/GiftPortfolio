import Link from 'next/link'
import { useAnalytics } from '../analytics/AnalyticsProvider'

export default function TrackedLink({ href, children, linkType, projectId, ...props }) {
  const { trackLinkClick } = useAnalytics()

  const handleClick = async (e) => {
    if (trackLinkClick && linkType) {
      try {
        await trackLinkClick(linkType, href, projectId)
      } catch (error) {
        console.error('Failed to track link click:', error)
      }
    }
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
