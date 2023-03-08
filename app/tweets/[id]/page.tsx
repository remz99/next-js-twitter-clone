'use client'

import Tweet from "../tweet"
import { TweetType } from "@/app/types/Tweet"

import { useQuery } from "@tanstack/react-query"

import axios from "axios"
import Image from "next/image"

import Reply from "../reply"

import CreateReplyForm from "../create_reply_form"

type URL = {
  params: {
    id: string
  }
}

const fetchDetails = async (id: string) => {
  const response = await axios.get(`/api/tweets/${id}`)
  return response.data
}

export default function TweetDetail(url: URL) {
  const { data, isLoading } = useQuery<TweetType>({
    queryKey: ['tweet-detail'],
    queryFn: () => fetchDetails(url.params.id)
  })

  if(isLoading) return 'Loading...'

  return (
    <div>
      <Tweet tweet={data} />

      <CreateReplyForm id={data.id} />

      <div className="my-8 flex items-center gap-4 text-white before:h-px before:flex-1 before:bg-twitter-extra-light-gray  before:content-[''] after:h-px after:flex-1 after:bg-twitter-extra-light-gray  after:content-['']">
        Replies
      </div>

      {
        data?.replies.map((reply: ReplyType) => <Reply key={reply.id} reply={reply} /> )
      }
    </div>
  )
}
