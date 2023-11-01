import React, {useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import post from '../../lib/post'
import {useSelector} from 'react-redux'
import {selectAuth} from '../../redux/selectors/auth'
import {useDropzone} from 'react-dropzone'
import {storage} from '../../utils/firebase'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {DateRange} from 'react-date-range'
import put from '../../lib/put'

const RepeaterItem = ({
  onRemove,
  item,
  i,
  Change,
}: {
  onRemove: any
  item: string
  i: number
  Change: Function
}) => {
  return (
    <div className='form-group row'>
      <div className='col-md-8'>
        <label className='form-label'>Objective:</label>
        <input
          type='text'
          name='Objective'
          value={item}
          onChange={(e) => Change(i, e.target.value)}
          className='form-control mb-2 mb-md-0 objective'
          placeholder='objectives'
        />
      </div>
      <div className='col-md-4'>
        <button onClick={onRemove} className='btn btn-sm btn-light-danger mt-3 mt-md-8'>
          <i className='ki-duotone ki-trash fs-5'></i>
          Delete
        </button>
      </div>
    </div>
  )
}

const loginSchema = Yup.object().shape({
  title: Yup.string().required('Project Title is required'),
  description: Yup.string().required('Project Description is required'),
  timeline: Yup.string().required('Project Timeline is required'),
  field: Yup.string().required('Project Field is required'),
  methodology: Yup.string().required('Project Methodology is required'),
})

const initialValues = {
  title: 'Automated Customer Support System',
  description:
    'This project aims to develop an automated customer support system using AI and natural language processing to enhance customer service interactions.',
  objectives: [
    'Implement a chatbot for instant customer query resolution.',
    'Integrate sentiment analysis to gauge customer satisfaction levels.',
    'Provide personalized recommendations based on customer preferences.',
    'Enable seamless handoff to human agents for complex issues.',
  ],
  timeline: '2 Months',
  methodology: 'Experimental Study',
  field: 'Computer Science',
}

const CreateProposal = () => {
  const {token} = useSelector(selectAuth)
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ])
  const [items, setItems] = useState([''])

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone()

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  const addItem = () => {
    setItems([...items, ''])
  }

  const removeItem = (index: number) => {
    const updatedItems = items.filter((item, i) => i !== index)
    setItems(updatedItems)
  }

  const ItemhandleObjChange = (index: number, value: string) => {
    const updatedItems = [...items.slice(0, index), value, ...items.slice(index + 1)]
    setItems(updatedItems)
    formik.values.objectives = items
  }

  const hadlefileFileUpload = async (proposalId: string, file: any) => {
    const fileRefPathRef = ref(storage, `documents/proposals/${proposalId}/${file.name}`)
    await uploadBytes(fileRefPathRef, file).then((snapshot) => {})

    return {ref: fileRefPathRef, name: file.name}
  }

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const RESPONSE: any = await post('proposals', {...values}, token, false)

        if (RESPONSE.data) {
          const all = await acceptedFiles.map(async (e) => {
            const fileUploadData = await hadlefileFileUpload(RESPONSE.data._id, e)

            const a = await getDownloadURL(fileUploadData.ref)
            return {path: a, name: fileUploadData.name}
          })
          const resolveAll = await Promise.all(all)

          const RES: any = await put(
            `proposals/${RESPONSE.data._id}`,
            {files: resolveAll},
            token,
            true,
            'Proposal Submitted'
          )
        }

        formik.values = initialValues
        setItems([''])
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

  // const onDrop = (e: Array<File>) => {
  //   e.map(() => hadlefileFileUpload(e))
  // }

  return (
    <div className='card'>
      <div className='card-header'>
        <div className='card-title fs-3 fw-bold'>New Proposal</div>
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
                {...formik.getFieldProps('description')}
                name='description'
                className='form-control form-control-solid h-100px'
              ></textarea>
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
                {...formik.getFieldProps('objectives')}
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
          <div className='row mb-8'></div>
          <div className='row mb-8'>
            <div className='col-xl-3'>
              <div className='fs-6 fw-semibold mt-2 mb-3'> Timeline</div>
            </div>
            <div className='col-xl-9 fv-row fv-plugins-icon-container'>
              <input
                type='text'
                {...formik.getFieldProps('timeline')}
                className={clsx('form-control form-control-solid')}
                name='timeline'
              />
              {formik.touched.timeline && formik.errors.timeline && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>Project timeline is required</span>
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
          <div className='row mb-8'>
            <div className='col-xl-3'>
              <div className='fs-6 fw-semibold mt-2 mb-3'> Proposal </div>
            </div>
            <div className='mb-8' {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p>Drop files here to update</p>
            </div>
            <div>
              <h4 className='pt-5'>Files</h4>
              <ul>{files}</ul>
            </div>
          </div>
          <div className='row mb-8'>
            <div className='col-xl-3'>
              {/* <div className='fs-6 fw-semibold mt-2 mb-3'> Objectives </div> */}
            </div>
            <div id='kt_docs_repeater_basic'>
              <div className='row justify-content-center'>
                <div data-repeater-list='kt_docs_repeater_basic'>
                  {items.map((item, index) => (
                    <div className='mb-5' data-repeater-item key={index}>
                      <RepeaterItem
                        key={items.length}
                        item={item}
                        Change={ItemhandleObjChange}
                        i={index}
                        onRemove={() => removeItem(items.length)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className='form-group mt-5'>
                <button type='button' onClick={addItem} className='btn btn-light-primary'>
                  <i className='ki-duotone ki-plus fs-3'></i>
                  Add
                </button>
              </div>
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
            {!loading && <span className='indicator-label'>Submit</span>}
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

export default CreateProposal
