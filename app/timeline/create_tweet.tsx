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
        toast.success("Post has been created", { id: toastPostID })
        queryClient.invalidateQueries(['timeline'])
        setContent('')
        setIsDisabled(false)
      }
    }
  )

  const submitCreateTweet = async (event: React.FormEvent) => {
    event.preventDefault()
    setToastPostID(toast.loading("Creating your tweet"))

    setIsDisabled(true)
    mutate(content)
  }

  return (
    <form onSubmit={submitCreateTweet} className="bg-white p-4 border-b-4 border-twitter-extra-light-gray rounded-xl">
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
        <p className={`font-bold text-sm ${content.length > 150 ? "text-red-700" : "text-gray-700"}`}>{`${content.length}/150`}</p>

        <button
          disabled={isDisabled}
          type="submit"
          className="text-sm bg-twitter-blue hover:bg-twitter-dark-gray active:bg-twitter-gray text-white py-2 px-6 rounded-xl disabled:opacity-25 transition-colors duration-200">
            Create
        </button>
      </div>
    </form>
  )
}



// import { toast } from "react-hot-toast"

// export default function AddPost() {

//   // wasn't working with let
//   const [toastPostID, setToastPostID] = useState('')

//   // create a post
//   const { mutate } = useMutation(
//     async (title: string) => await fetch('/api/posts', {
//       method: 'POST',
//       body: JSON.stringify({ title: title })
//     }),

//     {
//       // not working
//       // onError: (error) => {
//       //   //if(error instanceof AxiosError) {
//       //     toast.error(error?.response?.data.message, { id: toastPostID })
//       //   //}
//       //   setIsDisabled(false)
//       // },
//       onSuccess: (data, variables, context) => {
//         if(data.status == 200) {
//           toast.success("Post has been created", { id: toastPostID })
//           queryClient.invalidateQueries(['posts'])
//           setTitle('')
//           setIsDisabled(false)
//         } else {
//           toast.error('Failed to create Post', { id: toastPostID })
//           setIsDisabled(false)
//         }
//       }
//     }
//   )

//   const submitPost = async (event: React.FormEvent) => {
//     event.preventDefault()
//     setToastPostID(toast.loading("Creating your post"))

//     setIsDisabled(true)
//     mutate(title)
//   }

//   )
// }