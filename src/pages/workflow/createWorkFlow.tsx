import React, {useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import post from '../../lib/post'
import {useSelector} from 'react-redux'
import {selectToken} from '../../redux/selectors/auth'
import {KTIcon} from '../../_metronic/helpers'

const initialValues = {
  title: '',
  color: '',
  description: '',
}
const CreateProjectSchema = Yup.object().shape({
  title: Yup.string().required('Project Title is required'),
  color: Yup.string().required('Project Methodology is required'),
  description: Yup.string().required('Project Methodology is required'),
  // description: Yup.string().required('Project Description is required'),
})

const CreateWorkFlow = ({setCreateNew, refreshWorkflow}: any) => {
  const token = useSelector(selectToken)
  const [IsLoading, setIsLoading] = useState<boolean>(false)

  const formik = useFormik({
    initialValues,
    validationSchema: CreateProjectSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setIsLoading(true)
      try {
        await post('workflows', {...values}, token, true, 'Workflow Created')
        if (1) {
          formik.values = initialValues
          refreshWorkflow()
        }
        setCreateNew(false)

        setSubmitting(false)
        setIsLoading(false)
      } catch (error: any) {
        console.log(error)
        setSubmitting(false)
        setIsLoading(false)

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
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            {/* end::Modal Backdrop */}
            <div className='modal-header pt-7' id='kt_chat_contacts_header'>
              <div className='modal-title'>
                <h2> Create workflow</h2>
              </div>
              <div
                className='btn btn-icon btn-sm btn-active-icon-primary'
                data-kt-users-modal-action='close'
                style={{cursor: 'pointer'}}
                onClick={() => setCreateNew(false)}
              >
                <KTIcon iconName='cross' className='fs-1' />
              </div>
            </div>
            {/* begin::Modal body */}
            {/* Projects, documents and files which haven't been edited or reviewed */}
            <div className='modal-body scroll-y mx-5 mx-xl-10 '>
              <div className='card-body'></div>
              <form
                className='form w-100 h-100'
                onSubmit={formik.handleSubmit}
                noValidate
                id='workflow_creation_form'
              >
                <div className='row mb-7 fv-plugins-icon-container'>
                  <div className='col-6'>
                    <label className='fs-6 fw-semibold form-label mt-3'>
                      <span className='required'>Name</span>
                      <span
                        className='ms-1'
                        data-bs-toggle='tooltip'
                        aria-label="Enter the contact's name."
                        data-bs-original-title="Enter the contact's name."
                        data-kt-initialized='1'
                      >
                        <i className='ki-duotone ki-information fs-7'>
                          <span className='path1'></span>
                          <span className='path2'></span>
                          <span className='path3'></span>
                        </i>
                      </span>
                    </label>
                    <input
                      type='text'
                      {...formik.getFieldProps('title')}
                      className='form-control form-control-solid'
                      name='title'
                      placeholder='Workflow title'
                    />
                    <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
                  </div>
                  <div className='col-6'>
                    <label className='fs-6 fw-semibold form-label mt-3'>
                      <span className='required'>Color</span>
                      <span
                        className='ms-1'
                        data-bs-toggle='tooltip'
                        aria-label="Enter the contact's name."
                        data-bs-original-title="Enter the contact's name."
                        data-kt-initialized='1'
                      >
                        <i className='ki-duotone ki-information fs-7'>
                          <span className='path1'></span>
                          <span className='path2'></span>
                          <span className='path3'></span>
                        </i>
                      </span>
                    </label>
                    <select
                      {...formik.getFieldProps('color')}
                      className='form-control form-control-solid'
                    >
                      <option value=''>Select Workflow color</option>
                      <option value='primary'>Blue</option>
                      <option value='warning'>Orange</option>
                      <option value='info'>Purple</option>
                      <option value='danger'>Red</option>
                      <option value='success'>Green</option>
                    </select>
                    <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
                  </div>
                </div>

                <div className='fv-row mb-7'>
                  <label className='fs-6 fw-semibold form-label mt-3'>
                    <span>Description</span>
                    <span
                      className='ms-1'
                      data-bs-toggle='tooltip'
                      aria-label='Enter any additional notes about the contact (optional).'
                      data-bs-original-title='Enter any additional notes about the contact (optional).'
                      data-kt-initialized='1'
                    >
                      <i className='ki-duotone ki-information fs-7'>
                        <span className='path1'></span>
                        <span className='path2'></span>
                        <span className='path3'></span>
                      </i>
                    </span>
                  </label>
                  <textarea
                    {...formik.getFieldProps('description')}
                    className='form-control form-control-solid'
                    name='description'
                  ></textarea>
                </div>
                <div className='separator mb-6'></div>
                <div className='d-flex justify-content-end'>
                  <button
                    type='reset'
                    data-kt-contacts-type='cancel'
                    className='btn btn-light me-3'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    id='kt_sign_in_submit'
                    className='btn btn-primary'
                    disabled={formik.isSubmitting || !formik.isValid}
                  >
                    <i className='ki-duotone ki-badge fs-2  mx-2'>
                      <span className='path1'></span>
                      <span className='path2'></span>
                      <span className='path3'></span>
                      <span className='path4'></span>
                      <span className='path5'></span>
                    </i>
                    {!IsLoading && <span className='indicator-label'>Create</span>}
                    {IsLoading && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* end::Modal body */}
          {/* end::Modal content */}
        </div>
        {/* end::Modal dialog */}
      </div>
      {/* begin::Modal Backdrop */}

      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export default CreateWorkFlow
