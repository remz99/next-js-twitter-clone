'use client'

import { useQuery } from "@tanstack/react-query"

import axios from "axios"
import React, { useState } from "react"
import { TweetType } from "../types/Tweet"


import { useEffect } from "react"

import Tweet from "../tweets/tweet"

const searchTweets = async (queryTerm: string) => {
  const response = await axios.get("/api/tweets/search", { params: { query: queryTerm }})
  return response.data
}

// todo not quite working correctly
// figure out the timeout with searching
// querying with no value should return nothing
//
export default function Timeline() {
  const [queryTerm, setQueryTerm] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)

  const { data, error, isLoading, refetch } = useQuery<TweetType>({
    queryFn: () => searchTweets(queryTerm),
    queryKey: [""],
  })

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetch(queryTerm)
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [queryTerm])

  const changeHandler = async (event: React.FormEvent) => {
    event.preventDefault

    const target = event.target as HTMLTextAreaElement;
    setQueryTerm(target.value)
  }

  { if(isLoading) return "Loading Search..." }

  return (
    <>
      <div className="mx-auto max-w-xs">
        <input
          onChange={changeHandler}
          value={queryTerm}
          disabled={isDisabled}
          type="text"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
          placeholder="Search Tweets"
        />
      </div>

      { data?.map((tweet: TweetType) => {
        return (
          <Tweet key={tweet.id} tweet={tweet} />
        )
      })}
    </>
  )
}
