import Head from 'next/head'
import Link from 'next/link'
import HeroSection from '../components/layout/HeroSection'

export default function Home() {
  return (
    <>
      <Head>
        <title>GiftPortfolio</title>
      </Head>
      <HeroSection />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Welcome to GiftPortfolio</h1>
        <nav className="mb-8 flex gap-4">
          <Link href="/projects">Projects</Link>
          <Link href="/skills">Skills</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/admin">Admin</Link>
        </nav>
        <section>
          <p>This is your portfolio homepage. Use the navigation above to explore the site.</p>
        </section>
      </main>
    </>
  )
}
