import React, {useEffect, useState} from 'react'
import get from '../../../lib/get'
import TFaqCategories from '../../../types/faqCategories'
import {selectToken} from '../../../redux/selectors/auth'
import {useSelector} from 'react-redux'

type Props = {
  setCreateTicket: Function
}

const CreateTicket = ({setCreateTicket}: Props) => {
  const [faqCategories, setFaqCategories] = useState<Array<TFaqCategories>>()
  const token = useSelector(selectToken)

  const getFaqCategories = async () => {
    const RESPONSE = await get('faqCategories', token)
    if (RESPONSE?.data) {
      setFaqCategories(RESPONSE.data)
    }
  }
  useEffect(() => {
    getFaqCategories()
  }, [])
  return (
    <>
      <div
        className='modal fade show'
        id='kt_modal_new_ticket'
        tabIndex={-1}
        aria-modal='true'
        role='dialog'
        style={{display: 'block'}}
      >
        <div className='modal-dialog modal-dialog-centered mw-750px'>
          <div className='modal-content rounded'>
            <div className='modal-header pb-0 border-0 justify-content-end'>
              <div
                onClick={() => setCreateTicket(false)}
                className='btn btn-sm btn-icon btn-active-color-primary'
                data-bs-dismiss='modal'
              >
                <i className='ki-duotone ki-cross fs-1'>
                  <span className='path1'></span>
                  <span className='path2'></span>
                </i>
              </div>
            </div>
            <div className='modal-body scroll-y px-10 px-lg-15 pt-0 pb-15'>
              <form
                id='kt_modal_new_ticket_form'
                className='form fv-plugins-bootstrap5 fv-plugins-framework'
                action='#'
              >
                <div className='mb-13 text-center'>
                  <h1 className='mb-3'>Create Ticket</h1>
                </div>
                <div className='d-flex flex-column mb-8 fv-row fv-plugins-icon-container'>
                  <label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
                    <span className='required'>Subject</span>
                    <span
                      className='ms-2'
                      data-bs-toggle='tooltip'
                      aria-label='Specify a subject for your issue'
                      data-bs-original-title='Specify a subject for your issue'
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
                    placeholder='Enter your ticket subject'
                    name='subject'
                  />
                  <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
                </div>
                <div className='row g-9 mb-8'>
                  <div className='col-md-12 fv-row'>
                    <label className='required fs-6 fw-semibold mb-2'>Category</label>
                    <select
                      className='form-select form-select-solid select2-hidden-accessible'
                      data-control='select2'
                      data-hide-search='true'
                      data-placeholder='Select a category'
                      name='category'
                      data-select2-id='select2-data-9-d4ue'
                      tabIndex={-1}
                      aria-hidden='true'
                      data-kt-initialized='1'
                    >
                      <option value='' data-select2-id='select2-data-11-7wib'>
                        Select a category...
                      </option>
                      {faqCategories?.map((cat) => (
                        <option value={cat._id}>{cat.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='d-flex flex-column mb-8 fv-row fv-plugins-icon-container'>
                  <label className='fs-6 fw-semibold mb-2 required'>Description</label>
                  <textarea
                    className='form-control form-control-solid'
                    rows={4}
                    name='description'
                    placeholder='Type your ticket description'
                  ></textarea>
                  <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback'></div>
                </div>

                <div className='text-center'>
                  <button
                    onClick={() => setCreateTicket(false)}
                    type='reset'
                    id='kt_modal_new_ticket_cancel'
                    className='btn btn-light me-3'
                  >
                    Cancel
                  </button>
                  <button type='submit' id='kt_modal_new_ticket_submit' className='btn btn-primary'>
                    <span className='indicator-label'>Submit</span>
                    <span className='indicator-progress'>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show' onClick={() => setCreateTicket(false)}></div>
    </>
  )
}

export default CreateTicket
