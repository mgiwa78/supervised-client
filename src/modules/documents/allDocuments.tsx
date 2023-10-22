import React, {useEffect, useState} from 'react'
import {PageTitle} from '../../_metronic/layout/core'
import type {PageLink} from '../../_metronic/layout/core'
import get from '../../lib/get'
import {useSelector} from 'react-redux'
import TDocument from '../../types/Document'
import {selectAuth} from '../../redux/selectors/auth'
import AssignDocument from '../users/components/assignDocument'
import DocumentTable from '../../components/documentTable'

const documentsBreadcrumbs: Array<PageLink> = [
  {
    title: 'Documents',
    path: '/documents/all',
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

const AllDocuments = () => {
  const {token} = useSelector(selectAuth)
  const [documents, setDocuments] = useState<Array<TDocument>>([])
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
          const RESPONSE = await get('documents', token)
          setDocuments(RESPONSE.data)
          setIsLoading(false)
        }
      } catch (error) {
        setIsLoading(false)
        setDocuments([])
        console.log(error)
      }
    }
    getDocuments()
  }, [token])

  return (
    <>
      <PageTitle breadcrumbs={documentsBreadcrumbs}>All Documents </PageTitle>
      <DocumentTable
        title='All Documents'
        documents={documents}
        assginDoc={assginDoc}
        isLoading={isLoading}
      />
      {doc && <AssignDocument doc={doc} handleClose={handleClose} />}
    </>
  )
}

export default AllDocuments
