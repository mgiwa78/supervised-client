import React, {useState} from 'react'
import TWorkflow from '../../types/Workflow'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import post from '../../lib/post'
import put from '../../lib/put'
import {useSelector} from 'react-redux'
import {selectToken} from '../../redux/selectors/auth'
import {KTIcon} from '../../_metronic/helpers'
import TState from '../../types/States'
import {ppid} from 'process'

type PropTypes = {
  currentWorkflow: TWorkflow
  setCurrentWorkflow: Function
  refreshWorkflow: Function
}

const initialValues = {
  title: '',
  color: '',
  _id: '',
  count: '',
  description: '',
}
const initialStateValues = {
  title: '',
  color: '',

  position: '',
}

const editWorkflowSchema = Yup.object().shape({
  title: Yup.string().required('Project Title is required'),
  color: Yup.string().required('Project Methodology is required'),
  // description: Yup.string().required('Project Description is required'),
})
const WorkflowStateSchema = Yup.object().shape({
  title: Yup.string().required('State title is required'),
  color: Yup.string().required('State color  is required'),
  position: Yup.string().required('State position  is required'),
})

const EditWorkFlow = ({currentWorkflow, setCurrentWorkflow, refreshWorkflow}: PropTypes) => {
  const token = useSelector(selectToken)
  const [IsLoading, setIsLoading] = useState<boolean>(false)
  const [IsStateLoading, setIsStateLoading] = useState<boolean>(false)
  const [statesMod, setStatesMod] = useState<Array<TState>>(currentWorkflow.states)

  const [newState, setNewState] = useState<TState>({
    _id: '',
    title: '',
    color: '',
    position: '',
  })

  const handleNewStateChange = (e: any) => {
    const {
      target: {value, name},
    } = e
    setNewState({...newState, [name]: value})
  }

  const addState = async () => {
    const RESPONSE: any = await post(
      `states/${currentWorkflow._id}`,
      {...newState},
      token,
      true,
      'State Created'
    )

    currentWorkflow.states = RESPONSE.data
  }

  const formik = useFormik({
    initialValues: currentWorkflow,
    validationSchema: editWorkflowSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setIsLoading(true)
      try {
        const RESPONSE: any = await put(
          `workflows/${currentWorkflow._id}`,
          {...values},
          token,
          true,
          'Workflow Updated'
        )
        if (1) {
          formik.values = initialValues
          refreshWorkflow()
        }


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
  const formikState = useFormik({
    initialValues: initialStateValues,
    validationSchema: WorkflowStateSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setIsStateLoading(true)

      try {
        const RESPONSE: any = await post(
          `states/${currentWorkflow._id}`,
          {...values},
          token,
          true,
          'State Created'
        )
        refreshWorkflow()
        setStatesMod(RESPONSE.data)
        formikState.values = initialStateValues

        setSubmitting(false)
        setIsStateLoading(false)
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

  const deleteState = async (toRemove: any) => {
    const newState = statesMod.filter((e: any) => e._id !== toRemove._id)

    const newStateIDs = statesMod.filter((e: any) => e._id !== toRemove._id).map((b) => b._id)


    const RESPONSE = await put(
      `workflows/${currentWorkflow._id}`,
      {...formik.values, states: newStateIDs},
      token,
      true,
      'Workflow state deleted'
    ).then((res) => {
      setCurrentWorkflow(res.data)
      setStatesMod(newState)
      refreshWorkflow()
    })
  }
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
                <h2> Edit workflow</h2>
              </div>
              <div
                className='btn btn-icon btn-sm btn-active-icon-primary'
                data-kt-users-modal-action='close'
                style={{cursor: 'pointer'}}
                onClick={() => setCurrentWorkflow(undefined)}
              >
                <KTIcon iconName='cross' className='fs-1' />
              </div>
            </div>
            {/* begin::Modal body */}

            <div className='modal-body scroll-y mx-5 mx-xl-10 '>
              <div className='card-body'>
                <form
                  className='form w-100 h-100'
                  onSubmit={formik.handleSubmit}
                  noValidate
                  id='workflow_modification_form'
                >
                  <div className='row mb-7 fv-plugins-icon-container'>
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
                      className='form-control form-control-solid'
                      name='title'
                      {...formik.getFieldProps('title')}
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
                  <div className='row mb-7 fv-plugins-icon-container'>
                    <label className='fs-6 fw-semibold form-label mt-3'>
                      <span className='required'>States</span>
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
                    <div
                      style={{minHeight: '50px', overflowX: 'scroll'}}
                      className='form-control form-control-solid d-flex gap-5'
                    >
                      {statesMod?.length > 0 ? (
                        statesMod.map((state) => {
                          return (
                            <div
                              className={`btn btn-${state.color} d-flex gap-2 align-items-center`}
                              key={state.title}
                            >
                              {state.title}
                              <div
                                className=' btn-active-icon-danger'
                                data-kt-users-modal-action='close'
                                onClick={() => deleteState(state)}
                                style={{cursor: 'pointer'}}
                              >
                                <KTIcon iconName='cross' className='fs-1' />
                              </div>
                            </div>
                          )
                        })
                      ) : (
                        <span className='text-muted'>No States</span>
                      )}
                    </div>
                    <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
                  </div>
                  <div className='row mb-7 fv-plugins-icon-container'>
                    <div className='accordion accordion-icon-toggle' id='kt_accordion_2'>
                      <div className='mb-5'>
                        <div
                          className='accordion-header py-3 d-flex'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_accordion_2_item_1'
                        >
                          <span className='accordion-icon'>
                            <i className='ki-duotone ki-arrow-right fs-4'>
                              <span className='path1'></span>
                              <span className='path2'></span>
                            </i>
                          </span>
                          <h3 className='fs-4 fw-semibold mb-0 ms-4'>Add state</h3>
                        </div>

                        <div
                          id='kt_accordion_2_item_1'
                          className='fs-6 collapse show ps-10'
                          data-bs-parent='#kt_accordion_2'
                        >
                          <div className='row'>
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
                                placeholder='Title'
                                {...formikState.getFieldProps('title')}
                                type='text'
                                className='form-control form-control-solid'
                              />
                              {formikState.touched.title && formikState.errors.title && (
                                <div className='fv-plugins-message-container'>
                                  <div className='fv-help-block'>
                                    <span role='alert'>{formikState.errors.title}</span>
                                  </div>
                                </div>
                              )}
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
                                value={newState.color}
                                {...formikState.getFieldProps('color')}
                                className='form-control form-control-solid'
                                placeholder='Title'
                              >
                                <option value='#007bff'>Blue </option>
                                <option value='#ff9800'>Orange </option>
                                <option value='#5b07a9'>Purple </option>
                                <option value='#ff0000'>Red </option>
                                <option value='#008000'>Green</option>
                                <option value='#808080'>Gray </option>
                                <option value='#2f4f4f'>Dark </option>
                                <option value='#f5f5f5'>Light </option>
                                <option value='#ffd700'>Yellow</option>
                                <option value='#00ced1'>Turquoise </option>
                                <option value='#9400d3'>Violet </option>
                                <option value='#ff1493'>Pink </option>
                                <option value='#008cff'>Sky Blue </option>
                                <option value='#4682b4'>Steel Blue </option>
                                <option value='#ff4500'>Orange Red </option>
                              </select>
                              {formikState.touched.color && formikState.errors.color && (
                                <div className='fv-plugins-message-container'>
                                  <div className='fv-help-block'>
                                    <span role='alert'>{formikState.errors.color}</span>
                                  </div>
                                </div>
                              )}
                              <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
                            </div>
                            <div className='col-6'>
                              <label className='fs-6 fw-semibold form-label mt-3'>
                                <span className='required'>Position</span>
                              </label>
                              <select
                                {...formikState.getFieldProps('position')}
                                className='form-control form-control-solid'
                              >
                                <option value=''>Select Position</option>
                                <option value='-1'>Start</option>
                                <option value='0'>Transition</option>
                                <option value='1'>End</option>
                              </select>
                              {formikState.touched.position && formikState.errors.position && (
                                <div className='fv-plugins-message-container'>
                                  <div className='fv-help-block'>
                                    <span role='alert'>{formikState.errors.position}</span>
                                  </div>
                                </div>
                              )}
                              <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
                            </div>
                          </div>
                          <div className='row mb-7 fv-plugins-icon-container'>
                            <div className='d-flex justify-content-end'>
                              <button
                                type='reset'
                                data-kt-contacts-type='cancel'
                                className='btn btn-light me-3'
                                onClick={() => setCurrentWorkflow(undefined)}
                              >
                                Cancel
                              </button>
                              <button
                                type='button'
                                id='kt_sign_in_submit'
                                className='btn btn-success'
                                onClick={() => formikState.submitForm()}
                                disabled={formikState.isSubmitting || !formikState.isValid}
                              >
                                {!IsStateLoading && (
                                  <span className='indicator-label'> Add State</span>
                                )}
                                {IsStateLoading && (
                                  <span className='indicator-progress' style={{display: 'block'}}>
                                    Please wait...
                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                  </span>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
                  </div>

                  <div className='row mb-7 fv-plugins-icon-container'>
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
                    ></textarea>
                    <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
                  </div>
                  <div className='row mb-7 fv-plugins-icon-container'>
                    <div className='d-flex justify-content-end'>
                      <button
                        type='reset'
                        data-kt-contacts-type='cancel'
                        className='btn btn-light me-3'
                        onClick={() => setCurrentWorkflow(undefined)}
                      >
                        Cancel
                      </button>
                      <button
                        type='submit'
                        id='kt_sign_in_submit'
                        className='btn btn-primary'
                        disabled={formik.isSubmitting || !formik.isValid}
                      >
                        {!IsLoading && <span className='indicator-label'>Update</span>}
                        {IsLoading && (
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
            {/* end::Modal body */}
            {/* end::Modal content */}
          </div>
          {/* end::Modal dialog */}
        </div>
        {/* begin::Modal Backdrop */}
      </div>

      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export default EditWorkFlow
