import { useRouter } from 'next/router'
import Navigation from './Navigation'
import LetsConnectButton from '../ui/LetsConnectButton'

export default function Layout({ children }) {
  const router = useRouter()
  const isHomePage = router.pathname === '/'

  return (
    <div className="min-h-screen bg-black">
      {/* Show navigation on all pages except home */}
      {!isHomePage && <Navigation />}
      {/* Floating Let's Connect button on all pages */}
      <LetsConnectButton />
      {/* Add top padding for pages with navigation */}
      <main className={`${!isHomePage ? 'pt-16' : ''} bg-black`}>
        {children}
      </main>
    </div>
  )
} 