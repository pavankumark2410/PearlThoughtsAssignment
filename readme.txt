A web application for managing teachers, student payments, and admin settings, with a modern UI and responsive design.

🧱 Built With:
Tech	Usage
Next.js (App Router)	Full app structure, routing, server/client separation
React + TypeScript	Component logic, props safety, state management
Tailwind CSS	Utility-first styling, mobile responsiveness
Context API	Theme settings (light/dark), user state
Lucide React	Icons (like the sidebar menu)

🗂️ Folder Structure Overview
css
Copy
Edit
app/
├─ layout.tsx             → Main layout (Topbar + Sidebar + Page content)
├─ page.tsx               → Home/Dashboard (optional)
├─ teachers/              → Teacher info page (with form/cards)
├─ payments/              → Student UPI/Payment form
├─ settings/              → Settings page (toggle theme etc.)
components/
├─ Sidebar.tsx            → Navigation sidebar (responsive)
├─ Topbar.tsx             → Header with page title
├─ ProfilePage/           → Teacher form & details layout
├─ upi/                   → Multi-mode payment form (UPI, Card, NetBanking)
context/
├─ namegenerator.tsx      → (UserContext or similar)
styles/
├─ globals.css            → Base Tailwind styles
🧑‍🏫 User Types Supported
Role	Can Do
Teacher	Fill out their profile, make payments (e.g., training, fines)
Admin	View teacher data, receive payments, update settings
Student	(Not yet implemented, but payment form simulates one)

📋 Key Features
🧑‍🏫 Teacher Profile
ProfilePage.tsx + Teacherform.tsx renders editable teacher info

Structured into responsive cards: Email, Phone, Address, Qualifications, etc.

💸 Payment Module
UPI / Card / NetBanking tabs

Fully client-side validated

Dynamically shows fields based on payment type

Flash message and alert on submission

⚙️ Settings Page
Lets user toggle Light/Dark theme

Automatically updates and stores choice in localStorage

📱 Mobile-First Design
Sidebar collapses into hamburger menu

Topbar adjusts spacing to prevent overlap

Layout adapts on all devices (via Tailwind sm:, md: classes)

🧠 Advanced Concepts Used
usePathname() from next/navigation → Highlight active sidebar link

ThemeContext via React Context API → Global theme control

lucide-react → Icon system for cleaner UI

localStorage for saving theme persistently

Conditional rendering for payment methods

🛠️ Possible Next Steps
✅ Connect to backend API (e.g., for saving profile data or payments)

🧾 Add student side + payment history
