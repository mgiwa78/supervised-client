/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {PageLink, PageTitle} from '../../_metronic/layout/core'
import {UserAnalytics} from './components/UserAnalytics'
import {useSelector} from 'react-redux'
import {selectAuth} from '../../redux/selectors/auth'
import Role from '../../types/Role'
import get from '../../lib/get'

type RolesData = {
  role: Role
  countUsers: number
}

const Dashboard: FC = () => {
  const [roles, setRoles] = useState<Array<RolesData>>([])
  const {token} = useSelector(selectAuth)

  useEffect(() => {
    const getRoles = async () => {
      try {
        if (token) {
          const RESPONSE = await get('roles/withUsers', token)
          setRoles(RESPONSE.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getRoles()
  }, [token])

  return (
    <>
      <div className='row g-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xl-4'>
          <UserAnalytics
            className='card-xl-stretch mb-xl-8'
            chartColor='primary'
            chartHeight='150px'
            data={roles}
          />
        </div>
      </div>
    </>
  )
}

const AdminDashboard: FC = () => {
  const adminDahboard: Array<PageLink> = [
    {
      title: 'Home',
      path: '/',
      isSeparator: false,
      isActive: false,
    },
    {
      title: 'Admin Dahboard',
      path: '/dashboard',
      isSeparator: true,
      isActive: false,
    },
  ]
  return (
    <>
      <PageTitle breadcrumbs={adminDahboard}>Admin Dashboard</PageTitle>
      <Dashboard />
    </>
  )
}

export {AdminDashboard}
