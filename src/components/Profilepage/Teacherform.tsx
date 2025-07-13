'use client'
import { useUser } from '@/context/namegenerator'
import { validateTeacherFields } from '../../app/validations/validations'
import { useState, useEffect } from 'react'

export default function TeacherInfo() {
  const myuser = useUser()

  const [name, setName] = useState('')
  const [role, setRole] = useState('Teacher')
  const [birthDate, setBirthDate] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [line1, setLine1] = useState('')
  const [city, setCity] = useState('')
  const [stateLoc, setStateLoc] = useState('')
  const [country, setCountry] = useState('')

  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState({
    name: '',
    role: '',
    birthDate: '',
  })

  useEffect(() => {
    if (myuser) {
      setName(`${myuser.first} ${myuser.last}`)
      setBirthDate(myuser.dob?.slice(0, 10) || '')
      setEmail(myuser.email || '')
      setPhone(myuser.phone || '')
      setLine1(myuser.address?.line1 || '')
      setCity(myuser.address?.city || '')
      setStateLoc(myuser.address?.state || '')
      setCountry(myuser.address?.country || '')
    }
  }, [myuser])

  if (!myuser) return <p>Loading user...</p>

  const handleToggleEdit = () => {
    if (isEditing) {
      const validation = validateTeacherFields({ name, role, birthDate })
      setErrors(validation)
      const hasErrors = Object.values(validation).some((err) => err !== '')
      if (hasErrors) return
    }
    setIsEditing(!isEditing)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Teacher Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:[grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] gap-4 p-6">

        {/* Details Card */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h2 className="font-semibold text-md">Details</h2>
            <button onClick={handleToggleEdit} className="text-blue-600 underline text-sm">
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>

          <div className="space-y-2 text-sm">
            <div>
              <label className="block font-medium">Name:</label>
              <input
                value={name}
                readOnly={!isEditing}
                onChange={(e) => setName(e.target.value)}
                className={`border p-2 rounded w-full ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div>
              <label className="block font-medium">Role:</label>
              <input
                value={role}
                readOnly={!isEditing}
                onChange={(e) => setRole(e.target.value)}
                className={`border p-2 rounded w-full ${errors.role ? 'border-red-500' : ''}`}
              />
              {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}
            </div>

            <div>
              <label className="block font-medium">Birth Date:</label>
              <input
                type="date"
                value={birthDate}
                readOnly={!isEditing}
                onChange={(e) => setBirthDate(e.target.value)}
                className={`border p-2 rounded w-full ${errors.birthDate ? 'border-red-500' : ''}`}
              />
              {errors.birthDate && <p className="text-red-500 text-xs">{errors.birthDate}</p>}
            </div>
          </div>
        </div>

        {/* Email Card */}
        <div className="bg-white p-4 border rounded shadow">
          <h2 className="font-semibold border-b pb-2 mb-2">Email</h2>
          <input
            type="email"
            value={email}
            readOnly={!isEditing}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full text-sm"
          />
        </div>

        {/* Phone Card */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold border-b pb-2 mb-2">Phone</h2>
          <input
            type="text"
            value={phone}
            readOnly={!isEditing}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded w-full text-sm"
          />
        </div>

        {/* Address Card */}
        <div className="bg-white p-4 rounded shadow space-y-2">
          <h2 className="font-semibold border-b pb-2 mb-2">Address</h2>

          <div>
            <label className="block text-sm font-medium">Line 1</label>
            <input
              type="text"
              value={line1}
              readOnly={!isEditing}
              onChange={(e) => setLine1(e.target.value)}
              className="border p-2 rounded w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              type="text"
              value={city}
              readOnly={!isEditing}
              onChange={(e) => setCity(e.target.value)}
              className="border p-2 rounded w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">State</label>
            <input
              type="text"
              value={stateLoc}
              readOnly={!isEditing}
              onChange={(e) => setStateLoc(e.target.value)}
              className="border p-2 rounded w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Country</label>
            <input
              type="text"
              value={country}
              readOnly={!isEditing}
              onChange={(e) => setCountry(e.target.value)}
              className="border p-2 rounded w-full text-sm"
            />
          </div>
        </div>

        {/* Private Qualifications */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h2 className="font-semibold text-md">Private Qualifications</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1">Name</th>
                <th className="text-left py-1">Rate ($/hr)</th>
              </tr>
            </thead>
            <tbody>
              {(myuser.privateQualifications && myuser.privateQualifications.length > 0) ? (
                myuser.privateQualifications.map((q, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-1">{q.name}</td>
                    <td className="py-1">${q.rate}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={2}>No data</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Group Qualifications */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h2 className="font-semibold text-md">Group Qualifications</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1">Name</th>
                <th className="text-left py-1">Rate ($/hr)</th>
              </tr>
            </thead>
            <tbody>
              {(myuser.groupQualifications && myuser.groupQualifications.length > 0) ? (
                myuser.groupQualifications.map((q, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-1">{q.name}</td>
                    <td className="py-1">${q.rate}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={2}>No data</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
