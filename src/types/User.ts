import Department from './Department'
import Role from './Role'

type User = {
  _id: string
  email: string
  avatar?: string
  firstName: string
  department: Department
  createdAt: string
  contactNumber: string
  password?: string
  lastName: string
  roles?: Array<Role>
  rolesState?: any
  notification: {
    email: boolean
  }
}
export type UserEdit = {
  _id?: string
  email?: string
  avatar?: string
  contactNumber?: string

  firstName?: string
  department?: string
  createdAt?: string
  password?: string
  lastName?: string
  roles?: Array<Role>
  rolesState?: any
  notification: {
    email: boolean
  }
}

export default User
