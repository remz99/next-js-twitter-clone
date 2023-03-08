'use client'

import { signIn } from 'next-auth/react'

export default function SignInButton(){
  return (
    <li className='list-none'>
      <button
        className='text-sm bg-blue-400 hover:bg-blue-600 text-white py-2 px-6 rounded-xl disabled:opacity-25 active:bg-twitter-gray'
        onClick={() => signIn() }
      >
        Sign In
      </button>
    </li>
  )
}