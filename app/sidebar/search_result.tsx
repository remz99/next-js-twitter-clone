'use client'

import Image from "next/image"
import Link from "next/link"
import { TweetType } from "../types/Tweet";

type TweetProps = {
  tweet: TweetType
}

export default function SearchResult({ tweet }: TweetProps) {
  const { id, content } = tweet
  const { name, image } = tweet.user

  return (
    <Link href={`/tweets/${id}`}>
      <div className="bg-white my-2 p-2 rounded-xl">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            width={16}
            height={16}
            src={image}
            alt="avatar"
          />
          <h3 className="font-bold twitter-black">
            {name}
          </h3>
        </div>

        <div className="my-2">
          <p className="break-all">{content}</p>
        </div>
      </div>
    </Link>
  )
}