import React, {useEffect, useState} from 'react'
import ProjectHeader from './ProjectHeader'
import {Outlet, useLocation, useParams} from 'react-router-dom'
import CreateDocuments from '../documents/createdocuments'
import CreateDocument from './createDocument'
import {useSelector} from 'react-redux'
import {selectToken} from '../../redux/selectors/auth'
import {TProject} from '../../types/Project'
import get from '../../lib/get'
import ProjectOverview from './projectOverview'
import ProjectDocuments from './projectDocuments'
import {Spinner} from '../../components/Spinner'
import {PageLink, PageTitle} from '../../_metronic/layout/core'
import EditProject from './editProject'

const ProjectPage = () => {
  const token = useSelector(selectToken)
  const location = useLocation()
  const {projectId} = useParams()

  const [project, setProject] = useState<TProject>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [page, setPage] = useState<'documents' | 'overview' | 'edit'>('overview')
  const getProject = async () => {
    setIsLoading(true)
    const RESPONSE = await get(`projects/${projectId}`, token)

    if (RESPONSE?.data) {
      setProject(RESPONSE.data)
    }
    setIsLoading(false)
  }
  const refreshProject = () => {
    getProject()
  }
  useEffect(() => {
    getProject()
  }, [token, projectId])

  const projectPageBreadcrumbs: Array<PageLink> = [
    {
      title: 'View Project',
      path: '/projects/:projectId',
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

  return (
    <>
      <PageTitle breadcrumbs={projectPageBreadcrumbs}>View Project</PageTitle>
      {isLoading && (
        <div className='fv-row d-flex justify-content-center mh-300px'>
          <div className='h-40px w-40px spinner-border spinner-border-sm align-middle ms-2'></div>
        </div>
      )}

      {project && !isLoading && (
        <>
          <ProjectHeader project={project} setPage={setPage} page={page} />
          {/* {page === 'overview' && <ProjectOverview />} */}
          {page === 'documents' && (
            <ProjectDocuments refreshProject={refreshProject} project={project} />
          )}
          {page === 'edit' && <EditProject refreshProject={refreshProject} project={project} />}
        </>
      )}

      {!isLoading && !project && (
        <div className='fv-row d-flex justify-content-center mh-300px fs-5 py-20'>
          <span className='text-muted'>Invalid Project</span>
        </div>
      )}
    </>
  )
}

export default ProjectPage
