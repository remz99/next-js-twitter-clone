'use client'

import Image from "next/image"
import { ReplyType } from "../types/Reply"

export default function Reply({ reply }: ReplyType) {

  return (
    <div key={reply.id} className="my-6 bg-white p-8 rounded-md">
      <div className="flex items-center gap-2">
        <Image
          width={24}
          height={24}
          src={reply.user?.image}
          alt="avatar"
        />

        <h3 className="font-bolt">{reply.user.name}</h3>
        <h2 className="text-sm">{reply.createdAt}</h2>
      </div>
      <div className="py-4">
        {reply.content}
      </div>
    </div>
  )
}