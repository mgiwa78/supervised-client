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
              <SidebarMenuItem to='/users/supervisors' title='Supervisors' hasBullet={true} />
            )}
          </>
        </SidebarMenuItemWithSub>
      )}
      <SidebarMenuItemWithSub
        to='/documents'
        title='Documents'
        fontIcon='bi-people'
        icon='document'
      >
        <>
          {currentUser?.roles.some((role) => role.name === 'Student') && (
            <>
              <SidebarMenuItem to='/documents/my' title='My Documents' hasBullet={true} />
              <SidebarMenuItem to='/documents/create' title='Create' hasBullet={true} />{' '}
              <SidebarMenuItem
                to='/documents/reviewSessions/student'
                title='Review Sessions'
                hasBullet={true}
              />
            </>
          )}
          {currentUser?.roles.some((role) => role.name === 'Supervisor') && (
            <>
              <SidebarMenuItem to='/documents/assigned' title='Assigned' hasBullet={true} />
              <SidebarMenuItem
                to='/documents/reviewSessions/supervisor'
                title='Review Sessions'
                hasBullet={true}
              />
            </>
          )}

          {currentUser?.roles.some(
            (role) => role.name === 'Superadmin' || role.name === 'Faculty Admin'
          ) && (
            <>
              <SidebarMenuItem to='/documents/all' title='All Documents' hasBullet={true} />
            </>
          )}
        </>
      </SidebarMenuItemWithSub>
    </>
  )
}

export {SidebarMenuMain}
