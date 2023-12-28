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
import {TProject} from '../../types/Project'
import FormatDate from '../../utils/FormatDate'

const ProjectHeader = ({setPage, page, project}: any) => {
  const token = useSelector(selectToken)
  const location = useLocation()
  const {projectId} = useParams()

  // useEffect(() => {
  //   const getStudent = async () => {
  //     const RESPONSE = await get(`projects/${projectId}`, token)
  //     setProject(RESPONSE.data)
  //   }
  //   getStudent()
  // }, [token, projectId])

  return (
    <div className='card mb-5 mb-xl-10'>
      {project && (
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-6'>
            <div className='d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4'>
              <span className='symbol-label  fs-1  fw-bold'>{project.title[0]}</span>
            </div>
            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-1'>
                    <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bold me-3'>
                      {project.title}
                    </a>
                    <span className='badge badge-light-success me-auto'>{project.status}</span>
                  </div>
                  <div className='d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-400'>
                    {project.description}
                  </div>
                </div>
              </div>
              <div className='d-flex flex-wrap justify-content-start'>
                <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                  <div className='d-flex align-items-center'>
                    <div className='fs-4 fw-bold'>
                      {' '}
                      {project.student.lastName + ' ' + project.student.firstName}
                    </div>
                  </div>
                  <div className='fw-semibold fs-6 text-gray-400'>Author</div>
                </div>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-4 fw-bold'>
                        {project.createdAt ? FormatDate(project.createdAt) : '-----'}
                      </div>
                    </div>
                    <div className='fw-semibold fs-6 text-gray-400'>Date Created</div>
                  </div>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div
                        className='fs-4 fw-bold counted'
                        data-kt-countup='true'
                        data-kt-countup-value='5'
                        data-kt-initialized='1'
                      >
                        {project?.files.length}
                      </div>
                    </div>
                    <div className='fw-semibold fs-6 text-gray-400'>Documents</div>
                  </div>

                  {/* <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div
                        className='fs-4 fw-bold counted'
                        data-kt-countup='true'
                        data-kt-countup-value='15000'
                        data-kt-countup-prefix='$'
                        data-kt-initialized='1'
                      >
                        23
                      </div>
                    </div>
                    <div className='fw-semibold fs-6 text-gray-400'>Total Segments</div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className='separator'></div>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold'>
            <li className='nav-item'>
              <button
                className={
                  `nav-link text-active-primary me-6 py-5 ` + (page === `overview` && 'active')
                }
                onClick={() => setPage('overview')}
              >
                Overview
              </button>
              <button
                className={
                  `nav-link text-active-primary me-6 py-5 ` + (page === `documents` && 'active')
                }
                onClick={() => setPage('documents')}
              >
                Documents
              </button>
              <button
                className={
                  `nav-link text-active-primary me-6 py-5 ` + (page === `documents` && 'active')
                }
                onClick={() => setPage('edit')}
              >
                Edit
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default ProjectHeader
