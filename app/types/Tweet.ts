export type TweetType = {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  user: {
    id: string
    image: string
    email: string
    name: string
  }
  replies: TweetType[]
}