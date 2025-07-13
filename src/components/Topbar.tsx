'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Topbar() {
  const pathname = usePathname()

  const getTitle = () => {
    if (pathname === '/') return 'Dashboard'
    if (pathname.includes('/teacher')) return 'Teacher Management'
    return 'Teacher Management'
  }

  return (
    <header className="bg-orange-500 text-white px-6 py-4 shadow-md mb-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-wide pl-12 sm:pl-0">
          <Link href="/" className="hover:underline">
            {getTitle()}
          </Link>
        </h1>
      </div>
    </header>
  )
}
