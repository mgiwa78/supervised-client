import React, {useEffect, useState} from 'react'
import {PageTitle} from '../../_metronic/layout/core'
import type {PageLink} from '../../_metronic/layout/core'
import {KTIcon} from '../../_metronic/helpers'
import get from '../../lib/get'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/store'
import User from '../../types/User'
import FormatDate from '../../utils/FormatDate'
import TDocument from '../../types/Document'
import {Spinner} from '../../components/Spinner'
import {Link, useNavigate} from 'react-router-dom'
import {selectAuth} from '../../redux/selectors/auth'
import AssignDocument from '../users/components/assignDocument'
import DocumentTable from '../../components/documentTable'
import ReviewsTable from '../../components/ReviewsTable'
import TReviewSessions from '../../types/ReviewSessions'

const documentsBreadcrumbs: Array<PageLink> = [
  {
    title: 'Documents',
    path: '/documents/reviewSessions',
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

const AllReviewsSessions = () => {
  const {token} = useSelector(selectAuth)
  const [reviewSessions, setReviewSessions] = useState<Array<TReviewSessions>>([])
  const [doc, assginDoc] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleClose = () => {
    assginDoc(null)
  }
  const navigate = useNavigate()

  const getDocuments = async () => {
    setIsLoading(true)
    try {
      if (token) {
        const RESPONSE = await get('reviewSessions', token)
        setReviewSessions(RESPONSE.data)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      setReviewSessions([])
      console.log(error)
    }
  }

  useEffect(() => {
    getDocuments()
  }, [])

  return (
    <>
      <PageTitle breadcrumbs={documentsBreadcrumbs}>All Review Sessions </PageTitle>
      <ReviewsTable
        title='All Review Sessions'
        reviewSessions={reviewSessions}
        assginDoc={assginDoc}
        isLoading={isLoading}
      />
      {doc && <AssignDocument doc={doc} handleClose={handleClose} />}
    </>
  )
}

export default AllReviewsSessions
