import React, {useEffect, useState} from 'react'
import TFaq from '../../../types/faq'
import get from '../../../lib/get'
import {useSelector} from 'react-redux'
import {selectToken} from '../../../redux/selectors/auth'

type Props = {
  setPage: Function
}
const HelpCenterOverview = ({setPage}: Props) => {
  const [faqs, setFaqs] = useState<Array<TFaq>>()
  const token = useSelector(selectToken)

  const getFaq = async () => {
    const RESPONSE = await get('faqs', token)

    if (RESPONSE?.data) {
      setFaqs(RESPONSE.data)
    }
  }

  useEffect(() => {
    getFaq()
  }, [token])
  return (
    <div className='row gy-0 mb-6 mb-xl-12'>
      <div className='col-md-6'>
        <div className='card card-md-stretch me-xl-3 mb-md-0 mb-6'>
          <div className='card-body p-10 p-lg-15'>
            <div className='d-flex flex-stack mb-7'>
              <h1 className='fw-bold text-dark'>Popular Tickets</h1>
              <div className='d-flex align-items-center'>
                <span
                  className='text-primary fw-bold me-1 '
                  style={{cursor: 'pointer'}}
                  onClick={() => setPage('tickets')}
                >
                  Support
                </span>
                <i className='ki-duotone ki-arrow-right fs-2 text-primary'>
                  <span className='path1'></span>
                  <span className='path2'></span>
                </i>
              </div>
            </div>
            <div className='m-0'>
              <div
                className='d-flex align-items-center collapsible py-3 toggle mb-0 collapsed'
                data-bs-toggle='collapse'
                data-bs-target='#kt_support_1_1'
                aria-expanded='false'
              >
                <div className='ms-n1 me-5'>
                  <i className='ki-duotone ki-down toggle-on text-primary fs-2'></i>
                  <i className='ki-duotone ki-right toggle-off fs-2'></i>
                </div>
                <div className='d-flex align-items-center flex-wrap'>
                  <h3 className='text-gray-800 fw-semibold cursor-pointer me-3 mb-2'>
                    I am having issues when i assign multiple roles to one user?
                  </h3>
                  <span className='badge badge-light-success my-1 d-block'>Resolved</span>
                </div>
              </div>
              <div id='kt_support_1_1' className='fs-6 ms-10 collapse'>
                <div className='mb-4'>
                  <span className='text-muted fw-semibold fs-5'>
                    Supervised allows for multible and systematic role assignment, try checking what
                    permissions are assigned for each roles, maybe there's a conflict?
                  </span>{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-md-6'>
        <div className='card card-md-stretch ms-xl-3'>
          <div className='card-body p-10 p-lg-15'>
            <div className='d-flex flex-stack mb-7'>
              <h1 className='fw-bold text-dark'>FAQ</h1>
              <div className='d-flex align-items-center'>
                <span
                  style={{cursor: 'pointer'}}
                  onClick={() => setPage('faq')}
                  className='text-primary fw-bold me-1'
                >
                  Full FAQ
                </span>
                <i className='ki-duotone ki-arrow-right fs-2 text-primary'>
                  <span className='path1'></span>
                  <span className='path2'></span>
                </i>
              </div>
            </div>
            <div className='m-0'>
              {faqs
                ? faqs.map((faq) => (
                    <>
                      <div
                        className='d-flex align-items-center collapsible py-3 toggle mb-0 collapsed'
                        data-bs-toggle='collapse'
                        data-bs-target={`#kt_support_${faq._id}`}
                        aria-expanded='false'
                      >
                        <div className='ms-n1 me-5'>
                          <i className='ki-duotone ki-down toggle-on text-primary fs-2'></i>
                          <i className='ki-duotone ki-right toggle-off fs-2'></i>
                        </div>
                        <div className='d-flex align-items-center flex-wrap'>
                          <h3 className='text-gray-800 fw-semibold cursor-pointer me-3 mb-0'>
                            {faq.question}
                          </h3>
                          <span className='badge badge-light my-1 d-none'> {faq.category}</span>
                        </div>
                      </div>
                      <div id={`kt_support_${faq._id}`} className='fs-6 ms-10 collapse'>
                        <div className='mb-4'>
                          <span className='text-muted fw-semibold fs-5'>{faq.answer}</span>
                          <a href='#' className='d-none'></a>
                        </div>
                      </div>
                    </>
                  ))
                : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpCenterOverview
