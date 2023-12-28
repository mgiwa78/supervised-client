import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {selectToken} from '../../../redux/selectors/auth'
import TTicket from '../../../types/ticket'
import get from '../../../lib/get'
import {formatDistanceToNow} from 'date-fns'

type Props = {ticket: TTicket}

const Ticket = ({ticket}: Props) => {
  const token = useSelector(selectToken)
  const [tickets, setTickets] = useState<Array<TTicket>>()

  const getTicket = async () => {
    const RESPONSE = await get('tickets', token)

    if (RESPONSE?.data) {
      setTickets(RESPONSE.data)
    }
  }

  useEffect(() => {
    getTicket()
  }, [token])
  
  return (
    <div className='card'>
      <div className='card-body'>
        <div className='d-flex flex-column flex-xl-row p-7'>
          <div className='flex-lg-row-fluid me-xl-15 mb-20 mb-xl-0'>
            <div className='mb-0'>
              <div className='d-flex align-items-center mb-12'>
                <i className='ki-duotone ki-file-added fs-4qx text-success ms-n2 me-3'>
                  <span className='path1'></span>
                  <span className='path2'></span>
                </i>
                <div className='d-flex flex-column'>
                  <h1 className='text-gray-800 fw-semibold'>{ticket.subject}</h1>
                  <div className=''>
                    <span className='fw-semibold text-muted me-6'>
                      Category:
                      <a href='#' className='text-muted text-hover-primary'>
                        {ticket?.category?.title}
                      </a>
                    </span>
                    <span className='fw-semibold text-muted me-6'>
                      By:
                      <a href='#' className='text-muted text-hover-primary'>
                        {ticket?.author?.lastName + ' ' + ticket?.author?.lastName}
                      </a>
                    </span>
                    <span className='fw-semibold text-muted'>
                      Created:
                      <span className='fw-bold text-gray-600 me-1'>
                        {' '}
                        {formatDistanceToNow(new Date(ticket?.createdAt), {addSuffix: true})}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className='mb-15' data-select2-id='select2-data-140-7rzi'>
                <div className='mb-15 fs-5 fw-normal text-gray-800'>
                  <div className='mb-5 fs-5'>Hello,</div>
                  <div className='mb-10'>{ticket.description}</div>

                  <div className='row mb-7'>
                    <div className='col-sm-3 fv-row mb-3' data-select2-id='select2-data-155-jmvd'>
                      <label className='fs-6 fw-semibold mb-2'>Status</label>
                      <select
                        className='form-select form-select-solid select2-hidden-accessible'
                        data-control='select2'
                        data-placeholder='Status'
                        data-hide-search='true'
                        data-select2-id='select2-data-15-ycg1'
                        tabIndex={-1}
                        aria-hidden='true'
                        data-kt-initialized='1'
                      >
                        <option value='1' selected data-select2-id='select2-data-17-hr5m'>
                          Open
                        </option>
                        <option value='2' data-select2-id='select2-data-156-iw2x'>
                          Pending
                        </option>
                        <option value='3' data-select2-id='select2-data-157-y9i5'>
                          Resolved
                        </option>
                        <option value='3' data-select2-id='select2-data-158-kpjw'>
                          Closed
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className='mb-0'>
                    <textarea
                      className='form-control form-control-solid placeholder-gray-600 fw-bold fs-4 ps-9 pt-7'
                      rows={6}
                      name='message'
                      placeholder='Share Your Knowledge'
                    ></textarea>
                    <button
                      type='submit'
                      className='btn btn-primary mt-n20 mb-20 position-relative float-end me-7'
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>

              {/* <ul className='pagination'>
                <li className='page-item previous disabled'>
                  <a href='#' className='page-link'>
                    <i className='previous'></i>
                  </a>
                </li>
                <li className='page-item'>
                  <a href='#' className='page-link'>
                    1
                  </a>
                </li>
                <li className='page-item active'>
                  <a href='#' className='page-link'>
                    2
                  </a>
                </li>
                <li className='page-item'>
                  <a href='#' className='page-link'>
                    3
                  </a>
                </li>
                <li className='page-item'>
                  <a href='#' className='page-link'>
                    4
                  </a>
                </li>
                <li className='page-item'>
                  <a href='#' className='page-link'>
                    5
                  </a>
                </li>
                <li className='page-item'>
                  <a href='#' className='page-link'>
                    6
                  </a>
                </li>
                <li className='page-item next'>
                  <a href='#' className='page-link'>
                    <i className='next'></i>
                  </a>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket
