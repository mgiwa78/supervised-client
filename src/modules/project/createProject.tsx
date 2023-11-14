import React, {useEffect, useState} from 'react'
import {Link, useLocation, useParams} from 'react-router-dom'
import {KTIcon, toAbsoluteUrl} from '../../_metronic/helpers'
import {useSelector} from 'react-redux'
import {selectToken, selectUser} from '../../redux/selectors/auth'
import get from '../../lib/get'
import TDocument from '../../types/Document'
import * as swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import post from '../../lib/post'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import put from '../../lib/put'
import User from '../../types/User'

const MySwal = withReactContent(swal.default)

const initialValues = {
  title: '',
  methodology: '',
  timeline: '',
  description: '',
  field: '',
}
const CreateProjectSchema = Yup.object().shape({
  title: Yup.string().required('Project Title is required'),
  methodology: Yup.string().required('Project Methodology is required'),
  timeline: Yup.string().required('Project Timeline is required'),
  description: Yup.string().required('Project Description is required'),
  field: Yup.string().required('Project field is required'),
})

const CreateProject = () => {
  const [students, setStudents] = useState<Array<User>>()
  const [student, setStudent] = useState<User>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDelete, setisDelete] = useState<boolean>(false)
  const [IsLoading, setIsLoading] = useState<boolean>(false)
  const [authorDrpdw, setauthorDrpdw] = useState<boolean>(false)

  const token = useSelector(selectToken)

  const [tags, setTags] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value)
  }
  const handleSetStudent = (student: any) => {
    setauthorDrpdw(false)
    setStudent(student)
  }

  const handleInputKeyDown = (e: any) => {
    if (e.key === 'Enter' && inputValue) {
      setTags([...tags, inputValue.trim()])
      setInputValue('')
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      const RESPONSE = await get(`users/students?onDepartment=false`, token)
      if (RESPONSE.data) {
        setStudents(RESPONSE.data)
      }
    }
    getUsers()
  }, [])

  const handleTagRemove = (tag: any) => {
    setTags(tags.filter((t) => t !== tag))
  }
  const toggleAuthDrdw = () => {
    setauthorDrpdw(!authorDrpdw)
  }

  const formik = useFormik({
    initialValues,
    validationSchema: CreateProjectSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setIsLoading(true)
      console.log('asdda')
      try {
        console.log(values)

        const RESPONSE: any = await post(
          'projects',
          {...values, student: student._id},
          token,
          true,
          'Project Submitted'
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
      <div className='card'>
        <div className='card-header'>
          <div className='card-title fs-3 fw-bold'>Project</div>
        </div>
        <form
          className='form w-100 h-100'
          onSubmit={formik.handleSubmit}
          noValidate
          id='project_creation_form'
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
                    <div className='fs-6 fw-semibold mt-2 mb-3'> Author</div>
                  </div>
                  <div className='col-xl-9 fv-row fv-plugins-icon-container'>
                    <div className='' style={{position: 'relative'}}>
                      <div
                        onClick={() => toggleAuthDrdw()}
                        className='form-control form-control-solid'
                      >
                        {student ? (
                          <div className='d-flex align-items-center'>
                            <div className='symbol symbol-40px symbol-circle'>
                              <span className='symbol-label bg-secondary text-inverse-secondary fw-bold'>
                                {student?.lastName[0]}
                              </span>
                            </div>
                            <div className='ms-4'>
                              <a
                                href='../../demo1/dist/apps/contacts/view-contact.html'
                                className='fs-6 fw-bold text-gray-900 text-hover-primary mb-2'
                              >
                                {student.lastName + ' ' + student.firstName}
                              </a>
                              <div className='fw-semibold fs-7 text-muted'>{student.email}</div>
                            </div>
                          </div>
                        ) : (
                          'Select Student'
                        )}
                      </div>
                      {authorDrpdw && (
                        <div
                          style={{position: 'absolute'}}
                          className='card card-flush'
                          id='kt_contacts_list'
                        >
                          <div className='card-header pt-7' id='kt_contacts_list_header'>
                            <div className='row'>
                              <form
                                className='d-flex align-items-center position-relative w-100 m-0'
                                autoComplete='off'
                              >
                                <div>
                                  <i className='ki-duotone ki-magnifier fs-3 text-gray-500 position-absolute top-50 ms-5 translate-middle-y'>
                                    <span className='path1'></span>
                                    <span className='path2'></span>
                                  </i>
                                  <input
                                    type='text'
                                    className='form-control form-control-solid ps-13'
                                    name='search'
                                    value=''
                                    placeholder='Search Students'
                                  />
                                </div>
                                <div
                                  className='btn btn-icon btn-sm btn-active-icon-primary'
                                  data-kt-users-modal-action='close'
                                  onClick={() => toggleAuthDrdw()}
                                  style={{cursor: 'pointer'}}
                                >
                                  <KTIcon iconName='cross' className='fs-1' />
                                </div>
                              </form>
                            </div>
                          </div>
                          <div className='card-body pt-5' id='kt_contacts_list_body'>
                            <div
                              className='scroll-y me-n5 pe-5 h-300px h-xl-auto'
                              data-kt-scroll='true'
                              data-kt-scroll-activate='{default: false, lg: true}'
                              data-kt-scroll-max-height='auto'
                              data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_contacts_list_header'
                              data-kt-scroll-wrappers='#kt_content, #kt_contacts_list_body'
                              data-kt-scroll-stretch='#kt_contacts_list, #kt_contacts_main'
                              data-kt-scroll-offset='5px'
                              style={{maxHeight: '763px'}}
                            >
                              {students.length > 0 &&
                                students &&
                                !IsLoading &&
                                students.map((student) => (
                                  <div
                                    className='d-flex flex-stack py-4 btn btn-active-light-info'
                                    onClick={() => handleSetStudent(student)}
                                  >
                                    <div className='d-flex align-items-center '>
                                      <div className='symbol symbol-40px symbol-circle'>
                                        <span className='symbol-label bg-secondary text-inverse-secondary fw-bold'>
                                          {student?.lastName[0]}
                                        </span>
                                      </div>
                                      <div className='ms-4'>
                                        <span className='fs-6 fw-bold text-gray-900 text-hover-primary mb-2'>
                                          {student.lastName + ' ' + student.firstName}
                                        </span>
                                        <div className='fw-semibold fs-7 text-muted'>
                                          {student.email}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              {IsLoading && (
                                <div className='fv-row d-flex justify-content-center mh-300px'>
                                  <div className='h-40px w-40px spinner-border spinner-border-sm align-middle ms-2'></div>
                                </div>
                              )}
                              <div className='separator separator-dashed d-none'></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='row'>
                  <div className='col-xl-3'>
                    <div className='fs-6 fw-semibold mt-2 mb-3'> Title</div>
                  </div>
                  <div className='col-xl-9 fv-row fv-plugins-icon-container'>
                    <input
                      type='text'
                      placeholder='Project Title'
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
                    <div className='fs-6 fw-semibold mt-2 mb-3'> Description</div>
                  </div>
                  <div className='col-xl-9 fv-row fv-plugins-icon-container'>
                    <textarea
                      {...formik.getFieldProps('description')}
                      className='form-control form-control-solid h-100px'
                      placeholder='Project Description'
                    >
                      {formik.values.description}
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
                    <div className='fs-6 fw-semibold mt-2 mb-3'> Timeline</div>
                  </div>
                  <div className='col-xl-9 fv-row fv-plugins-icon-container'>
                    <input
                      type='text'
                      placeholder='Project Timeline'
                      {...formik.getFieldProps('timeline')}
                      className='form-control form-control-solid'
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
                    <div className='fs-6 fw-semibold mt-2 mb-3'> Methodology</div>
                  </div>
                  <div className='col-xl-9 fv-row fv-plugins-icon-container'>
                    <input
                      type='text'
                      placeholder='Project Methodology'
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
              <div className='col-lg-6'>
                <div className='row'>
                  <div className='col-xl-3'>
                    <div className='fs-6 fw-semibold mt-2 mb-3'> Field</div>
                  </div>
                  <div className='col-xl-9 fv-row fv-plugins-icon-container'>
                    <input
                      type='text'
                      {...formik.getFieldProps('field')}
                      placeholder='Project Field'
                      className='form-control form-control-solid'
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
                  {!IsLoading && <span className='indicator-label'>Create</span>}
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

export default CreateProject
