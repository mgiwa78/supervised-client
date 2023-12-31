/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import {useSelector} from 'react-redux'
import {RootState} from '../../../../../redux/store'

const SidebarMenuMain = () => {
  const intl = useIntl()
  const currentUser = useSelector((state: RootState) => state.auth.user)

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      {currentUser?.roles.some((role) => role.name === 'Superadmin') && (
        <SidebarMenuItem to='/builder' icon='switch' title='Layout Builder' fontIcon='bi-layers' />
      )}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Menu</span>
        </div>
      </div>{' '}
      {currentUser?.roles.some(
        (role) => role.name === 'Superadmin' || role.name === 'Faculty Admin'
      ) && (
        <SidebarMenuItemWithSub to='/users' title='Users' fontIcon='bi-people' icon='profile-user'>
          <>
            {currentUser?.roles.some((role) => role.name === 'Superadmin') && (
              <>
                <SidebarMenuItem to='/users/all' title='All' hasBullet={true} />
                <SidebarMenuItem to='/users/roles' title='Roles' hasBullet={true} />
                <SidebarMenuItem to='/users/permissions' title='Permissions' hasBullet={true} />
              </>
            )}
            {currentUser?.roles.some((role) => role.name === 'Faculty Admin') && (
              <>
                <SidebarMenuItem to='/users/supervisors' title='Supervisors' hasBullet={true} />
                <SidebarMenuItem to='/users/students' title='Students' hasBullet={true} />
              </>
            )}
          </>
        </SidebarMenuItemWithSub>
      )}
      {/* //

Projects

//   */}
      <SidebarMenuItemWithSub to='/project' title='Projects' fontIcon='bi-people' icon='document'>
        <>
          {currentUser?.roles.some((role) => role.name === 'Student') && (
            <>
              <SidebarMenuItem to='/project/my' title='All' hasBullet={true} />
            </>
          )}
          {currentUser?.roles.some((role) => role.name === 'Supervisor') && (
            <>
              <SidebarMenuItem to='/project/assigned' title='Projects' hasBullet={true} />
            </>
          )}

          {currentUser?.roles.some(
            (role) => role.name === 'Superadmin' || role.name === 'Faculty Admin'
          ) && (
            <>
              <SidebarMenuItem to='/project/all' title='All' hasBullet={true} />
              <SidebarMenuItem to='/project/Create' title='Create' hasBullet={true} />
            </>
          )}
        </>
      </SidebarMenuItemWithSub>
      {/* //

Proposal

//   */}
      {currentUser?.roles.some(
        (role) => role.name === 'Student' || role.name === 'Faculty Admin'
      ) && (
        <SidebarMenuItemWithSub to='/proposal' title='Proposal' fontIcon='bi-people' icon='file'>
          <>
            {currentUser?.roles.some((role) => role.name === 'Student') && (
              <>
                <SidebarMenuItem to='/proposals/my' title='All' hasBullet={true} />
                <SidebarMenuItem to='/proposals/submit' title='Submit ' hasBullet={true} />
              </>
            )}
            {currentUser?.roles.some((role) => role.name === 'Faculty Admin') && (
              <>
                <SidebarMenuItem
                  to='/facultyadmin/proposals/submitted'
                  title='All'
                  hasBullet={true}
                />
              </>
            )}
          </>
        </SidebarMenuItemWithSub>
      )}
      {currentUser?.roles.some((role) => role.name === 'Superadmin') && (
        <SidebarMenuItem to='/workflow' title='Workflow' fontIcon='bi-chart' icon='chart' />
      )}
      {currentUser?.roles.some((role) => role.name === 'Supervisor') && (
        <>
          <SidebarMenuItem
            to='/students/assignedStudents'
            title='Students'
            fontIcon='bi-profile'
            icon='people'
          ></SidebarMenuItem>
        </>
      )}
      {/* <SidebarMenuItemWithSub to='/account' title='Account' fontIcon='bi-user' icon='user'>
        <SidebarMenuItem to='/account/overview' title='Overview' hasBullet={true} />
        <SidebarMenuItem to='/account/edit' title='Edit' hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      <SidebarMenuItem to='/help-center' title='Help center' fontIcon='bi-chart' icon='chart' />
    </>
  )
}

export {SidebarMenuMain}
