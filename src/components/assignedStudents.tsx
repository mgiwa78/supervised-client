import React, {useEffect, useState} from 'react'
import {PageTitle} from '../_metronic/layout/core'
import type {PageLink} from '../_metronic/layout/core'
import {KTIcon} from '../_metronic/helpers'
import get from '../lib/get'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/store'
import User from '../types/User'

import FormatDate from '../utils/FormatDate'
import {Spinner} from './Spinner'
import {Link} from 'react-router-dom'

const AssignedStudents = ({role = 'Users'}) => {
  const token = useSelector((state: RootState) => state.auth.token)
  const [isLoading, setIsLoading] = useState(false)
  const [students, setStudents] = useState([])

  useEffect(() => {
    setIsLoading(true)
    const getUsers = async () => {
      const RESPONSE = await get('users', token)
      setStudents(RESPONSE.data)
      setIsLoading(false)
    }
    getUsers()
  }, [token])

  return (
    <>
      <div className={`card mb-5 mb-xl-8`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>All Assigned Students</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>
              Total {role} {students ? students.length : ''}
            </span>
          </h3>
          {/*<div className='card-toolbar'>
            <button
              type='button'
              className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='top-end'
            >
              <KTIcon iconName='category' className='fs-2' />
            </button>
           <div
              className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-200px'
              data-kt-menu='true'
            >
              <div className='menu-item px-3'>
                <div className='menu-content fs-6 text-dark fw-bold px-3 py-4'>Quick Actions</div>
              </div>
              <div className='separator mb-3 opacity-75'></div>

              <div className='menu-item px-3'>
                <a onClick={() => handleModalUpdate(null)} className='menu-link px-3'>
                  New {role}
                </a>
              </div>

              <div className='separator mt-3 opacity-75'></div>

               <div className='menu-item px-3'>
                <div className='menu-content px-3 py-3'>
                  <a className='btn btn-primary btn-sm px-4' href='#'>
                    Generate Reports
                  </a>
                </div>
              </div> 
            </div>
          </div>*/}
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='w-25px'>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        value='1'
                        data-kt-check='true'
                        data-kt-check-target='.widget-13-check'
                      />
                    </div>
                  </th>
                  <th className='min-w-150px'>User Id</th>
                  <th className='min-w-140px'>Name</th>
                  <th className='min-w-120px'>Department</th>
                  {/* <th className='min-w-120px'>Roles</th> */}
                  <th className='min-w-120px'>Created At</th>
                  <th className='min-w-120px'>Role</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7}>
                      <div className='fv-row d-flex justify-content-center mh-300px'>
                        <Spinner />
                      </div>
                    </td>
                  </tr>
                ) : (
                  ''
                )}
                {students ? (
                  students.map((user: User) => {
                    return (
                      <tr key={user._id}>
                        <td>
                          <div className='form-check form-check-sm form-check-custom form-check-solid'>
                            <input
                              className='form-check-input widget-13-check'
                              type='checkbox'
                              value='1'
                            />
                          </div>
                        </td>
                        <td>
                          <span className='text-dark fw-bold text-hover-primary fs-6'>
                            {user._id}
                          </span>
                        </td>
                        <td>
                          <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                            {user.lastName} {user.firstName}
                          </span>
                          <span className='text-muted fw-semibold text-muted d-block fs-7'>
                            {user.email}
                          </span>
                        </td>
                        <td>
                          <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                            {user.department.name}
                          </span>
                        </td>
                        {/* <td>
                          <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'></span>
                        </td> */}
                        <td className='text-dark fw-bold text-hover-primary fs-6'>
                          {FormatDate(user.createdAt)}
                        </td>
                        <td>
                          {user.roles.map((e) => (
                            <span key={e._id} className='badge badge-light-success'>
                              {e.name}
                            </span>
                          ))}
                        </td>
                        <td className='text-end'>
                          {/* <a
                              href='#'
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                            >
                              <KTIcon iconName='switch' className='fs-3' />
                            </a> */}
                          <Link
                            to={`${user._id}`}
                            // onClick={() => handleModalUpdate(user)}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mr-1'
                          >
                            <KTIcon iconName='eye' className='fs-3' />
                          </Link>
                          {/* <a
                              href='#'
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                            >
                              <KTIcon iconName='trash' className='fs-3' />
                            </a> */}
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={7}>
                      <div className='fv-row d-flex justify-content-center mh-300px'>
                        <div className='h-40px w-40px spinner-border spinner-border-sm align-middle ms-2'></div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default AssignedStudents
