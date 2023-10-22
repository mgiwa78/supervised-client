import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Spinner} from '../../components/Spinner'
import {PageLink, PageTitle} from '../../_metronic/layout/core'
import get from '../../lib/get'
import {useSelector} from 'react-redux'
import {selectAuth} from '../../redux/selectors/auth'
import TDocument from '../../types/Document'
import 'quill/dist/quill.snow.css' // Import Quill styles
import 'react-quill/dist/quill.snow.css'
import Quill from 'quill'
import put from '../../lib/put'

const EditDocument = () => {
  const {token} = useSelector(selectAuth)
  const {documentID} = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  const [quill, setQuill] = useState<Quill | null>(null)

  const [document, setDocument] = useState<TDocument | null>(null)
  const [content, setContent] = useState<any>('')
  const editdocumentsBreadcrumbs: Array<PageLink> = [
    {
      title: 'Documents',
      path: '/users/all',
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
    // dispatch(setDocForEdit({document: null}))

    const getDocument = async () => {
      setIsLoading(true)
      try {
        if (token) {
          const RESPONSE = await get(`documents/${documentID}`, token)
          setDocument(RESPONSE.data)
          console.log(RESPONSE.data)

          // dispatch(setDocForEdit({document: RESPONSE.data}))

          setIsLoading(false)
        }
      } catch (error) {
        setIsLoading(false)
        setDocument(null)
        console.log(error)
      }
    }
    getDocument()
  }, [token, documentID])

  useEffect(() => {
    if (document) if (quill) quill.clipboard.dangerouslyPasteHTML(document.content)
  }, [document, quill])

  useEffect(() => {
    if (!quill) {
      const editor = new Quill('#editor', {
        theme: 'snow',
        modules: {
          toolbar: [
            [{header: [1, 2, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
            ['link', 'image'],
            ['clean'],
          ],
        },
        formats: [
          'header',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'list',
          'bullet',
          'indent',
          'link',
          'image',
        ],
      })
      console.log(editor)

      setQuill(editor)
    }
  }, [quill])

  const handleDocumentUpdate = async (e: any) => {
    e.preventDefault()
    if (quill) {
      console.log(quill.root.innerHTML)
      const RESPONSE = await put(
        `documents/${documentID}`,
        {...document, content: quill.root.innerHTML},
        token,
        true,
        'Document Updated'
      )
      console.log(RESPONSE.data)
    }

    setIsLoading(false)
  }
  return (
    <>
      <PageTitle breadcrumbs={editdocumentsBreadcrumbs}>Edit Document </PageTitle>
      {isLoading && <Spinner />}

      <div>
        <h2 className='my-3'>{document?.title}</h2>
      </div>
      <div className='card'>
        <div className='card-body'>
          <div id='editor'>{content}</div>
        </div>
        <div className='card-footer'>
          <button className='btn btn-primary' onClick={(e) => handleDocumentUpdate(e)}>
            {!loading && <span className='indicator-label'>Save Changes</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  )
}

export default EditDocument
