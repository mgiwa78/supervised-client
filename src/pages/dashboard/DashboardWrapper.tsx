/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../_metronic/helpers'
import {PageTitle} from '../../_metronic/layout/core'

import {useSelector} from 'react-redux'
import {selectAuth} from '../../redux/selectors/auth'
import {AdminDashboard} from '../../modules/dashboard/AdminDashboard'
import {StudentDashboard} from '../../modules/dashboard/StudentDashboard'
import {SupervisorDashboard} from '../../modules/dashboard/InstructorDashboard'
import {FacultyAdminDashboard} from '../../modules/dashboard/FacultyAdmin'

const DashboardPage: FC = () => {
  const auth = useSelector(selectAuth)
  console.log(auth.user)
  return (
    <>
      {auth.user?.roles.some((role) => role.name === 'Superadmin') ? <AdminDashboard /> : ''}
      {auth.user?.roles.some((role) => role.name === 'Student') ? <StudentDashboard /> : ''}
      {auth.user?.roles.some((role) => role.name === 'Supervisor') ? <SupervisorDashboard /> : ''}
      {auth.user?.roles.some((role) => role.name === 'Faculty Admin') ? (
        <FacultyAdminDashboard />
      ) : (
        ''
      )}
    </>
  )
}
const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
