'use client'

import Image from "next/image"
import { ReplyType } from "../types/Reply"

export default function Reply({ reply }: ReplyType) {
  const { id, content, createdAt } = reply
  const { name, image } = reply.user

  let formattedCreatedAt = new Date(Date.parse(createdAt)).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div key={reply.id} className="my-6 bg-white p-8 rounded-md">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={24}
          height={24}
          src={image}
          alt="avatar"
        />

        <h3 className="font-bolt">{name}</h3>
        <h2 className="text-sm">{formattedCreatedAt}</h2>
      </div>

      <div className="py-4">
        {content}
      </div>
    </div>
  )
}