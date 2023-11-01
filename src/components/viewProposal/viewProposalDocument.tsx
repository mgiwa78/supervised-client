import React, {useState} from 'react'
import {PageLink, PageTitle} from '../../_metronic/layout/core'
import {useSelector} from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import post from '../../lib/post'
import {selectAuth, selectToken} from '../../redux/selectors/auth'
import mammoth from 'mammoth'
import {useDropzone} from 'react-dropzone'
import FileViewer from '../../modules/documents/textViewer'
import {KTIcon} from '../../_metronic/helpers'

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
type File = {
  path: string
  name: string
}
type Proptype = {
  file: File
  handleClose: Function
}
const ViewProposalDoc = ({file, handleClose}: Proptype) => {
  const [loading, setLoading] = useState<boolean>(false)
  const token = useSelector(selectToken)

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
      <div
        className='modal fade show d-block'
        id='kt_modal_add_user'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        {/* begin::Modal dialog */}
        <div className='modal-dialog modal-dialog-centered ' style={{minWidth: '90vw'}}>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <div className='card  py-5'>
              <div className='modal-header'>
                {/* begin::Modal title */}
                <h2 className='fw-bolder'> View document : {file?.name}</h2>
                {/* end::Modal title */}

                {/* begin::Close */}
                <div
                  className='btn btn-icon btn-sm btn-active-icon-primary'
                  data-kt-users-modal-action='close'
                  onClick={() => handleClose()}
                  style={{cursor: 'pointer'}}
                >
                  <KTIcon iconName='cross' className='fs-1' />
                </div>
                {/* end::Close */}
              </div>

              <div className='card-body py-1'>
                <FileViewer />
                {/* <form
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
                </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export default ViewProposalDoc
