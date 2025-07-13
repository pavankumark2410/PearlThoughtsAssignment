'use client'
import { useUser } from '@/context/namegenerator'
import { UserIcon } from 'lucide-react'

export const myname="Pavan K"
export default function BCRUMB() {
  const myuser = useUser()

  if (!myuser) return <p className="text-sm text-gray-400">Loading user...</p>

return (
  <div className="flex items-center justify-between text-gray-800 text-sm mb-4">
    <div className="flex items-center space-x-1">
      <span className="text-blue-600 font-medium">Teachers</span>
      <span>/</span>
      <span className="flex items-center space-x-1">
        {/* <span>{myuser.first} {myuser.last}</span> */}
        <span>{myname}</span>
        <UserIcon className="w-4 h-4 text-gray-500" />
      </span>
    </div>
  </div>
)
}
