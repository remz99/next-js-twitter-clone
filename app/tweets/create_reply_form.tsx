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
        toast.success("Reply has been created", { id: toastCommentID })
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
    setToastCommentID(toast.loading("Adding your Comment"))
    mutate({ content, tweetId: id })
  }

  return (
    <form onSubmit={submitComment} className="my-8">
      <h3>Add a Reply</h3>

      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setContent(e.target.value)}
          value={content}
          type="text"
          title="title"
          placeholder="Add content..."
          className="p-4 text-lg rounded-md my-2" />
      </div>

      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          type="submit"
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25">
            Add a Reply
        </button>
        <p className={`font-bold text-sm ${content.length > 150 ? "text-red-700" : "text-gray-700"}`}>{`${content.length}/300`}</p>
      </div>
    </form>
  )
}
