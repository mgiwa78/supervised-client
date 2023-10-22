/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {PageLink, PageTitle} from '../../_metronic/layout/core'

const Dashboard: FC = () => <></>

const StudentDashboard: FC = () => {
  const studentDahboard: Array<PageLink> = [
    {
      title: 'Home',
      path: '/',
      isSeparator: false,
      isActive: false,
    },
    {
      title: 'Student Dahboard',
      path: '/dashboard',
      isSeparator: true,
      isActive: false,
    },
  ]
  return (
    <>
      <PageTitle breadcrumbs={studentDahboard}>Student Dashboard</PageTitle>
      <Dashboard />
    </>
  )
}

export {StudentDashboard}
