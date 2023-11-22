import React, {useEffect, useMemo, useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../_metronic/helpers'
import {Link, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {TProject} from '../types/Project'
import {selectAuth, selectUser} from '../redux/selectors/auth'
import get from '../lib/get'
import {Spinner} from '../components/Spinner'
import {PageLink, PageTitle} from '../_metronic/layout/core'
import FormatDate from '../utils/FormatDate'
type Props = {
  projects: Array<TProject>
  setProjects: Function
  isLoading: boolean
  setIsLoading: Function
}

const Projects = ({projects, setProjects, isLoading, setIsLoading}: Props) => {
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
    return projects?.filter((project) =>
      Object.values(project).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(searchTerm.trim().toLowerCase())
      )
    )
  }, [projects, searchTerm])

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
    <div style={{minHeight: '100%', position: 'relative'}}>
      <div className='d-flex flex-wrap flex-stack my-5' data-select2-id='select2-data-121-rgid'>
        <h2>Projects</h2>
        <div className='d-flex flex-wrap my-1'>
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
      <div className='row g-6 g-xl-9'>
        <>
          {projects.length > 0 &&
            projects.map((project) => {
              if (!project) return ''
              const student =
                typeof project.student === 'object' ? project.student._id : project.student

              return (
                <div className='col-md-6 col-xl-4'>
                  <Link
                    to={
                      currentUser?.roles.some((role) => role.name === 'Supervisor') &&
                      `/students/assignedStudents/${student}/project/${project._id}`
                    }
                    className='card border-hover-primary'
                  >
                    <div className='card-header border-0 pt-9'>
                      <div className='card-title m-0'>
                        <div className='symbol symbol-50px w-50px bg-light'>
                          <span className='symbol-label bg-secondary text-inverse-secondary fw-bold'>
                            {project?.title[0]}
                          </span>
                        </div>
                      </div>
                      <div className='card-toolbar'>
                        <span
                          className={`badge  fw-bold me-auto px-4 py-3`}
                          style={{backgroundColor: project?.status?.title}}
                        >
                          {project?.status?.title}
                        </span>
                      </div>
                    </div>

                    <div className='card-body p-9'>
                      <div className='fs-3 fw-bold text-dark'>{project?.title}</div>
                      <p className='text-gray-400 fw-semibold fs-5 mt-1 mb-7'>
                        {project?.description}
                      </p>
                      <div className='d-flex flex-wrap mb-5'>
                        <div className='border border-gray-300 border-dashed rounded min-w-120px py-3 px-4 me-7 mb-3'>
                          <div className='fs-6 text-gray-800 fw-bold'>
                            {project?.createdAt ? FormatDate(project?.createdAt) : '-----'}
                          </div>
                          <div className='fw-semibold text-gray-400'>Created Date</div>
                        </div>
                        <div className='border border-gray-300 border-dashed rounded min-w-120px py-3 px-4 mb-3'>
                          <div className='fs-6 text-gray-800 fw-bold'>{project?.files.length}</div>
                          <div className='fw-semibold text-gray-400'>Documents</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          {!projects && isLoading && (
            <div className='fv-row d-flex justify-content-center mh-300px'>
              <div className='h-40px w-40px spinner-border spinner-border-sm align-middle ms-2'></div>
            </div>
          )}
          {projects.length === 0 && !isLoading && (
            <div className='fv-row d-flex justify-content-center mh-300px fs-5 py-20'>
              <span className='text-muted'> No Projects</span>
            </div>
          )}
        </>
      </div>{' '}
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
  )
}

export default Projects
