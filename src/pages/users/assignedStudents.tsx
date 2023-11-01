import React from 'react'
import Users from '../../modules/users/users'
import {PageLink, PageTitle} from '../../_metronic/layout/core'
import AssignedStudents from '../../components/assignedStudents'

type Props = {}
const assignedStudentsBreadcrumbs: Array<PageLink> = [
  {
    title: 'User Management',
    path: '/students/assignedStudents',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]
const AllAssignedStudents = (props: Props) => {
  const role = 'Assigned Students'
  return (
    <div>
      <PageTitle breadcrumbs={assignedStudentsBreadcrumbs}>Assigned Students list</PageTitle>
      <AssignedStudents role={role} />
    </div>
  )
}

export default AllAssignedStudents
