'use client'

import Image from 'next/image'
import { signOut } from 'next-auth/react'

import Link from 'next/link'

type User = {
  image: string
}

export default function UserNav({ image }: User) {
  const handleClick = () => {
    signOut()
  }

  return (
    <li className="flex gap-8 items-center">
      <Image
        width={64}
        height={64}
        src={image}
        alt='user-image'
        className='rounded-full cursor-pointer'
        onClick={handleClick}
      />
    </li>
  )
}