import React, {useEffect, useState} from 'react'
import {toAbsoluteUrl} from '../../_metronic/helpers'
import {Link, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {TProject} from '../../types/Project'
import {selectAuth} from '../../redux/selectors/auth'
import get from '../../lib/get'
import {Spinner} from '../../components/Spinner'
import {PageLink, PageTitle} from '../../_metronic/layout/core'
import FormatDate from '../../utils/FormatDate'
import CreateDocument from '../projects/createDocument'

const MyProjects = () => {
  const {token} = useSelector(selectAuth)
  const [projects, setProjects] = useState<Array<TProject>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const projectsBreadcrumbs: Array<PageLink> = [
    {
      title: 'Projects',
      path: '/projects/my',
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

  useEffect(() => {
    const getProjects = async () => {
      setIsLoading(true)
      try {
        if (token) {
          const RESPONSE = await get('projects/my', token)
          setProjects(RESPONSE.data)
          setIsLoading(false)
        }
      } catch (error) {
        setIsLoading(false)
        setProjects([])
        console.log(error)
      }
    }
    getProjects()
  }, [token])

  return (
    <>
      <PageTitle breadcrumbs={projectsBreadcrumbs}>My Projects </PageTitle>
      <div className='d-flex flex-wrap flex-stack my-5' data-select2-id='select2-data-121-rgid'>
        <h2>All</h2>
        <div className='d-flex flex-wrap my-1'>
          <div className='m-0'>
            <select
              name='status'
              data-control='select2'
              data-hide-search='true'
              className='form-select form-select-sm form-select-solid fw-bold w-125px select2-hidden-accessible'
              data-select2-id='select2-data-9-sox5'
              tabIndex={-1}
              aria-hidden='true'
              data-kt-initialized='1'
              defaultValue={'Backlog'}
            >
              <option value='Active' data-select2-id='select2-data-11-54sr'>
                Active
              </option>
              <option value='Approved' data-select2-id='select2-data-124-qeyn'>
                In Progress
              </option>

              <option value='Backlog' data-select2-id='select2-data-126-ag7y'>
                Backlog
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className='row g-6 g-xl-9'>
        {isLoading && <Spinner />}
        <>
          {projects ? (
            projects.map((project) => (
              <div className='col-md-6 col-xl-4'>
                <Link to={`/project/${project._id}`} className='card border-hover-primary'>
                  <div className='card-header border-0 pt-9'>
                    <div className='card-title m-0'>
                      <div className='symbol symbol-50px w-50px bg-light'>
                        <span className='symbol-label bg-secondary text-inverse-secondary fw-bold'>
                          {project.title[0]}
                        </span>
                      </div>
                    </div>
                    <div className='card-toolbar'>
                      <span
                        className={`badge badge-light-${project?.status?.color} fw-bold me-auto px-4 py-3`}
                      >
                        {project?.status?.title}
                      </span>
                    </div>
                  </div>

                  <div className='card-body p-9'>
                    <div className='fs-3 fw-bold text-dark'>{project.title}</div>
                    <p className='text-gray-400 fw-semibold fs-5 mt-1 mb-7'>
                      {project.description}
                    </p>
                    <div className='d-flex flex-wrap mb-5'>
                      <div className='border border-gray-300 border-dashed rounded min-w-120px py-3 px-4 me-7 mb-3'>
                        <div className='fs-6 text-gray-800 fw-bold'>
                          {FormatDate(project.createdAt) || '-----'}
                        </div>
                        <div className='fw-semibold text-gray-400'>Created Date</div>
                      </div>
                      <div className='border border-gray-300 border-dashed rounded min-w-120px py-3 px-4 mb-3'>
                        <div className='fs-6 text-gray-800 fw-bold'>0</div>
                        <div className='fw-semibold text-gray-400'>Documents</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
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
    </>
  )
}

export default MyProjects
