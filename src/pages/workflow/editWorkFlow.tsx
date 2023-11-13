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
}

const initialValues = {
  title: '',
  color: '',
  _id: '',
  count: '',
  description: '',
}

const editWorkflowSchema = Yup.object().shape({
  title: Yup.string().required('Project Title is required'),
  color: Yup.string().required('Project Methodology is required'),
  // description: Yup.string().required('Project Description is required'),
})

const EditWorkFlow = ({currentWorkflow, setCurrentWorkflow}: PropTypes) => {
  const token = useSelector(selectToken)
  const [IsLoading, setIsLoading] = useState<boolean>(false)
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
    console.log(RESPONSE)
    console.log(RESPONSE.data)
    currentWorkflow.states = RESPONSE.data
  }

  const deleteState = (toRemove: any) => {
    setStatesMod(
      statesMod.filter((e: any) => {
        console.log(e._id === toRemove._id)
        return e._id !== toRemove._id
      })
    )

    console.log(statesMod)
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
                          console.log(statesMod)
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
                                value={newState.title}
                                onChange={(e) => handleNewStateChange(e)}
                                type='text'
                                className='form-control form-control-solid'
                                name='title'
                              />
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
                                onChange={(e) => handleNewStateChange(e)}
                                value={newState.color}
                                name='color'
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
                            <div className='col-6'>
                              <label className='fs-6 fw-semibold form-label mt-3'>
                                <span className='required'>Position</span>
                              </label>
                              <select
                                {...formik.getFieldProps('position')}
                                className='form-control form-control-solid'
                                onChange={(e) => handleNewStateChange(e)}
                              >
                                <option value=''>Select Position</option>
                                <option value='-1'>Start</option>
                                <option value='0'>Transition</option>
                                <option value='1'>End</option>
                              </select>
                              <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
                            </div>
                          </div>
                          <div className='row-fv mt-5'>
                            <button
                              onClick={() => addState()}
                              className='btn btn-success'
                              type='button'
                            >
                              Add State
                            </button>
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
