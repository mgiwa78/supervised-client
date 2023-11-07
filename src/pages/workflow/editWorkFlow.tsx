import React, {useState} from 'react'
import TWorkflow from '../../types/Workflow'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import post from '../../lib/post'
import put from '../../lib/put'
import {useSelector} from 'react-redux'
import {selectToken} from '../../redux/selectors/auth'

type PropTypes = {
  currentWorkflow: TWorkflow
}
const initialValues = {
  title: '',
  color: '',
  _id: '',
  count: '',
  defaultOrder: '',
  // description: '',
}
const editWorkflowSchema = Yup.object().shape({
  title: Yup.string().required('Project Title is required'),
  color: Yup.string().required('Project Methodology is required'),
  // description: Yup.string().required('Project Description is required'),
})

const EditWorkFlow = ({currentWorkflow}: PropTypes) => {
  const token = useSelector(selectToken)
  const [IsLoading, setIsLoading] = useState<boolean>(false)

  const formik = useFormik({
    initialValues: currentWorkflow,
    validationSchema: editWorkflowSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setIsLoading(true)
      try {
        console.log(values)

        const RESPONSE: any = await put(
          `workflows/${currentWorkflow._id}`,
          {...values},
          token,
          true,
          'Workflow Created'
        )
        if (1) {
          formik.values = initialValues
        }

        console.log(RESPONSE)

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
    <div className='card card-flush h-lg-100' id='kt_contacts_main'>
      <div className='card-header pt-7' id='kt_chat_contacts_header'>
        <div className='card-title'>
          <i className='ki-duotone ki-badge fs-1 me-2'>
            <span className='path1'></span>
            <span className='path2'></span>
            <span className='path3'></span>
            <span className='path4'></span>
            <span className='path5'></span>
          </i>
          <h2> Workflow</h2>
        </div>
      </div>
      <div className='card-body pt-5'>
        <form
          className='form w-100 h-100'
          onSubmit={formik.handleSubmit}
          noValidate
          id='workflow_modification_form'
        >
          <div className='row mb-7 fv-plugins-icon-container'>
            <div className='col-6'>
              <label className='fs-6 fw-semibold form-label mt-3'>
                <span className='required'>Title</span>
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
                defaultValue={currentWorkflow.title}
                className='form-control form-control-solid'
                name='title'
                {...formik.getFieldProps('title')}
              />
              <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
            </div>
            <div className='col-6'>
              <label className='fs-6 fw-semibold form-label mt-3'>
                <span className='required'>Colour</span>
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
          <div className='row mb-7 fv-plugins-icon-container'>
            <div className='col-6'>
              <label className='fs-6 fw-semibold form-label mt-3'>
                <span className='required'>Order</span>
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
                {...formik.getFieldProps('defaultOrder')}
                className='form-control form-control-solid'
              >
                <option value=''>Select Workflow Order</option>
                <option value='-1'>Default Start</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='0'>Default Finish</option>
              </select>
              <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
            </div>
            <div className='col-6'>
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
              <textarea className='form-control form-control-solid' name='description'></textarea>
            </div>
          </div>

          <div className='separator mb-6'></div>
          <div className='d-flex justify-content-end'>
            <button type='reset' data-kt-contacts-type='cancel' className='btn btn-light me-3'>
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
              {!IsLoading && <span className='indicator-label'>Update</span>}
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
  )
}

export default EditWorkFlow
