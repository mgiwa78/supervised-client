import React, {useEffect, useMemo, useState} from 'react'
import {PageTitle} from '../_metronic/layout/core'
import type {PageLink} from '../_metronic/layout/core'
import {KTIcon} from '../_metronic/helpers'
import get from '../lib/get'
import {useSelector} from 'react-redux'
import {RootState} from '../redux/store'
import User from '../types/User'

import FormatDate from '../utils/FormatDate'
import {Spinner} from '../components/Spinner'
import {TProposal} from '../types/Proposal'
import {selectUser} from '../redux/selectors/auth'
import {Link} from 'react-router-dom'

type Proptypes = {
  role: string
  proposals: Array<TProposal>
  isLoading: boolean
}

const ProposalsTable = ({role = 'Proposals', proposals, isLoading}: Proptypes) => {
  //   const handleModalUpdate = (newuser: User | null) => {
  //     newuser ? setItemIdForUpdate(newuser._id) : setItemIdForUpdate(null)
  //     getProposals(newuser)
  //   }
  const currentUser = useSelector(selectUser)

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [filter, setFilter] = useState(0)
  const [pageSize, setPageSize] = useState(5)

  const handlePageClick = (page: any) => {
    setCurrentPage(page)
  }

  const filteredData = useMemo(() => {
    setCurrentPage(0)
    return proposals?.filter((proposal) =>
      Object.values(proposal).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(searchTerm.trim().toLowerCase())
      )
    )
  }, [proposals, searchTerm])

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
            <span className='card-label fw-bold fs-3 mb-1'>Proposals</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>
              Total {role} {proposals ? proposals.length : ''}
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
            {currentUser?.roles.some((role) => role.name === 'Student') && (
              <>
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
                    <div className='menu-content fs-6 text-dark fw-bold px-3 py-4'>
                      Quick Actions
                    </div>
                  </div>
                  <div className='separator mb-3 opacity-75'></div>

                  <div className='menu-item px-3'>
                    <a onClick={() => null} className='menu-link px-3'>
                      New Proposal
                    </a>
                  </div>

                  <div className='separator mt-3 opacity-75'></div>

                  {/* <div className='menu-item px-3'>
                <div className='menu-content px-3 py-3'>
                  <a className='btn btn-primary btn-sm px-4' href='#'>
                    Generate Reports
                  </a>
                </div>
              </div> */}
                </div>{' '}
              </>
            )}
          </div>
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
                  <th className='min-w-150px'>Id</th>
                  <th className='min-w-140px'>Title</th>
                  <th className='min-w-120px'>Status</th>
                  <th className='min-w-120px'>Submited</th>
                  {currentUser?.roles.some((role) => role.name === 'Faculty Admin') && (
                    <th className='min-w-120px'>Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {isLoading ? <Spinner /> : ''}
                {proposals ? (
                  paginatedData.map((proposal: TProposal) => {
                    return (
                      <tr key={proposal._id}>
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
                            {proposal._id}
                          </span>
                        </td>
                        <td>
                          <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                            {proposal.title}
                          </span>
                          <span className='text-muted fw-semibold text-muted d-block fs-7'>
                            {proposal.description}
                          </span>
                        </td>
                        <td>
                          <span className='badge badge-light-warning'>
                            {proposal.status || 'Pending'}
                          </span>
                        </td>
                        {/* <td>
                          <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'></span>
                        </td> */}
                        <td className='text-dark fw-bold text-hover-primary fs-6'>
                          {FormatDate(proposal.createdAt)}
                        </td>
                        {currentUser?.roles.some((role: any) => role.name === 'Faculty Admin') && (
                          <td className='text-end'>
                            <Link
                              to={`/facultyadmin/proposals/${proposal._id}`}
                              title='View'
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mr-1'
                            >
                              <KTIcon iconName='eye' className='fs-3' />
                            </Link>
                          </td>
                        )}
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <div className='fv-row d-flex justify-content-center mh-300px'>
                        <div className='h-40px w-40px spinner-border spinner-border-sm align-middle ms-2'></div>
                      </div>
                    </td>
                  </tr>
                )}
                {proposals.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={7}>
                      <div className='fv-row d-flex justify-content-center mh-300px'>
                        <div className='fv-row d-flex justify-content-center mh-300px fs-5 py-20'>
                          <span className='text-muted'> No Proposals</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>{' '}
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
                  <a
                    href='#'
                    className='page-link'
                    onClick={() => handlePageClick(currentPage - 1)}
                  >
                    <i className='previous'></i>
                  </a>
                </li>
                {paginationItems}
                <li
                  className={`page-item next ${currentPage === totalPages - 1 ? 'disabled' : ''}`}
                >
                  <a
                    href='#'
                    className='page-link'
                    onClick={() => handlePageClick(currentPage + 1)}
                  >
                    <i className='next'></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProposalsTable
