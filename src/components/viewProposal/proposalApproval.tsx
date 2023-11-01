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

const MySwal = withReactContent(swal.default)

type PropTypes = {
  proposal: TProposal
}
const ProposalApprovalSchema = Yup.object().shape({
  title: Yup.string().required('Project Title is required'),
  methodology: Yup.string().required('Project Methodology is required'),
  timeline: Yup.string().required('Project Timeline is required'),
  description: Yup.string().required('Project Description is required'),
  field: Yup.string().required('Project field is required'),
})

const ProposalApproval = ({proposal}: PropTypes) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDelete, setisDelete] = useState<boolean>(false)
  const [IsLoading, setIsLoading] = useState<boolean>(false)

  const token = useSelector(selectToken)

  const [tags, setTags] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value)
  }

  const handleInputKeyDown = (e: any) => {
    if (e.key === 'Enter' && inputValue) {
      setTags([...tags, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleTagRemove = (tag: any) => {
    setTags(tags.filter((t) => t !== tag))
  }
  const handleApprove = async () => {}

  const formik = useFormik({
    initialValues: {...proposal},
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setIsLoading(true)
      console.log('asdda')
      try {
        console.log(values)

        const RESPONSE: any = await post(
          'proposals/approve',
          {...proposal},
          token,
          true,
          'Project Approved'
        )

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
