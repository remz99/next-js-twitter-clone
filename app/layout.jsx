import './globals.css'

import NavBar from './navbar/page'

import { Roboto } from "next/font/google"

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
      <body className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable}} bg-twitter-blue`}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}