import './globals.css'

import NavBar from './navbar/page'

import { Roboto } from "next/font/google"

import QueryWrapper from './queryWrapper'

import Sidebar from './sidebar/page'

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
})

export const metadata = {
  title: 'Twitter Clone',
  description: 'Created With Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex min-h-screen flex-col ${roboto.variable}} bg-twitter-blue`}>
        <div className="flex flex-1 flex-row">
          <nav className="w-1/5 text-white h-12 py-4 invisible xl:visible">
            { /* Unused left sidebar */ }
          </nav>

          <main className="w-3/5 h-auto">
            <QueryWrapper>
              <NavBar />
              {children}
            </QueryWrapper>
          </main>

          <aside className="w-1/5 invisible xl:visible">
            <Sidebar />
          </aside>
        </div>
      </body>
    </html>
  )
}
