import React, {useState} from 'react'
import {PageLink, PageTitle} from '../../_metronic/layout/core'
import {useSelector} from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import post from '../../lib/post'
import {selectAuth} from '../../redux/selectors/auth'
import mammoth from 'mammoth'
import {useDropzone} from 'react-dropzone'

const rolesBreadcrumbs: Array<PageLink> = [
  {
    title: 'Documents',
    path: '/documents/create document',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Documents',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const loginSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Minimum title lenght is 5')
    .max(50, 'Maximum title lenght is 50')
    .required('Document Title is required'),
  description: Yup.string()
    .min(5, 'Minimum description lenght is 5')
    .max(50, 'Maximum description lenght is 50')
    .required('Document Description is required'),
})

const initialValues = {
  title: '',
  description: '',
  defualtTemplate: '',
  content: '',
}

const CreateDocuments = () => {
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [fileUploadState, setFileUploadState] = useState<boolean | null | 'complete'>(null)

  const {token} = useSelector(selectAuth)

  const [loading, setLoading] = useState(false)

  const onDrop = async (acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0]
    console.log(file)

    if (file) {
      console.log(file)

      if (
        file.type === 'application/msword' ||
        file.type === 'application/docx' ||
        file.type === 'application/doc' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        const AB = await file.arrayBuffer()

        const result = await mammoth.convertToHtml({arrayBuffer: AB})

        setFileContent(result.value)
        formik.values.content = result.value
        setFileUploadState('complete')
      }
    }
  }

  const {getRootProps, getInputProps, acceptedFiles} = useDropzone({
    onDrop,
    accept: {
      'application/*': [
        'vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.docx',
        '.doc',
        '.pdf',
      ],
    },
  })

  const files = acceptedFiles.map((file: any) => <li key={file.path}>{file.path}</li>)

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      console.log('asdda')
      try {
        console.log(values)
        const RESPONSE: any = await post('documents', values, token, true, 'Document Created')

        console.log(RESPONSE)

        setSubmitting(false)
        setLoading(false)
      } catch (error: any) {
        console.log(error)
        setSubmitting(false)
        setLoading(false)

        if (error.response?.data.message) {
          return setStatus(error.response.data.message)
        }
        if (error.response?.data.error) {
          return setStatus(error.response.data.error)
        } else {
          return setStatus(error.error)
        }
      }
    },
  })

  // const handleFormatChange = (e: any) => {
  //   console.log(e.target.value)
  //   if (e.target.value !== 'upload_word_file') {
  //     setFileContent(null)
  //   }
  // }
  return (
    <>
      <PageTitle breadcrumbs={rolesBreadcrumbs}>Create Document</PageTitle>
      <div className={`card mb-5 mb-xl-8 py-5`}>
        <div className='card-header border-0 '>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Enter document details</span>
          </h3>
        </div>
        <div className='card-body py-1'>
          <form
            className='form w-100 h-100'
            onSubmit={formik.handleSubmit}
            noValidate
            id='kt_login_signin_form'
          >
            {formik.status ? (
              <div className='mb-lg-15 alert alert-danger'>
                <div className='alert-text font-weight-bold'>{formik.status}</div>
              </div>
            ) : (
              ''
            )}

            <div className='row mb-8'>
              <div className='col-6'>
                <label className='form-label fs-6 fw-bold text-muted'>Title</label>
                <input
                  placeholder='Enter Document Title'
                  {...formik.getFieldProps('title')}
                  className={clsx('form-control ')}
                  type='title'
                  name='title'
                  autoComplete='off'
                />
                {formik.touched.title && formik.errors.title && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.title}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className='col-6'>
                <label className='form-label fs-6 fw-bolder text-muted'>Description</label>
                <input
                  placeholder='Enter Document Description'
                  {...formik.getFieldProps('description')}
                  className={clsx('form-control ')}
                  type='description'
                  name='description'
                  autoComplete='off'
                />
                {formik.touched.description && formik.errors.description && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.description}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-8'>
              <div className='col-6'>
                <label className='form-label fs-6 fw-bold text-muted'>Defualt Template</label>
                <select
                  placeholder='Select Defualt template'
                  {...formik.getFieldProps('defualtTemplate')}
                  className={clsx('form-control ')}
                  name='defualtTemplate'
                  autoComplete='off'
                >
                  <option className='text-muted' value=''>
                    Select Defualt template
                  </option>
                  <option value='blank'>blank</option>
                  <option value='insert_content'>content</option>
                  <option value='upload_word_file'>Upload Word file</option>
                </select>
                {formik.touched.defualtTemplate && formik.errors.defualtTemplate && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.defualtTemplate}</span>
                    </div>
                  </div>
                )}
              </div>
              {formik.values.defualtTemplate === 'insert_content' ? (
                <div className='col-6'>
                  <label className='form-label fs-6 fw-bold text-muted'>Content</label>

                  <textarea
                    placeholder='Select Content'
                    {...formik.getFieldProps('content')}
                    className={clsx('form-control ')}
                    name='content'
                    autoComplete='off'
                  ></textarea>
                  {formik.touched.content && formik.errors.content && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.content}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                ''
              )}
              {formik.values.defualtTemplate === 'upload_word_file' ? (
                <div className='col-6'>
                  <label className='form-label fs-6 fw-bold text-muted'>
                    <h4>Files : {files}</h4>
                  </label>{' '}
                  <div
                    {...getRootProps()}
                    className={`dropzone ${fileUploadState === 'complete' ? 'bg-success' : ''}`}
                    style={{
                      border: ` ${fileUploadState === 'complete' ? '1px solid green' : ''}`,
                    }}
                  >
                    <input {...getInputProps()} />
                    <p>
                      {fileContent && 'File Added'}
                      {!fileContent && 'Drag & drop a file here, or click to select one'}
                    </p>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>

            <div className='row'>
              <div className='col-6'>
                <button
                  type='submit'
                  id='kt_sign_in_submit'
                  className='btn btn-primary'
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {!loading && <span className='indicator-label'>Submit</span>}
                  {loading && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateDocuments
