import React, {useEffect, useMemo, useState} from 'react'
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

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [filter, setFilter] = useState(0)
  const [pageSize, setPageSize] = useState(5)

  const handlePageClick = (page: any) => {
    setCurrentPage(page)
  }

  const filteredData = useMemo(() => {
    setCurrentPage(0)
    return students?.filter((student) =>
      Object.values(student).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(searchTerm.trim().toLowerCase())
      )
    )
  }, [students, searchTerm])

  const paginatedData = useMemo(() => {
    const startIndex = currentPage * pageSize
    return filteredData.slice(startIndex, startIndex + pageSize)
  }, [filteredData, currentPage, pageSize])

  const totalPages = Math.ceil(filteredData?.length / pageSize)

  const paginationItems = []

  for (let i = 0; i < totalPages; i++) {
    paginationItems.push(
      <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
        <button className='page-link' onClick={() => handlePageClick(i)}>
          {i + 1}
        </button>
      </li>
    )
  }
  return (
    <>
      <div className={`card mb-5 mb-xl-8`} style={{minHeight: '100%', position: 'relative'}}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>All Assigned Students</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>
              Total {role} {students ? students.length : ''}
            </span>
          </h3>
          <div className='card-toolbar'>
            <div className='d-flex align-items-center position-relative me-4'>
              <i className='ki-duotone ki-magnifier fs-3 position-absolute ms-3'>
                <span className='path1'></span>
                <span className='path2'></span>
              </i>
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                type='text'
                id='kt_filter_search'
                className='form-control form-control-sm form-control-solid w-150px ps-10'
                placeholder='Search'
              />
            </div>
          </div>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-140px'>Name</th>
                  <th className='min-w-150px'>Student Id</th>
                  <th className='min-w-120px'>Department</th>
                  {/* <th className='min-w-120px'>Roles</th> */}
                  <th className='min-w-120px'>Role</th>
                  <th className='min-w-100px text-center'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={7}>
                      <div className='fv-row d-flex justify-content-center mh-300px'>
                        <Spinner />
                      </div>
                    </td>
                  </tr>
                )}
                {students ? (
                  students.map((user: User) => {
                    return (
                      <tr key={user._id}>
                        <td>
                          <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                            {user.lastName} {user.firstName}
                          </span>
                          <span className='text-muted fw-semibold text-muted d-block fs-7'>
                            {user.email}
                          </span>
                        </td>
                        <td>
                          <span className='text-dark fw-bold text-hover-primary fs-6'>
                            {user?.studentId}
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
                        <td>
                          {user.roles.map((e) => (
                            <span key={e._id} className='badge badge-light-success'>
                              {e.name}
                            </span>
                          ))}
                        </td>
                        <td className='text-center'>
                          {/* <a
                              href='#'
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                            >
                              <KTIcon iconName='switch' className='fs-3' />
                            </a> */}
                          <Link
                            to={`${user._id}`}
                            // onClick={() => handleModalUpdate(user)}
                            className='btn btn-primary  btn-sm me-1 mr-1'
                          >
                            <KTIcon iconName='some-files' className='fs-3 mx-1' />

                            <span className='indicator-label'>View Projects </span>
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
        <div className='d-flex' style={{position: 'absolute', bottom: '20px', right: '20px'}}>
          <select
            name='status'
            data-control='select2'
            data-hide-search='true'
            className='form-select form-select-sm form-select-solid w-80px select2-hidden-accessible'
            tabIndex={-1}
            aria-hidden='true'
            data-kt-initialized='1'
            onChange={(e) => {
              setCurrentPage(0)
              setPageSize(Number(e.target.value))
            }}
            defaultValue={pageSize}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <ul className='pagination'>
            <li className={`page-item previous ${currentPage === 0 ? 'disabled' : ''}`}>
              <a href='#' className='page-link' onClick={() => handlePageClick(currentPage - 1)}>
                <i className='previous'></i>
              </a>
            </li>
            {paginationItems}
            <li className={`page-item next ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
              <a href='#' className='page-link' onClick={() => handlePageClick(currentPage + 1)}>
                <i className='next'></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default AssignedStudents
