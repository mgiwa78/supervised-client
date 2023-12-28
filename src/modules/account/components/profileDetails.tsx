import React from 'react'
import User from '../../../types/User'
import {KTIcon} from '../../../_metronic/helpers'

import {PDFDownloadLink} from '@react-pdf/renderer'
import UserProfile from '../../../pdf-export/user-profile'

type PropTypes = {
  profile: User
}
const ProfileDetails = ({profile}: PropTypes) => {
  return (
    <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
      <div className='card-header cursor-pointer'>
        <div className='card-title m-0'>
          <h3 className='fw-bold m-0'>Profile Details</h3>
        </div>

        <div className='card-toolbar d-flex gap-2'>
          <a href='edit' className='btn btn-sm btn-primary align-self-center '>
            Edit Profile
          </a>
          <PDFDownloadLink document={<UserProfile user={profile} />} fileName='user-profile.pdf'>
            {({blob, url, loading, error}) =>
              loading ? (
                'Loading document...'
              ) : (
                <button className='btn btn-sm btn-light-primary'>
                  <KTIcon iconName='file-down' className='fs-2' />
                  Export
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
      <div className='card-body p-9'>
        <div className='row mb-7'>
          <label className='col-lg-4 fw-semibold text-muted'>First Name</label>
          <div className='col-lg-8'>
            <span className='fw-bold fs-6 text-gray-800'>{profile?.firstName}</span>
          </div>
        </div>
        <div className='row mb-7'>
          <label className='col-lg-4 fw-semibold text-muted'>Last Name</label>
          <div className='col-lg-8'>
            <span className='fw-bold fs-6 text-gray-800'>{profile?.lastName}</span>
          </div>
        </div>
        <div className='row mb-7'>
          <label className='col-lg-4 fw-semibold text-muted'>Department</label>
          <div className='col-lg-8 fv-row'>
            <span className='fw-semibold text-gray-800 fs-6'>{profile?.department.name}</span>
          </div>
        </div>
        <div className='row mb-7'>
          <label className='col-lg-4 fw-semibold text-muted'>
            Email
            <span
              className='ms-1'
              data-bs-toggle='tooltip'
              aria-label='Phone number must be active'
              data-bs-original-title='Phone number must be active'
              data-kt-initialized='1'
            >
              <i className='ki-duotone ki-information fs-7'>
                <span className='path1'></span>
                <span className='path2'></span>
                <span className='path3'></span>
              </i>
            </span>
          </label>
          <div className='col-lg-8 d-flex align-items-center'>
            <span className='fw-bold fs-6 text-gray-800 me-2'>{profile?.email}</span>
            <span className='badge badge-success'>Verified</span>
          </div>
        </div>
        <div className='row mb-7'>
          <label className='col-lg-4 fw-semibold text-muted'>
            Email Notification
            <span
              className='ms-1'
              data-bs-toggle='tooltip'
              aria-label='Phone number must be active'
              data-bs-original-title='Phone number must be active'
              data-kt-initialized='1'
            >
              <i className='ki-duotone ki-information fs-7'>
                <span className='path1'></span>
                <span className='path2'></span>
                <span className='path3'></span>
              </i>
            </span>
          </label>
          <div className='col-lg-8 d-flex align-items-center'>
            <span className={`badge badge-${profile?.notification.email ? 'success' : 'warning'}`}>
              {profile?.notification.email ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>

        <div className='row mb-7'>
          <label className='col-lg-4 fw-semibold text-muted'>Role</label>
          <div className='col-lg-8'>
            <a href='#' className='fw-semibold fs-6 text-gray-800 text-hover-primary'>
              {profile?.roles.map((role) => role.name)}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetails
