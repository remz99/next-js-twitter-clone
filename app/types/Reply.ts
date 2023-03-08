export type ReplyType = {
  id: string
  content: string
  updatedAt?: string
  user: {
    id: string
    image: string
    email: string
    name: string
  }
}