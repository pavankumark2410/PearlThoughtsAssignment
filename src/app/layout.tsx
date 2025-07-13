import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/Sidebar"
import Topbar from "@/components/Topbar"
import { UserProvider } from "@/context/namegenerator"
import BCRUMB from "@/components/BreadCrumb"
import ProfilePage from "@/components/Profilepage/ProfilePage"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Teacher Management Portal",
  description: "Modern interface for managing teachers and payments",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <div className="min-h-screen flex flex-col">
            <Topbar />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
                <div className="space-y-6">
                  <BCRUMB />
                  
                </div>
                <div className="mt-4">{children}</div>

              </main>

            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  )
}
