import React, {useEffect, useState} from 'react'
import {Link, useLocation, useParams} from 'react-router-dom'
import {KTIcon, toAbsoluteUrl} from '../../_metronic/helpers'
import {useSelector} from 'react-redux'
import {selectToken, selectUser} from '../../redux/selectors/auth'
import get from '../../lib/get'
import TDocument from '../../types/Document'
import * as swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {TProposal} from '../../types/Proposal'
import post from '../../lib/post'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import put from '../../lib/put'
import TWorkflow from '../../types/Workflow'

const MySwal = withReactContent(swal.default)

type PropTypes = {
  proposal: TProposal
}
const ProposalApprovalSchema = Yup.object().shape({
  title: Yup.string().required('Project Title is required'),
  methodology: Yup.string().required('Project Methodology is required'),
  timeline: Yup.string().required('Project Timeline is required'),
  workflow: Yup.string().required('Project Workflow is required'),
  description: Yup.string().required('Project Description is required'),
})

const ProposalApproval = ({proposal}: PropTypes) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDelete, setisDelete] = useState<boolean>(false)
  const [IsLoading, setIsLoading] = useState<boolean>(false)
  const [isdrpShow, setisdrpShow] = useState<boolean>(false)
  // const [workflows, setWorkflows] = useState<Array<TWorkflow>>()

  const [workflows, setWorkflows] = useState<Array<{title: string; _id: number}>>([])
  const [selectedWorkflows, setSelectedWorkflows] = useState<Array<{title: string; _id: number}>>(
    []
  )

  useEffect(() => {
    const getWorkflows = async () => {
      const RESPONSE = await get(`workflows`, token)
      if (RESPONSE?.data) {
        // setWorkflows(RESPONSE.data)
        setWorkflows(RESPONSE.data)
      }
    }
    getWorkflows()
  }, [])
  const token = useSelector(selectToken)

  const [inputValue, setInputValue] = useState('')

  // const handleInputKeyDown = (e: any) => {
  //   if (e.key === 'Enter' && inputValue) {
  //     setWorkflows([...tags, inputValue.trim()])
  //     setInputValue('')
  //   }
  // }

  const handleTagRemove = (tag: {title: string; _id: number}) => {
    setSelectedWorkflows(selectedWorkflows.filter((t) => t._id !== tag._id))
  }

  const handleAdd = (tag: {title: string; _id: number}) => {
    console.log(selectedWorkflows)
    if (selectedWorkflows.find((e) => e._id === tag._id)) return
    setSelectedWorkflows([...selectedWorkflows, tag])

    console.log([...selectedWorkflows, tag])
  }

  const handleApprove = async () => {}

  const formik = useFormik({
    initialValues: {...proposal},
    validationSchema: ProposalApprovalSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setIsLoading(true)
      try {
        const RESPONSE: any = await post(
          'proposals/approve',
          {...values},
          token,
          true,
          'Project Approved'
        )

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
      <div className='card'>
        <div className='card-header'>
          <div className='card-title fs-3 fw-bold'>Proposal</div>
        </div>
        <form
          className='form w-100 h-100'
          onSubmit={formik.handleSubmit}
          noValidate
          id='proposal_approval_form'
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
              <div className='col-lg-6'>
                <div className='row'>
                  <div className='col-xl-3'>
                    <div className='fs-6 fw-semibold mt-2 mb-3'>Project Author</div>
                  </div>
                  <div className='col-xl-9 fv-row fv-plugins-icon-container'>
                    <input
                      type='text'
                      className='form-control form-control-solid'
                      readOnly={true}
                      value={proposal.student.lastName + ' ' + proposal.student.firstName}
                    />
                    <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='row'>
                  <div className='col-xl-3'>
                    <div className='fs-6 fw-semibold mt-2 mb-3'>Project Title</div>
                  </div>
                  <div className='col-xl-9 fv-row fv-plugins-icon-container'>
                    <input
                      type='text'
                      className='form-control form-control-solid'
                      {...formik.getFieldProps('title')}
                      readOnly={true}
                      value={proposal.title}
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
              </div>
            </div>
            <div className='row mb-8'>
              <div className='col-lg-6'>
                <div className='row'>
                  <div className='col-xl-3'>
                    <div className='fs-6 fw-semibold mt-2 mb-3'>Project Description</div>
                  </div>
                  <div className='col-xl-9 fv-row fv-plugins-icon-container'>
                    <textarea
                      {...formik.getFieldProps('description')}
                      className='form-control form-control-solid h-100px'
                    >
                      {proposal?.description}
                    </textarea>
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
              </div>
              <div className='col-lg-6'>
                <div className='row'>
                  <div className='col-xl-3'>
                    <div className='fs-6 fw-semibold mt-2 mb-3'>Project Timeline</div>
                  </div>
                  <div className='col-xl-9 fv-row fv-plugins-icon-container'>
                    <input
                      type='text'
                      {...formik.getFieldProps('timeline')}
                      className='form-control form-control-solid'
                      readOnly={true}
                      value={proposal.timeline}
                    />
                    {formik.touched.timeline && formik.errors.timeline && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.timeline}</span>
                        </div>
                      </div>
                    )}
                    <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-8'>
              {/* <div className='col-6'>
                <div className='d-flex flex-column mb-8 fv-row'>
                  <label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
                    <span>Workflows</span>
                  </label>
                  <div style={{position: 'relative'}}>
                    <div
                      onClick={() => setisdrpShow(!isdrpShow)}
                      style={{minHeight: '80px', overflowX: 'scroll'}}
                      className='form-control form-control-solid d-flex gap-5'
                    >
                      {selectedWorkflows?.map((workflow) => (
                        <div
                          className='btn btn-secondary d-flex gap-2 align-items-center'
                          key={workflow.title}
                        >
                          {workflow.title}
                          <div
                            className=' btn-active-icon-danger'
                            data-kt-users-modal-action='close'
                            onClick={() => handleTagRemove(workflow)}
                            style={{cursor: 'pointer'}}
                          >
                            <KTIcon iconName='cross' className='fs-1' />
                          </div>
                        </div>
                      ))}
                    </div>

                    {isdrpShow && (
                      <div
                        style={{
                          top: '80px',
                          height: 'max-content',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'absolute',
                        }}
                        className='tags-list card'
                      >
                        {selectedWorkflows?.length !== 0
                          ? workflows?.map((t) => {
                              const isTagSelected = !selectedWorkflows?.some((e) => e._id === t._id)
                              return (
                                isTagSelected && (
                                  <div
                                    key={t._id}
                                    onClick={() => handleAdd(t)}
                                    style={{cursor: 'pointer'}}
                                    className='btn bg-active-secondary btn-active-secondary'
                                  >
                                    {t.title}
                                  </div>
                                )
                              )
                            })
                          : workflows?.map((t) => (
                              <div
                                key={t._id}
                                onClick={() => handleAdd(t)}
                                style={{cursor: 'pointer'}}
                                className='btn bg-active-secondary btn-active-secondary'
                              >
                                {t.title}
                              </div>
                            ))}
                        {selectedWorkflows?.length === workflows?.length && (
                          <div
                            style={{cursor: 'pointer'}}
                            className='btn bg-active-secondary text-muted'
                          >
                            All Workflows selected
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div> */}{' '}
              <div className='col-6'>
                <div className='row'>
                  <div className='col-xl-3'>
                    <div className='fs-6 fw-semibold mt-2 mb-3'>Workflow</div>
                  </div>
                  <div className='col-xl-9 fv-row fv-plugins-icon-container'>
                    <select
                      {...formik.getFieldProps('workflow')}
                      className='form-control form-control-solid'
                    >
                      {workflows.map((workflow) => (
                        <>
                          <option value=''>Select Project Workflow</option>
                          <option key={workflow._id} value={workflow._id}>
                            {workflow.title}
                          </option>
                        </>
                      ))}
                    </select>
                    {formik.touched.workflow && formik.errors.workflow && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.workflow}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='row'>
                  <div className='col-xl-3'>
                    <div className='fs-6 fw-semibold mt-2 mb-3'>Project Methodology</div>
                  </div>
                  <div className='col-xl-9 fv-row fv-plugins-icon-container'>
                    <input
                      type='text'
                      {...formik.getFieldProps('methodology')}
                      className='form-control form-control-solid'
                      readOnly={true}
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
            </div>
            <div className='row mb-8'>
              <div className='col-lg-6'>
                <div className='row'>
                  <div className='col-xl-3'>
                    <div className='fs-6 fw-semibold mt-2 mb-3'>Project Field</div>
                  </div>
                  <div className='col-xl-9 fv-row fv-plugins-icon-container'>
                    <input
                      type='text'
                      {...formik.getFieldProps('field')}
                      className='form-control form-control-solid'
                      readOnly={true}
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
              </div>
            </div>
          </div>
          <div className='card-footer'>
            <div className='row'>
              <div className='col-6'>
                <button
                  type='submit'
                  id='kt_sign_in_submit'
                  className='btn btn-primary'
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {!IsLoading && <span className='indicator-label'>Approve</span>}
                  {IsLoading && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          <input type='hidden' />
        </form>
      </div>
    </>
  )
}

export default ProposalApproval
