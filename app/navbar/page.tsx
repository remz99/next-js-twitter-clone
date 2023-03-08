import Link from "next/link";

import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../pages/api/auth/[...nextauth]'

import SignInButton from "./sign-in-button";
import UserNav from "./user-nav";

export default async function NavBar() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={'/'}>
        <h1 className="font-bold text-lg">Twitter Clone</h1>
      </Link>

      <ul className="flex items-center gap-6">
        {
          session?.user ? <UserNav image={session.user?.image || ""} /> : <SignInButton />
        }
      </ul>
    </nav>
  )
}