'use client'

import Image from "next/image"
import Link from "next/link"
import { TweetType } from "../types/Tweet";

type TweetProps = {
  tweet: TweetType
}

export default function TweetPreview({ tweet }: TweetProps) {
  const { id, content, createdAt, replies } = tweet
  const { name, image } = tweet.user

  let formattedCreatedAt = new Date(Date.parse(createdAt)).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="bg-white my-8 p-8 rounded-lg border-twitter-extra-light-gray border-b-8">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={image}
          alt="avatar"
        />
        <h3 className="font-bold twitter-black">
          {name}
        </h3>

        <h2 className="text-sm">
          {formattedCreatedAt}
        </h2>
      </div>

      <div className="my-8">
        <p className="break-all">{content}</p>
      </div>

      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/tweets/${id}`}>
          <p className="text-sm font-bold twitter-black">{replies?.length} Replies</p>
        </Link>
      </div>

      {/* TODO if user show delete button */}
    </div>
  )
}