import React, {useEffect, useState} from 'react'
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
  return (
    <div>
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
                        <span className={`badge badge-light-warning fw-bold me-auto px-4 py-3`}>
                          {project?.status}
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
      </div>
    </div>
  )
}

export default Projects
