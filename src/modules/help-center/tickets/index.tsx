import React, {useEffect, useState} from 'react'
import CreateTicket from './createTicket'
import {useSelector} from 'react-redux'
import {selectToken} from '../../../redux/selectors/auth'
import TTicket from '../../../types/ticket'
import get from '../../../lib/get'

type Prop = {
  handleViewTicket: Function
}
const HelpCenterTickets = ({handleViewTicket}: Prop) => {
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
    <>
      <div className='card'>
        <div className='card-body'>
          <div className='d-flex flex-column flex-xl-row p-7'>
            <div className='flex-lg-row-fluid me-xl-15 mb-20 mb-xl-0'>
              <div className='mb-0'>
                <form method='post' action='#' className='form mb-15'>
                  <div className='position-relative'>
                    <i className='ki-duotone ki-magnifier fs-1 text-primary position-absolute top-50 translate-middle ms-9'>
                      <span className='path1'></span>
                      <span className='path2'></span>
                    </i>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid ps-14'
                      name='search'
                      value=''
                      placeholder='Search'
                    />
                  </div>
                </form>
                <h1 className='text-dark mb-10'>Public Tickets</h1>
                <div className='mb-10'>
                  {tickets?.length > 1 ? (
                    tickets?.map((ticket) => (
                      <div
                        style={{cursor: 'pointer'}}
                        className='d-flex mb-10'
                        onClick={() => handleViewTicket(ticket)}
                      >
                        <i className='ki-duotone ki-file-added fs-2x me-5 ms-n1 mt-2 text-success'>
                          <span className='path1'></span>
                          <span className='path2'></span>
                        </i>
                        <div className='d-flex flex-column'>
                          <div className='d-flex align-items-center mb-2'>
                            <a className='text-dark text-hover-primary fs-4 me-3 fw-semibold'>
                              {ticket.subject}
                            </a>
                            <span className='badge badge-light-warning my-1'>
                              {' '}
                              {ticket?.status || 'Pending'}
                            </span>
                          </div>
                          <span className='text-muted fw-semibold fs-6'>{ticket.description}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='d-flex mb-10'>
                      <span className='text-muted fw-semibold fs-6'>No Tickets</span>
                    </div>
                  )}
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
    </>
  )
}

export default HelpCenterTickets
