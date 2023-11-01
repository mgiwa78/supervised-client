import React, {useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import post from '../../lib/post'
import {useSelector} from 'react-redux'
import {selectAuth} from '../../redux/selectors/auth'

const loginSchema = Yup.object().shape({
  title: Yup.string().required('Project Title is required'),
  description: Yup.string().required('Project Description is required'),
  field: Yup.string().required('Project Field is required'),
  methodology: Yup.string().required('Project Methodology is required'),
})
const initialValues = {
  title: 'New Project Title',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  methodology: 'Experimental Study',
  field: 'Computer Science',
}

const CreateProject = () => {
  const {token} = useSelector(selectAuth)
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        console.log(values)
        const RESPONSE: any = await post('projects', values, token, true, 'Project Created')

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
  return (
    <div className='card'>
      <div className='card-header'>
        <div className='card-title fs-3 fw-bold'>Create New Project</div>
      </div>
      <form
        id='kt_project_settings_form'
        className='form fv-plugins-bootstrap5 fv-plugins-framework'
        onSubmit={formik.handleSubmit}
        noValidate
      >
        {formik.status ? (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        ) : (
          ''
        )}

        <div className='card-body p-9'>
          <div className='row mb-8'>
            <div className='col-xl-3'>
              <div className='fs-6 fw-semibold mt-2 mb-3'> Title</div>
            </div>
            <div className='col-xl-9 fv-row fv-plugins-icon-container'>
              <input
                type='text '
                {...formik.getFieldProps('title')}
                className={clsx('form-control form-control-solid')}
                name='title'
              />
              {formik.touched.title && formik.errors.title && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.title}</span>
                  </div>
                </div>
              )}
              <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
            </div>
          </div>

          <div className='row mb-8'>
            <div className='col-xl-3'>
              <div className='fs-6 fw-semibold mt-2 mb-3'> Description</div>
            </div>
            <div className='col-xl-9 fv-row fv-plugins-icon-container'>
              <textarea
                name='description'
                className='form-control form-control-solid h-100px'
              ></textarea>
              {formik.touched.description && formik.errors.description && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.description}</span>
                  </div>
                </div>
              )}
              <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
            </div>
          </div>
          <div className='row mb-8'>
            <div className='col-xl-3'>
              <div className='fs-6 fw-semibold mt-2 mb-3'> Field</div>
            </div>
            <div className='col-xl-9 fv-row fv-plugins-icon-container'>
              <input
                type='text'
                {...formik.getFieldProps('field')}
                className={clsx('form-control form-control-solid')}
                name='field'
              />
              {formik.touched.field && formik.errors.field && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.field}</span>
                  </div>
                </div>
              )}
              <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
            </div>
          </div>
          <div className='row mb-8'>
            <div className='col-xl-3'>
              <div className='fs-6 fw-semibold mt-2 mb-3'> Methodology</div>
            </div>
            <div className='col-xl-9 fv-row fv-plugins-icon-container'>
              <input
                {...formik.getFieldProps('methodology')}
                className={clsx('form-control form-control-solid')}
                type='text'
                name='methodology'
              />
              {formik.touched.methodology && formik.errors.methodology && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.methodology}</span>
                  </div>
                </div>
              )}
              <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
            </div>
          </div>
        </div>
        <div className='card-footer d-flex justify-content-end py-6 px-9'>
          <button type='reset' className='btn btn-light btn-active-light-primary me-2'>
            Discard
          </button>
          <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn btn-primary'
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className='indicator-label'>Create</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        <input type='hidden' />
      </form>
    </div>
  )
}

export default CreateProject
