import React, {useEffect, useRef, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Spinner} from '../../components/Spinner'
import {PageLink, PageTitle} from '../../_metronic/layout/core'
import get from '../../lib/get'
import {useDispatch, useSelector} from 'react-redux'
import {selectAuth} from '../../redux/selectors/auth'
import {selectDocumentForEdit} from '../../redux/selectors/document'
import {setDocForEdit} from '../../redux/slice/documentSlice'
import TDocument from '../../types/Document'
import * as Yup from 'yup'
import 'quill/dist/quill.snow.css' // Import Quill styles
import {useFormik} from 'formik'
import post from '../../lib/post'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Quill from 'quill'
import put from '../../lib/put'
import CustomHighlighting from '../../utils/custom-highlighting'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import EditorToolbar, {modules, formats} from '../../quill/Toolbar'
import {ReviewChat} from '../../components/reviewChat'

const ReviewDocument = () => {
  const {token} = useSelector(selectAuth)
  const {reviewSessionId} = useParams()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const [reviewData, setReviewData] = useState(null)
  const [comments, setComments] = useState([])

  const [assignedDocument, setAssignedDocument] = useState<TDocument | null>(null)
  const [content, setContent] = useState<any>('')
  const [quill, setQuill] = useState<Quill | null>(null)

  const getReviewdata = async () => {
    const RESPONSE = await get(`reviewSessions/${reviewSessionId}`, token)
    setContent(RESPONSE.data.content)
    setReviewData(RESPONSE.data)
  }

  const editorRef = useRef<HTMLDivElement | null>(null)

  const doc = useSelector(selectDocumentForEdit)
  const reviewDocumentsBreadcrumbs: Array<PageLink> = [
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

  const getAssignedDocument = async () => {
    setIsLoading(true)
    try {
      if (token) {
        const RESPONSE = await get(`documents/assigned/${reviewData.document}`, token)
        setAssignedDocument(RESPONSE.data)
        setContent(RESPONSE.data.content)

        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      setAssignedDocument(null)
      console.log(error)
    }
  }

  useEffect(() => {
    if (reviewData) {
      console.log(reviewData)
      // getAssignedDocument()
      setComments(reviewData.comments)
    }
  }, [reviewData])

  useEffect(() => {
    getReviewdata()
  }, [])

  // dispatch(setDocForEdit({document: null}))
  // const editor = reactQuillRef.getEditor()
  // const unprivilegedEditor = reactQuillRef.makeUnprivilegedEditor(editor)

  useEffect(() => {
    if (!quill) {
      const editor = new Quill('#editor', {
        theme: 'snow',
        modules: {
          syntax: {
            highlight: (text: any) => hljs.highlightAuto(text).value,
          },
          toolbar: [
            [{header: [1, 2, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
            ['link', 'image'],
            ['clean'],
            ['highlight'],
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
  }, [])

  const handleChange = (value: any) => {
    setContent(value)
  }
  const handleReviewUpdate = async (e: any) => {
    e.preventDefault()
    console.log(reviewData)
    if (quill) {
      const RESPONSE = await put(
        `reviewSessions/${reviewData._id}`,
        {content, comments},
        token,
        true,
        'Review Saved'
      )
      console.log(RESPONSE)
    }

    setIsLoading(false)
  }

  return (
    <>
      <PageTitle breadcrumbs={reviewDocumentsBreadcrumbs}>Review Document </PageTitle>
      {isLoading && <Spinner />}
      <>
        <div>
          <h2 className='my-3'>{assignedDocument?.title}</h2>
        </div>
        <div className='row mb-5' style={{minHeight: '70vh', height: 'max-content'}}>
          <div className='col-12 col-lg-8 mb-20 mb-lg-0'>
            <div className='card-body '>
              <EditorToolbar />

              <ReactQuill
                theme='snow'
                value={content}
                style={{height: '434px'}}
                onChange={handleChange}
                placeholder={'Loading document...'}
                modules={modules}
                formats={formats}
              />
            </div>{' '}
          </div>
          <div className='col-12 col-lg-4'>
            <div className='card p-0'>
              <div className='card-body p-0' style={{height: '494px', overflow: 'scroll'}}>
                <ReviewChat comments={comments} setComments={setComments} />
              </div>
            </div>
          </div>
        </div>
      </>

      <div className='card'>
        <div className='card-footer'>
          <button className='btn btn-primary' onClick={(e) => handleReviewUpdate(e)}>
            {!loading && <span className='indicator-label'>Save Review</span>}
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

export default ReviewDocument
