import Link from 'next/link'

// Basic TrackedLink component. You can expand this to add analytics later.
export default function TrackedLink({ href, children, ...props }) {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}
