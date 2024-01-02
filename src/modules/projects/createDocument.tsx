import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {selectAuth} from '../../redux/selectors/auth'
import post from '../../lib/post'
import {KTIcon} from '../../_metronic/helpers'
import mammoth from 'mammoth'
import {useDropzone} from 'react-dropzone'
import {useParams} from 'react-router-dom'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {storage} from '../../utils/firebase'
import put from '../../lib/put'

type Props = {
  handleClose: Function
  refreshProject: Function
}

const documentSchema = Yup.object().shape({
  title: Yup.string().required('Document Title is required'),
  description: Yup.string().required('Document Description is required'),
})

const initialValues = {title: '', description: '', defualtTemplate: '', content: ''}

const CreateDocument = ({handleClose, refreshProject}: Props) => {
  const {projectId} = useParams()

  const [fileContent, setFileContent] = useState<string | null>(null)
  const [fileUploadState, setFileUploadState] = useState<boolean | null | 'complete'>(null)

  const {token} = useSelector(selectAuth)

  const [loading, setLoading] = useState(false)

  const hadlefileFileUpload = async (projectId: string, file: any) => {
    const fileRefPathRef = ref(storage, `documents/projects/${projectId}/${file.name}`)
    await uploadBytes(fileRefPathRef, file).then((snapshot) => {})

    return {ref: fileRefPathRef, name: file.name}
  }

  const {getRootProps, getInputProps, acceptedFiles} = useDropzone({
    multiple: false,
    accept: {
      'application/*': [
        'vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.docx',
        '.doc',
        '.pdf',
      ],
    },
  })

  let files = acceptedFiles.map((file: any) => <li key={file.path}>{file.path}</li>)

  const formik = useFormik({
    initialValues,
    validationSchema: documentSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)

      try {
        console.log(values)

        const fileUploadData = await hadlefileFileUpload(projectId, acceptedFiles[0])
        const a = await getDownloadURL(fileUploadData.ref)

        const data = {path: a, title: values.title, description: values.description}

        console.log(data)
        await put(
          `projects/uploadDocument/${projectId}`,
          {files: [data]},
          token,
          true,
          'Documents Submitted'
        ).then(() => {
          files = []
          formik.resetForm()
          refreshProject()
        })

        // }
        handleClose()

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
      <div
        className='modal fade show d-block'
        id='kt_modal_add_user'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2 className='fw-bolder'> Create document</h2>

              <div
                className='btn btn-icon btn-sm btn-active-icon-primary'
                data-kt-users-modal-action='close'
                onClick={() => handleClose()}
                style={{cursor: 'pointer'}}
              >
                <KTIcon iconName='cross' className='fs-1' />
              </div>
            </div>{' '}
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

              <div className='modal-body'>
                <div className='row-fw mb-5'>
                  <label className='form-label fs-6 fw-bold '>Title</label>
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
                <div className='row-fw mb-5'>
                  <label className='form-label fs-6 fw-bold '>Description</label>
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

                {/* <div className='row-fw mb-5'>
                  <label className='form-label fs-6 fw-bold'>Defualt Template</label>
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
                </div> */}
                {/* {formik.values.defualtTemplate === 'insert_content' ? (
                  <div className='row-fw mb-5'>
                    <label className='form-label fs-6 fw-bold'>Content</label>

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
                )} */}
                {/* {formik.values.defualtTemplate === 'upload_word_file' ? ( */}
                <div className='row-fw mb-5'>
                  <label className='form-label fs-6 fw-bold'>
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
                {/* ) : (
                  ''
                )} */}

                <div className='row-fw mb-5'>
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
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export default CreateDocument
