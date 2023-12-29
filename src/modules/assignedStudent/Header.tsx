/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../_metronic/helpers'
import {Link, useLocation, useParams} from 'react-router-dom'
import {Dropdown1} from '../../_metronic/partials'
import {useSelector} from 'react-redux'
import {selectToken} from '../../redux/selectors/auth'
import get from '../../lib/get'
import User from '../../types/User'
import {Spinner} from '../../components/Spinner'
import {PageLink, PageTitle} from '../../_metronic/layout/core'
import {TProject} from '../../types/Project'
import TDocument from '../../types/Document'

type propType = {
  setViewDoc: Function
}

const StudentOverviewHeader = ({setViewDoc}: propType) => {
  const token = useSelector(selectToken)
  const {studentId, projectId} = useParams()

  const assignedStudentBreadcrumbs: Array<PageLink> = [
    {
      title: 'Assigned Student',
      path: '/students/assignedStudent',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  const [student, setStudent] = useState<User | null>(null)
  const [project, setProject] = useState<TProject | null>(null)
  const [isLoading, setisLoading] = useState<boolean>(false)

  useEffect(() => {
    setisLoading(true)
    const getStudent = async () => {
      setisLoading(true)
      const RESPONSE = await get(`users/${studentId}`, token)
      if (RESPONSE?.data) setStudent(RESPONSE.data)
    }
    const getProject = async () => {
      setisLoading(true)

      const RESPONSE = await get(`projects/${projectId}`, token)
      if (RESPONSE?.data) setProject(RESPONSE.data)
    }

    setisLoading(true)
    getStudent()
    getProject()
    setisLoading(false)
  }, [token, studentId, projectId])

  return (
    <>
      <PageTitle breadcrumbs={assignedStudentBreadcrumbs}>All Documents </PageTitle>
      <div className='card mb-5 mb-xl-10'>
        <div
          className='card-header border-0 cursor-pointer'
          role='button'
          data-bs-toggle='collapse'
          data-bs-target='#kt_account_profile_details'
          aria-expanded='true'
          aria-controls='kt_account_profile_details'
        >
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Project Workflow</h3>
          </div>
        </div>

        <div id='kt_account_profile_details' className='collapse show border-top pt-2'>
          {isLoading && (
            <div className='fv-row d-flex justify-content-center mh-300px'>
              <div className='h-40px w-40px spinner-border spinner-border-sm align-middle ms-2'></div>
            </div>
          )}
          {student && student._id && (
            <div className='card-body'>
              <div className='row'>
                {/* <div className='col-3'>
                <div className='menu-content d-flex align-items-center '>
                  <div className='symbol symbol-50px me-5'>
                    <img
                      alt='Logo'
                      src={
                        student?.avatar
                          ? student?.avatar
                          : toAbsoluteUrl('/media/avatars/blank.png')
                      }
                    />
                  </div>

                  <div className='d-flex flex-column'>
                    <span className='fw-bold'>
                      {student?.lastName} {student?.firstName}
                    </span>
                    {student?.roles.map((e) => (
                      <div key={e._id} className='badge badge-light-info d-inline'>
                        {e.name}
                      </div>
                    ))}
                    <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
                      {student?.email}
                    </a>
                  </div>
                </div>
                <div className='py-5 fs-6'>
                  <div className='fw-bold mt-5'>Student ID</div>
                  <div className='text-gray-600'>{student._id}</div>
                  <div className='fw-bold mt-5'>Department</div>
                  <div className='text-gray-600'>{student.department.name}</div>

                  <div className='fw-bold mt-5'>Email</div>
                  <div className='text-gray-600'>
                    <a href='#' className='text-gray-600 text-hover-primary'>
                      {student.email}
                    </a>
                  </div>

                  <div className='fw-bold mt-5'>Project Title</div>
                  <div className='text-gray-600'>
                    <a href='#' className='text-gray-600 text-hover-primary'>
                      {project?.title}
                    </a>
                  </div>
                </div>
              </div> */}
                {project?.workflow?.states.map((state) => (
                  <div key={state._id} className='col-3'>
                    <div
                      style={{backgroundColor: state.color}}
                      className={`d-flex flex-stack fs-4 py-3 px-2 `}
                    >
                      <div
                        className='fw-bold rotate cursor-pointer'
                        data-bs-toggle='collapse'
                        role='button'
                        aria-expanded='false'
                        data-bs-target={`#${state._id}`}
                        aria-controls={`${state._id}`}
                      >
                        {state.title}
                        <span className='ms-2 rotate-180'>
                          <i className='ki-duotone ki-down fs-3'></i>
                        </span>
                      </div>
                    </div>
                    <div className='separator separator-dashed my-1'></div>
                    <div id={`${state._id}`} className='collapse show '>
                      <li className='d-flex align-items-center py-2 ' style={{marginLeft: '20px'}}>
                        <span
                          style={{cursor: 'pointer'}}
                          className='fs-3  text-gray-500  text-center text-hover-primary fw-bold mb-1'
                        >
                          {project?.files.filter(
                            (file) =>
                              file?.status === state?._id ||
                              (!file.status && state.position === '-1')
                          ).length > 0 ? (
                            project?.files
                              .filter((file) => {
                                if (!file.status && state.position === '-1') {
                                  return !file.status
                                } else return file?.status === state?._id
                              })
                              .map((file) => (
                                <button
                                  key={file._id}
                                  style={{
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                  }}
                                  onClick={() => {
                                    setViewDoc(file)
                                  }}
                                  className='fs-6 text-gray-700 text-hover-primary fw-bold mb-1 left'
                                >
                                  <span className='bullet me-5'></span> {file.name}
                                </button>
                              ))
                          ) : (
                            <span
                              style={{cursor: 'pointer'}}
                              className='fs-3  text-gray-500  text-center text-hover-primary fw-bold mb-1'
                            >
                              No Documents
                            </span>
                          )}
                        </span>
                      </li>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!project && !isLoading && (
            <div className='fv-row d-flex justify-content-center mh-300px fs-5 py-20'>
              <span className='text-muted'> No Project</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default StudentOverviewHeader
