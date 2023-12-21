import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {selectToken, selectUser} from '../../../redux/selectors/auth'
import TNotification from '../../../types/Notification'
import get from '../../../lib/get'
import {FormattedDate} from 'react-intl'
import {formatDistanceToNow} from 'date-fns'

const Notifications = () => {
  const token = useSelector(selectToken)
  const user = useSelector(selectUser)

  const [notifications, setNotifications] = useState<Array<TNotification>>()
  const getNotifications = async () => {
    const RESPONSE = await get(`notifications`, token)

    if (RESPONSE?.data) {
      setNotifications(RESPONSE.data)
    }
  }

  useEffect(() => {
    getNotifications()
  }, [user._id])

  return (
    <div className='card card-xl-stretch mb-5 mb-xl-8'>
      <div className='card-header border-0'>
        <h3 className='card-title fw-bold text-dark'>Notifications</h3>
        <div className='card-toolbar'>
          {notifications?.length >= 6 ? (
            <button
              type='button'
              className='btn   btn-color-primary btn-active-light-primary'
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
            >
              View All
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className='card-body pt-2'>
        {notifications ? (
          notifications?.slice(0, 6).map((notification) => (
            <div key={notification._id} className='d-flex align-items-center mb-8'>
              <span className={`bullet bullet-vertical h-40px bg-${notification?.color}`}></span>
              <div className='form-check form-check-custom form-check-solid mx-5'>
                <input className='form-check-input' type='checkbox' value='' />
              </div>
              <div className='flex-grow-1'>
                <a href='#' className='text-gray-800 text-hover-primary fw-bold fs-6'>
                  {notification?.title}
                </a>
                <span className='fs-8 text-muted fw-semibold d-block'>{notification?.message}</span>
                <span className='text-muted fw-semibold d-block'>
                  {formatDistanceToNow(new Date(notification?.createdAt), {addSuffix: true})}
                </span>
              </div>
              {/* <span className='badge badge-light-success fs-8 fw-bold'>New</span> */}
            </div>
          ))
        ) : (
          <div className='flex-grow-1'>
            <span className='text-muted fs-5 d-block'>No Notifications</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications
