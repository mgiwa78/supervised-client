import React, {useEffect, useState} from 'react'
import {Link, useLocation, useParams} from 'react-router-dom'
import {KTIcon, toAbsoluteUrl} from '../../_metronic/helpers'
import {useSelector} from 'react-redux'
import {selectToken, selectUser} from '../../redux/selectors/auth'
import TDocument from '../../types/Document'
import * as swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {TProposal} from '../../types/Proposal'
import post from '../../lib/post'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import put from '../../lib/put'
import TWorkflow from '../../types/Workflow'
import {TProject} from '../../types/Project'
import ProjectPDF from '../../pdf-export/project-details'
import {PDFDownloadLink} from '@react-pdf/renderer'

const MySwal = withReactContent(swal.default)

type PropTypes = {
  project: TProject
  refreshProject: Function
}
const EditProjectSchema = Yup.object().shape({
  title: Yup.string().required('Project Title is required'),
  methodology: Yup.string().required('Project Methodology is required'),
  description: Yup.string().required('Project Description is required'),
})

const EditProject = ({project, refreshProject}: PropTypes) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDelete, setisDelete] = useState<boolean>(false)
  const [IsLoading, setIsLoading] = useState<boolean>(false)
  const [isdrpShow, setisdrpShow] = useState<boolean>(false)
  // const [workflows, setWorkflows] = useState<Array<TWorkflow>>()

  const [workflows, setWorkflows] = useState<Array<{title: string; _id: number}>>([])
  const [selectedWorkflows, setSelectedWorkflows] = useState<Array<{title: string; _id: number}>>(
    []
  )

  const token = useSelector(selectToken)

  const [inputValue, setInputValue] = useState('')

  // const handleInputKeyDown = (e: any) => {
  //   if (e.key === 'Enter' && inputValue) {
  //     setWorkflows([...tags, inputValue.trim()])
  //     setInputValue('')
  //   }
  // }

  const formik = useFormik({
    initialValues: {...project},
    validationSchema: EditProjectSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setIsLoading(true)
      try {
        await put(`projects/${project._id}`, {...values}, token, true, 'Project Updated')
        // refreshProject()
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
          <div className='card-title fs-3 fw-bold'>Update Project</div>
          <div className='card-toolbar'>
            <PDFDownloadLink
              document={<ProjectPDF project={project} />}
              fileName={`${project.title}_details.pdf`}
            >
              {({blob, url, loading, error}) =>
                loading ? (
                  'Loading document...'
                ) : (
                  <button className='btn btn-sm btn-light-primary'>
                    <KTIcon iconName='file-down' className='fs-2' />
                    Export
                  </button>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>

        <form
          className='form w-100 h-100'
          onSubmit={formik.handleSubmit}
          noValidate
          id='update_project_form'
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
                      value={project.student.lastName + ' ' + project.student.firstName}
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
                      {project?.description}
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
                    <div className='fs-6 fw-semibold mt-2 mb-3'>Project Methodology</div>
                  </div>
                  <div className='col-xl-9 fv-row fv-plugins-icon-container'>
                    <input
                      type='text'
                      {...formik.getFieldProps('methodology')}
                      className='form-control form-control-solid'
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
          </div>
          <input type='hidden' />
        </form>
      </div>
    </>
  )
}

export default EditProject
