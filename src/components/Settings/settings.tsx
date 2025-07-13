'use client'

import { useEffect, useState } from 'react'

export default function SettingPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Load stored theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (saved) {
      setTheme(saved)
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(saved)
    }
  }, [])

  // Apply theme on change
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center sm:text-left">Settings</h2>

      {/* Theme toggle */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 space-y-3 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold">Theme</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setTheme('light')}
            className={`w-full sm:w-auto px-4 py-2 rounded-xl border transition ${
              theme === 'light'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white'
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`w-full sm:w-auto px-4 py-2 rounded-xl border transition ${
              theme === 'dark'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white'
            }`}
          >
            Dark
          </button>
        </div>
      </div>

      {/* Add more settings below if needed */}
    </div>
  )
}
