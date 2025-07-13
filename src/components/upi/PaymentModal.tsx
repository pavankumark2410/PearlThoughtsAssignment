'use client'
import {  useEffect } from 'react'
import { myname } from '../BreadCrumb'
import { useState } from "react"
import { useUser } from '@/context/namegenerator'
export default function UPIPaymentForm() {
 const myuser = useUser()  
 const [step, setStep] = useState<1 | 2>(1)
 

  // Step 1 fields
  const [name, setName] = useState("")
  const [teacher,setTeacher] = useState("")
  const [purpose, setPurpose] = useState("")
  const [amount, setAmount] = useState("")

  // Step 2 fields
  const [method, setMethod] = useState<'upi' | 'card' | 'netbanking'>('upi')
  const [upiId, setUpiId] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [ifsc, setIFSC] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [error, setError] = useState("")
  const [flashMessage, setFlashMessage] = useState<string | null>(null)

  
  useEffect(() => {
    if (myuser) {
      setTeacher(`${myuser.first} ${myuser.last}`)
      setName(myname)
          }
  }, [myuser])
  const validateStepOne = () => {
    if (!name || !teacher || !purpose || !amount || Number(amount) <= 0) {
      setError("Please fill all the fields correctly.")
      return false
    }
    return true
  }

  const handlePay = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Enter a valid amount.")
      return
    }

    if (method === "upi") {
      if (!upiId || !upiId.includes("@")) {
        setError("Enter a valid UPI ID.")
        return
      }
      setFlashMessage(`✅ ₹${amount} paid via UPI to ${upiId}`)
    } else if (method === "card") {
      if (!cardNumber || cardNumber.length < 12) {
        setError("Enter a valid card number.")
        return
      }
      setFlashMessage(`✅ ₹${amount} paid via Card ending ${cardNumber.slice(-4)}`)
    } else if (method === "netbanking") {
      if (!ifsc || !accountNumber) {
        setError("Enter valid IFSC and account number.")
        return
      }
      setFlashMessage(`✅ ₹${amount} paid via NetBanking to A/C ${accountNumber}`)
    }

    setError("")
    setTimeout(() => setFlashMessage(null), 3000)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">
        {step === 1 ? 'Enter Payment Details' : 'Select Payment Method'}
      </h2>

      {/* ✅ Flash Message */}
      {flashMessage && (
        <div className="p-3 rounded-lg bg-green-100 text-green-800 font-medium border border-green-300 shadow-sm">
          {flashMessage}
        </div>
      )}

      {step === 1 && (
        <>
          <div>
            <label className="block text-sm font-medium">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="mt-1 w-full p-2 border rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Teacher Name</label>
            <input
              type="text"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              placeholder="Mr. Sharma"
              className="mt-1 w-full p-2 border rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Purpose</label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Tuition fees"
              className="mt-1 w-full p-2 border rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100"
              className="mt-1 w-full p-2 border rounded-xl"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={() => {
              if (validateStepOne()) {
                setError("")
                setStep(2)
              }
            }}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Next: Choose Payment Method
          </button>
        </>
      )}

      {step === 2 && (
        <>
          {/* Payment Method Switcher */}
          <div className="flex justify-center gap-2">
            {['upi', 'card', 'netbanking'].map((type) => (
              <button
                key={type}
                onClick={() => setMethod(type as any)}
                className={`px-4 py-2 rounded-xl border capitalize ${
                  method === type ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Payment Fields */}
          {method === 'upi' && (
            <div>
              <label className="block text-sm font-medium">UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="example@upi"
                className="mt-1 w-full p-2 border rounded-xl"
              />
            </div>
          )}

          {method === 'card' && (
            <div>
              <label className="block text-sm font-medium">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="XXXX XXXX XXXX"
                className="mt-1 w-full p-2 border rounded-xl"
              />
            </div>
          )}

          {method === 'netbanking' && (
            <>
              <div>
                <label className="block text-sm font-medium">Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="1234567890"
                  className="mt-1 w-full p-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">IFSC Code</label>
                <input
                  type="text"
                  value={ifsc}
                  onChange={(e) => setIFSC(e.target.value)}
                  placeholder="SBIN0001234"
                  className="mt-1 w-full p-2 border rounded-xl"
                />
              </div>
            </>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handlePay}
            className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
          >
            Pay ₹{amount}
          </button>
        </>
      )}
    </div>
  )
}
