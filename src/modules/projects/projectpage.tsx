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

const ProjectPage = () => {
  const token = useSelector(selectToken)
  const location = useLocation()
  const {projectId} = useParams()

  console.log(projectId)
  const [project, setProject] = useState<TProject>()
  const [page, setPage] = useState<'documents' | 'overview'>('overview')

  useEffect(() => {
    const getStudent = async () => {
      const RESPONSE = await get(`projects/${projectId}`, token)
      setProject(RESPONSE.data)
    }
    getStudent()
  }, [token, projectId])
  return (
    <>
      <ProjectHeader setPage={setPage} page={page} />
      {page === 'overview' && <ProjectOverview />}
      {page === 'documents' && <ProjectDocuments project={project} />}
    </>
  )
}

export default ProjectPage
