import User from './User'
import TWorkflow from './Workflow'

export interface TProject {
  title: string
  _id: string
  createdAt: string
  description: string
  student: User
  files: Array<{
    name: string
    path: string
  }>
  supervisor: string | User
  keywords: string[]
  completionDate: Date
  category: string
  methodology: string
  resources: string[]
  ethicalConsiderations: string
  milestones: {name: string; date: Date}[]
  status: TWorkflow
  comments: string
}
