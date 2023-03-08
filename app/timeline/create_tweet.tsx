'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { toast } from "react-hot-toast"

export default function CreateTweet() {
  const [content, setContent] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const [toastPostID, setToastPostID] = useState('')

  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    async (content: string) => await axios.post('/api/tweets', { content: content }),
    {
      onError: (error) => {
        if(error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID })
        }
        setIsDisabled(false)
      },
      onSuccess: (data, variables, context) => {
        toast.success("Tweet created", { id: toastPostID })
        queryClient.invalidateQueries(['timeline'])
        setContent('')
        setIsDisabled(false)
      }
    }
  )

  const submitCreateTweet = async (event: React.FormEvent) => {
    event.preventDefault()
    setToastPostID(toast.loading("Creating Tweet"))

    setIsDisabled(true)
    mutate(content)
  }

  return (
    <form onSubmit={submitCreateTweet} className="p-4 border-b-4 border-twitter-extra-light-gray rounded-xl bg-twitter-extra-extra-light-gray">
      <div className="flex flex-col my-4">
        <textarea
          name="content"
          value={content}
          onChange={ (e) => setContent(e.target.value) }
          placeholder="What's happening?"
          className="p-4 text-lg bg-twitter-extra-extra-light-gray rounded-md my-2">
        </textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className={`font-bold text-sm ${content.length > 150 ? "text-red-700" : "twitter-black"}`}>{`${content.length}/150`}</p>

        <button
          disabled={isDisabled}
          type="submit"
          className="text-sm bg-blue-400 hover:bg-blue-600 active:bg-twitter-gray text-white py-2 px-6 rounded-xl disabled:opacity-25 transition-colors duration-200">
            Tweet
        </button>
      </div>
    </form>
  )
}