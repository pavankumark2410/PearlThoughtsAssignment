'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Hamburger Icon - mobile only */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-900 text-white p-2 rounded-md"
          aria-label="Toggle Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed sm:static top-0 left-0 z-40 h-full w-60 bg-gray-900 text-white shadow-md p-6 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:block`}
      >
        {/* Push content down on mobile so it doesn't get covered by the icon */}
        <div className="pt-12 sm:pt-0">
          <h4 className="text-gray-200 font-bold text-2xl mb-6">Admin Panel</h4>
          <ul className="space-y-4">
            <li>
              <Link
                href="/teachers"
                className={`block font-semibold ${
                  pathname === '/teachers' ? 'text-blue-500' : 'text-gray-300'
                } hover:underline`}
                onClick={() => setIsOpen(false)}
              >
                Class Teacher
              </Link>
            </li>
            <li>
              <Link
                href="/payments"
                className={`block font-semibold ${
                  pathname === '/payments' ? 'text-blue-500' : 'text-gray-300'
                } hover:underline`}
                onClick={() => setIsOpen(false)}
              >
                Payment As Student
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className={`block font-semibold ${
                  pathname === '/settings' ? 'text-blue-500' : 'text-gray-300'
                } hover:underline`}
                onClick={() => setIsOpen(false)}
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}
