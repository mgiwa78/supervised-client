import React, {useState} from 'react'
import CreateTicket from './createTicket'

const HelpCenterTickets = () => {
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
                  <div className='d-flex mb-10'>
                    <i className='ki-duotone ki-file-added fs-2x me-5 ms-n1 mt-2 text-success'>
                      <span className='path1'></span>
                      <span className='path2'></span>
                    </i>
                    <div className='d-flex flex-column'>
                      <div className='d-flex align-items-center mb-2'>
                        <a
                          href='../../demo1/dist/apps/support-center/tickets/view.html'
                          className='text-dark text-hover-primary fs-4 me-3 fw-semibold'
                        >
                          How to Create project workflow?
                        </a>
                        <span className='badge badge-light-warning my-1'>Pending</span>
                      </div>
                      <span className='text-muted fw-semibold fs-6'>
                        By supervised to save tons and more to time money projects are listed
                        amazing
                        <br />
                        outstanding projects are listed
                      </span>
                    </div>
                  </div>
                </div>
                <ul className='pagination'>
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
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HelpCenterTickets
