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
  const {documentID} = useParams()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const editorRef = useRef<HTMLDivElement | null>(null)
  const [quill, setQuill] = useState<Quill | null>(null)

  const [assignedDocument, setAssignedDocument] = useState<TDocument | null>(null)
  const [content, setContent] = useState<any>('')

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
        const RESPONSE = await get(`documents/assigned/${documentID}`, token)
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
    getAssignedDocument()
  }, [])

  useEffect(() => {
    if (assignedDocument) {
      if (quill) {
        console.log('first')
        // quill.clipboard.dangerouslyPasteHTML(assignedDocument.content)
      }
    }
  }, [assignedDocument])

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
  const handleDocumentUpdate = async (e: any) => {
    e.preventDefault()
    if (quill) {
      const RESPONSE = await put(
        `documents/${documentID}`,
        {...document, content: quill.root.innerHTML},
        token,
        true,
        'Document Updated'
      )
    }

    setIsLoading(false)
  }

  return (
    <>
      <PageTitle breadcrumbs={reviewDocumentsBreadcrumbs}>Review Document </PageTitle>
      {isLoading && <Spinner />}

      <div>
        <h2 className='my-3'>{assignedDocument?.title}</h2>
      </div>

      <div className='card'>
        <div className='card-body'>
          <div className='row'>
            <div className='col-8'>
              {' '}
              {/* <div id='editor'>{content}</div> */}
              <EditorToolbar />
              {assignedDocument && (
                <ReactQuill
                  theme='snow'
                  value={content}
                  onChange={handleChange}
                  placeholder={'Write something awesome...'}
                  modules={modules}
                  formats={formats}
                />
              )}
            </div>
            <div className='col-4'>
              <ReviewChat />
            </div>
          </div>
        </div>
        <div className='card-footer'>
          <button className='btn btn-primary' onClick={(e) => handleDocumentUpdate(e)}>
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
