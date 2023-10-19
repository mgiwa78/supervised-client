import User from './User'
import Document from './Document'
import TComment from './Comment'

type TReviewSessions = {
  _id: string
  document: string
  comments: string | Array<TComment>
  supervisors: string | Array<TComment>
  createdAt: string
  updatedAt: string
}

export default TReviewSessions
