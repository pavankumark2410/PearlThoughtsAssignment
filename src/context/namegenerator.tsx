// ✅ UPDATED: namegenerator.tsx (with structured address + qualifications)
'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Users = {
  first: string
  last: string
  title: string
  email: string
  phone: string
  cell: string
  avatar: string
  dob: string
  age: number
  address?: {
    line1?: string
    city?: string
    state?: string
    country?: string
  }
  privateQualifications?: { name: string; rate: number }[]
  groupQualifications?: { name: string; rate: number }[]
}

const NameContext = createContext<Users | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Users | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('https://randomuser.me/api/')
        const data = await res.json()
        const u = data.results[0]

        const address = {
          line1: `${u.location.street.number} ${u.location.street.name}`,
          city: u.location.city,
          state: u.location.state,
          country: u.location.country
        }

        setUser({
          first: u.name.first,
          last: u.name.last,
          title: u.name.title,
          email: u.email,
          phone: u.phone,
          cell: u.cell,
          avatar: u.picture.thumbnail,
          dob: u.dob.date,
          age: u.dob.age,
          address,
          privateQualifications: [
            { name: 'Mathematics', rate: 50 },
            { name: 'Science', rate: 60 }
          ],
          groupQualifications: [
            { name: 'Group English', rate: 30 },
            { name: 'Group History', rate: 35 }
          ]
        })
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    }

    fetchUser()
  }, [])

  return (
    <NameContext.Provider value={user}>{children}</NameContext.Provider>
  )
}

export const useUser = () => useContext(NameContext)
