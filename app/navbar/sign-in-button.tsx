'use client'

import { signIn } from 'next-auth/react'

export default function SignInButton(){
  return (
    <li className='list-none'>
      <button
        className='text-sm bg-twitter-blue text-white py-2 px-6 rounded-xl disabled:opacity-25 hover:bg-twitter-dark-gray active:bg-twitter-gray'
        onClick={() => signIn() }
      >
        Sign In
      </button>
    </li>
  )
}