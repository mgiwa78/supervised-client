import React, {useEffect, useState} from 'react'
import {PageTitle} from '../../_metronic/layout/core'
import type {PageLink} from '../../_metronic/layout/core'
import get from '../../lib/get'
import {useSelector} from 'react-redux'
import {selectAuth, selectToken, selectUser} from '../../redux/selectors/auth'
import AssignDocument from '../users/components/assignDocument'
import ReviewsTable from '../../components/ReviewsTable'
import TReviewSessions from '../../types/ReviewSessions'
import {useParams} from 'react-router-dom'

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

const AllStudentReviewSessions = () => {
  const token = useSelector(selectToken)

  const user = useSelector(selectUser)
  const [reviewSessions, setReviewSessions] = useState<Array<TReviewSessions>>([])
  const [doc, assginDoc] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleClose = () => {
    assginDoc(null)
  }

  useEffect(() => {
    const getDocuments = async () => {
      setIsLoading(true)

      try {
        if (token) {
          const RESPONSE = await get(`reviewSessions/student/myReview`, token)
          setReviewSessions(RESPONSE.data)
          setIsLoading(false)
        }
      } catch (error) {
        setIsLoading(false)
        setReviewSessions([])
        console.log(error)
      }
    }

    getDocuments()
  }, [token])

  return (
    <>
      <PageTitle breadcrumbs={documentsBreadcrumbs}>My Review Sessions </PageTitle>
      <ReviewsTable
        title='My Review Sessions'
        reviewSessions={reviewSessions}
        assginDoc={assginDoc}
        isLoading={isLoading}
      />
      {/* {doc && <AssignDocument doc={doc} handleClose={handleClose} />} */}
    </>
  )
}

export default AllStudentReviewSessions
