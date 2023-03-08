'use client'

import { useQuery } from "@tanstack/react-query"

import axios from "axios"
import React, { useState } from "react"
import { TweetType } from "../types/Tweet"
import { useEffect } from "react"
import Tweet from "../tweets/tweet"
import SearchResult from "./search_result"
import Image from "next/image"

const searchTweets = async (searchTerm: string) => {
  const response = await axios.get("/api/tweets/search", { params: { query: searchTerm }})
  return response.data
}

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const [results, setResults] = useState([])
  const [showLoading, setShowLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setResults([])

    if(searchTerm.length) {
      setShowLoading(true)
      setIsDisabled(true)

      const results = searchTweets(searchTerm)
      setResults(await results)
      setShowLoading(false)
      setIsDisabled(false)
    }
  }

  return (
    <div className="mx-4 py-6 border-l-4 h-full">
      <div className="mx-auto max-w-xs">
        <form onSubmit={handleSubmit} className="p-4">

          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <Image
                height={16}
                width={16}
                className=""
                src="magnifying-glass.svg"
                alt="magnifying-glass"
              />
            </span>

            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value) }
              className="h-10 px-6 pr-5 pl-8 w-full rounded-xl text-sm focus:outline-none bg-purple-white shadow rounded border-0 placeholder:italic placeholder:twitter-extra-light-gray"
              placeholder="Search"
            />

          </label>


        </form>
      </div>

      <div className="my-2 mx-10">
        <div className="flex justify-center">
          { showLoading &&
              <Image
                height={128}
                width={128}
                src="loading-spinner.svg"
                alt="Loader"
              />
          }
        </div>

        <div className="flex flex-col">
          {
            results?.map((tweet: TweetType) => <SearchResult key={tweet.id} tweet={tweet} />)
          }
        </div>
      </div>
    </div>
  )
}
