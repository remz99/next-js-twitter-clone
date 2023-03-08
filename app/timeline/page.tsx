'use client'

import { useQuery } from "@tanstack/react-query"

import axios from "axios"
import { TweetType } from "../types/Tweet"

import CreateTweet from "./create_tweet"

import Tweet from "../tweets/tweet"

import Image from "next/image"

const allTweets = async () => {
  const response = await axios.get("/api/tweets")
  return response.data
}

export default function Timeline() {
  const { data, error, isLoading } = useQuery<TweetType>({
    queryFn: allTweets,
    queryKey: ["timeline"],
  })
  if (error) return error
  if (isLoading) {
    return (
      <div className="flex justify-center my-20">
        <Image
          height={128}
          width={128}
          src="loading-spinner.svg"
          alt="Loader"
        />
      </div>
    )
  }

  return (
    <>
      <CreateTweet />

      {
        data?.map((tweet: TweetType) => <Tweet key={tweet.id} tweet={tweet} />)
      }
    </>
  )
}
