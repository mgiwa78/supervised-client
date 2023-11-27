import React, {useEffect, useState} from 'react'
import {PageLink, PageTitle} from '../../_metronic/layout/core'
import CreateFaqCategory from './createFaqCategory'
import {RootState} from '../../redux/store'
import {useSelector} from 'react-redux'
import TFaqCategories from '../../types/faqCategories'
import get from '../../lib/get'
import {selectToken} from '../../redux/selectors/auth'

const FAQ = () => {
  const [createNew, setCreateNew] = useState<boolean>(false)
  const currentUser = useSelector((state: RootState) => state.auth.user)

  const [IsLoading, setIsLoading] = useState<boolean>(false)
  const token = useSelector(selectToken)

  const [faqCategories, setFaqCategories] = useState<Array<TFaqCategories>>()

  const getFaqCategories = async () => {
    const RESPONSE = await get('faqCategories', token)
    setFaqCategories(RESPONSE.data)
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    getFaqCategories()
  }, [token])

  const faqBreadcrumbs: Array<PageLink> = [
    {
      title: 'User Management',
      path: '/students/assignedStudents',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]
  return (
    <>
      <div>
        <PageTitle breadcrumbs={faqBreadcrumbs}>FAQ</PageTitle>
        <div>
          <div className='card'>
            <div className='card-body p-lg-15'>
              <div className='d-flex flex-column flex-lg-row'>
                <div className='flex-column flex-lg-row-auto w-100 w-lg-275px mb-10 me-lg-20'>
                  <div className='mb-15'>
                    <h4 className='text-dark mb-7'>Categories</h4>
                    <div className='menu menu-rounded menu-column menu-title-gray-700 menu-state-title-primary menu-active-bg-light-primary fw-semibold'>
                      {faqCategories &&
                        faqCategories.length &&
                        faqCategories.map((cat) => (
                          <div className='menu-item mb-1'>
                            <span className='menu-link py-3 '>{cat.title}</span>
                          </div>
                        ))}
                      {faqCategories.length === 0 && (
                        <div className='menu-item mb-1'>
                          <span className='text-muted py-5'>No Categories</span>
                        </div>
                      )}
                    </div>
                    {currentUser?.roles.some((role) => role.name === 'Superadmin') && (
                      <button
                        type='button'
                        onClick={() => setCreateNew(true)}
                        className='btn btn-primary w-100 mt-5'
                      >
                        <i className='ki-duotone ki-badge fs-2  mx-2'>
                          <span className='path1'></span>
                          <span className='path2'></span>
                          <span className='path3'></span>
                          <span className='path4'></span>
                          <span className='path5'></span>
                        </i>
                        <span className='indicator-label'>Create Category</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className='flex-lg-row-fluid'>
                  <div className='mb-13'>
                    <div className='mb-15'>
                      <h4 className='fs-2x text-gray-800 w-bolder mb-6'>
                        Frequesntly Asked Questions
                      </h4>
                      <p className='fw-semibold fs-4 text-gray-600 mb-2'>
                        First, a disclaimer – the entire process of writing a blog post often takes
                        more than a couple of hours, even if you can type eighty words as per minute
                        and your writing skills are sharp.
                      </p>
                    </div>
                    <div className='mb-15'>
                      <h3 className='text-gray-800 w-bolder mb-4'>Buying Product</h3>
                      <div className='m-0'>
                        <div
                          className='d-flex align-items-center collapsible py-3 toggle mb-0 collapsed'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_job_8_1'
                          aria-expanded='false'
                        >
                          <div className='btn btn-sm btn-icon mw-20px btn-active-color-primary me-5'>
                            <i className='ki-duotone ki-minus-square toggle-on text-primary fs-1'>
                              <span className='path1'></span>
                              <span className='path2'></span>
                            </i>
                            <i className='ki-duotone ki-plus-square toggle-off fs-1'>
                              <span className='path1'></span>
                              <span className='path2'></span>
                              <span className='path3'></span>
                            </i>
                          </div>
                          <h4 className='text-gray-700 fw-bold cursor-pointer mb-0'>
                            How does it work?
                          </h4>
                        </div>
                        <div id='kt_job_8_1' className='fs-6 ms-1 collapse'>
                          <div className='mb-4 text-gray-600 fw-semibold fs-6 ps-10'>
                            First, a disclaimer – the entire process of writing a blog post often
                            takes more than a couple of hours, even if you can type eighty words as
                            per minute and your writing skills are sharp.
                          </div>
                        </div>
                        <div className='separator separator-dashed'></div>
                      </div>
                      <div className='m-0'>
                        <div
                          className='d-flex align-items-center collapsible py-3 toggle collapsed mb-0'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_job_8_2'
                        >
                          <div className='btn btn-sm btn-icon mw-20px btn-active-color-primary me-5'>
                            <i className='ki-duotone ki-minus-square toggle-on text-primary fs-1'>
                              <span className='path1'></span>
                              <span className='path2'></span>
                            </i>
                            <i className='ki-duotone ki-plus-square toggle-off fs-1'>
                              <span className='path1'></span>
                              <span className='path2'></span>
                              <span className='path3'></span>
                            </i>
                          </div>
                          <h4 className='text-gray-700 fw-bold cursor-pointer mb-0'>
                            Do I need a designer to use this Admin Theme ?
                          </h4>
                        </div>
                        <div id='kt_job_8_2' className='collapse fs-6 ms-1'>
                          <div className='mb-4 text-gray-600 fw-semibold fs-6 ps-10'>
                            First, a disclaimer – the entire process of writing a blog post often
                            takes more than a couple of hours, even if you can type eighty words as
                            per minute and your writing skills are sharp.
                          </div>
                        </div>
                        <div className='separator separator-dashed'></div>
                      </div>
                      <div className='m-0'>
                        <div
                          className='d-flex align-items-center collapsible py-3 toggle mb-0 collapsed'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_job_8_3'
                          aria-expanded='false'
                        >
                          <div className='btn btn-sm btn-icon mw-20px btn-active-color-primary me-5'>
                            <i className='ki-duotone ki-minus-square toggle-on text-primary fs-1'>
                              <span className='path1'></span>
                              <span className='path2'></span>
                            </i>
                            <i className='ki-duotone ki-plus-square toggle-off fs-1'>
                              <span className='path1'></span>
                              <span className='path2'></span>
                              <span className='path3'></span>
                            </i>
                          </div>
                          <h4 className='text-gray-700 fw-bold cursor-pointer mb-0'>
                            What do I need to do to start selling?
                          </h4>
                        </div>
                        <div id='kt_job_8_3' className='fs-6 ms-1 collapse'>
                          <div className='mb-4 text-gray-600 fw-semibold fs-6 ps-10'>
                            First, a disclaimer – the entire process of writing a blog post often
                            takes more than a couple of hours, even if you can type eighty words as
                            per minute and your writing skills are sharp.
                          </div>
                        </div>
                        <div className='separator separator-dashed'></div>
                      </div>
                      <div className='m-0'>
                        <div
                          className='d-flex align-items-center collapsible py-3 toggle collapsed mb-0'
                          data-bs-toggle='collapse'
                          data-bs-target='#kt_job_8_4'
                        >
                          <div className='btn btn-sm btn-icon mw-20px btn-active-color-primary me-5'>
                            <i className='ki-duotone ki-minus-square toggle-on text-primary fs-1'>
                              <span className='path1'></span>
                              <span className='path2'></span>
                            </i>
                            <i className='ki-duotone ki-plus-square toggle-off fs-1'>
                              <span className='path1'></span>
                              <span className='path2'></span>
                              <span className='path3'></span>
                            </i>
                          </div>
                          <h4 className='text-gray-700 fw-bold cursor-pointer mb-0'>
                            How much does Extended license cost?
                          </h4>
                        </div>
                        <div id='kt_job_8_4' className='collapse fs-6 ms-1'>
                          <div className='mb-4 text-gray-600 fw-semibold fs-6 ps-10'>
                            First, a disclaimer – the entire process of writing a blog post often
                            takes more than a couple of hours, even if you can type eighty words as
                            per minute and your writing skills are sharp.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {currentUser?.roles.some((role) => role.name === 'Superadmin') && createNew && (
        <CreateFaqCategory setCreateNew={setCreateNew} />
      )}
    </>
  )
}

export default FAQ
