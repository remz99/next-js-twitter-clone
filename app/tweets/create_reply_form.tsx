'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"

type ReplyProps = {
  id: string
}

type Reply = {
  tweetId?: string
  content: string
}

export default function CreateReplyForm({ id }: ReplyProps) {
  const [content, setContent] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)
  const [toastCommentID, setToastCommentID] = useState("")

  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    async (data: Reply) => axios.post(`/api/tweets/${id}/replies`, { data }),
    {
      onSuccess: data => {
        setContent("")
        setIsDisabled(false)
        toast.success("Reply created", { id: toastCommentID })
        queryClient.invalidateQueries(['tweet-detail'])
      },
      onError: (error) => {
        setIsDisabled(false)
        if(error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastCommentID })
        }
      }
    }
  )

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    setToastCommentID(toast.loading("Creating your Reply"))
    mutate({ content, tweetId: id })
  }

  return (
    <form onSubmit={submitComment} className="my-8 p-4 bg-twitter-extra-extra-light-gray rounded-xl">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          title="content"
          placeholder="Add Reply..."
          className="p-4 text-lg rounded-md my-2 bg-twitter-extra-extra-light-gray" />
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className={`font-bold text-sm ${content.length > 150 ? "text-red-700" : "twitter-black"}`}>{`${content.length}/150`}</p>

        <button
          disabled={isDisabled}
          type="submit"
          className="text-sm bg-blue-400 hover:bg-blue-600 text-white py-2 px-6 rounded-xl disabled:opacity-25">
            Add a Reply
        </button>
      </div>
    </form>
  )
}
