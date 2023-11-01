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
  const location = useLocation()
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
  useEffect(() => {
    const getStudent = async () => {
      const RESPONSE = await get(`users/${studentId}`, token)
      setStudent(RESPONSE.data)
    }
    const getProject = async () => {
      const RESPONSE = await get(`projects/${projectId}`, token)
      setProject(RESPONSE.data)
    }

    getStudent()
    getProject()
  }, [token, studentId])
  return (
    <>
      <PageTitle breadcrumbs={assignedStudentBreadcrumbs}>All Documents </PageTitle>
      <div className='card mb-5 mb-xl-10 '>
        {student && student._id ? (
          <div className='card-body'>
            <div className='row'>
              <div className='col-3'>
                <div className='menu-content d-flex align-items-center '>
                  <div className='symbol symbol-50px me-5'>
                    <img alt='Logo' src={toAbsoluteUrl('/media/avatars/blank.png')} />
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
              </div>
              <div className='col-3'>
                <div className='d-flex flex-stack fs-4 py-3 px-2 bg-light-success'>
                  <div
                    className='fw-bold rotate cursor-pointer'
                    data-bs-toggle='collapse'
                    role='button'
                    aria-expanded='false'
                    data-bs-target='#kt_customer_view_details'
                    aria-controls='kt_customer_view_details'
                  >
                    Approved
                    <span className='ms-2 rotate-180'>
                      <i className='ki-duotone ki-down fs-3'></i>
                    </span>
                  </div>
                </div>
                <div className='separator separator-dashed my-1'></div>
                <div id='kt_customer_view_details' className='collapse show '>
                  <li className='d-flex align-items-center py-2 ' style={{marginLeft: '20px'}}>
                    <span
                      style={{cursor: 'pointer'}}
                      className='fs-3  text-gray-500  text-center text-hover-primary fw-bold mb-1'
                    >
                      No Documents
                    </span>
                  </li>
                </div>
              </div>
              <div className='col-3'>
                <div className='d-flex flex-stack fs-4 py-3 px-2 bg-light-warning'>
                  <div
                    className='fw-bold rotate cursor-pointer'
                    data-bs-toggle='collapse'
                    role='button'
                    aria-expanded='false'
                    data-bs-target='#kt_projects_in_progress'
                    aria-controls='kt_projects_in_progress'
                  >
                    In Progress
                    <span className='ms-2 rotate-180'>
                      <i className='ki-duotone ki-down fs-3'></i>
                    </span>
                  </div>
                </div>
                <div className='separator separator-dashed my-1'></div>
                <div id='kt_projects_in_progress' className='collapse show'>
                  <li className='d-flex align-items-center py-2 ' style={{marginLeft: '20px'}}>
                    <span
                      style={{cursor: 'pointer'}}
                      className='fs-3  text-gray-500  text-center text-hover-primary fw-bold mb-1'
                    >
                      No Documents
                    </span>
                  </li>
                </div>
              </div>

              <div className='col-3'>
                <div className='d-flex flex-stack fs-4 py-3 px-2 bg-light-secondary'>
                  <div
                    className='fw-bold rotate cursor-pointer'
                    data-bs-toggle='collapse'
                    role='button'
                    aria-expanded='false'
                    data-bs-target='#kt_projects_in_backlog'
                    aria-controls='kt_projects_in_backlog'
                  >
                    Backlog
                    <span className='ms-2 rotate-180'>
                      <i className='ki-duotone ki-down fs-3'></i>
                    </span>
                  </div>
                </div>
                <div className='separator separator-dashed my-1'></div>
                <div
                  id='kt_projects_in_backlog'
                  style={{textAlign: 'left'}}
                  className='collapse show'
                >
                  {project?.files && project.files.length > 0 ? (
                    project.files.map((file, i) => {
                      return (
                        <li
                          key={i}
                          className='d-flex justify-content-between align-items-left py-2 '
                          style={{marginLeft: '20px'}}
                        >
                          <button
                            style={{
                              textAlign: 'left',
                              cursor: 'pointer',
                              backgroundColor: 'transparent',
                              border: 'none',
                            }}
                            onClick={() => {
                              console.log(file)
                              setViewDoc(file)
                            }}
                            className='fs-6 text-gray-700 text-hover-primary fw-bold mb-1 left'
                          >
                            <span className='bullet me-5'></span> {file.name}
                          </button>
                        </li>
                      )
                    })
                  ) : (
                    <li className='d-flex align-items-center py-2 ' style={{marginLeft: '20px'}}>
                      <span
                        style={{cursor: 'pointer'}}
                        className='fs-3  text-gray-500  text-center text-hover-primary fw-bold mb-1'
                      >
                        No Documents
                      </span>
                    </li>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  )
}

export default StudentOverviewHeader
