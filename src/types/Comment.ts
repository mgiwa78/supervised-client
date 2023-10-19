import User from './User'
import Document from './Document'

type TComment = {
  _id: string
  document: string | Document
  author: string | User
  createdAt: string
  content: string
  template: boolean
}

export default TComment
