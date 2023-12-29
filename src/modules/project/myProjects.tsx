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
import Projects from '../../components/projects'

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
      <Projects
        projects={projects}
        setProjects={setProjects}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  )
}

export default MyProjects
