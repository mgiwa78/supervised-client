import React from 'react'
import {Tables1} from './overview/table'
import {toAbsoluteUrl} from '../../_metronic/helpers'
import {Link, useParams} from 'react-router-dom'

const AssignedStudentProjects = () => {
  const {studentId} = useParams()
  return (
    <div>
      <div className='d-flex flex-wrap flex-stack my-5' data-select2-id='select2-data-121-rgid'>
        <h2 className='fs-2 fw-semibold my-2'>Projects</h2>
        <div className='d-flex flex-wrap my-1'>
          <div className='m-0'>
            <select
              name='status'
              data-control='select2'
              data-hide-search='true'
              className='form-select form-select-sm form-select-solid fw-bold w-125px select2-hidden-accessible'
              data-select2-id='select2-data-9-sox5'
              tabIndex={-1}
              aria-hidden='true'
              data-kt-initialized='1'
            >
              <option value='Active' selected={true} data-select2-id='select2-data-11-54sr'>
                Active
              </option>
              <option value='Approved' data-select2-id='select2-data-124-qeyn'>
                In Progress
              </option>
              <option value='Declined' data-select2-id='select2-data-125-s4iz'>
                To Do
              </option>
              <option value='In Progress' data-select2-id='select2-data-126-ag7y'>
                Completed
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className='row g-6 g-xl-9'>
        <div className='col-md-6 col-xl-4'>
          <Link
            to={`/students/assignedStudents/project/:projectId`}
            className='card border-hover-primary'
          >
            <div className='card-header border-0 pt-9'>
              <div className='card-title m-0'>
                <div className='symbol symbol-50px w-50px bg-light'>
                  <img
                    src={toAbsoluteUrl('/media/svg/brand-logos/plurk.svg')}
                    alt='image'
                    className='p-3'
                  />
                </div>
              </div>
              <div className='card-toolbar'>
                <span className='badge badge-light-primary fw-bold me-auto px-4 py-3'>
                  In Progress
                </span>
              </div>
            </div>
            <div className='card-body p-9'>
              <div className='fs-3 fw-bold text-dark'>Fitnes App</div>
              <p className='text-gray-400 fw-semibold fs-5 mt-1 mb-7'>
                CRM App application to HR efficiency
              </p>
              <div className='d-flex flex-wrap mb-5'>
                <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3'>
                  <div className='fs-6 text-gray-800 fw-bold'>Nov 10, 2023</div>
                  <div className='fw-semibold text-gray-400'>Due Date</div>
                </div>
                <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3'>
                  <div className='fs-6 text-gray-800 fw-bold'>$284,900.00</div>
                  <div className='fw-semibold text-gray-400'>Budget</div>
                </div>
              </div>
              <div
                className='h-4px w-100 bg-light mb-5'
                data-bs-toggle='tooltip'
                aria-label='This project 50% completed'
                data-bs-original-title='This project 50% completed'
                data-kt-initialized='1'
              >
                <div
                  className='bg-primary rounded h-4px'
                  role='progressbar'
                  style={{width: '50%'}}
                  aria-valuenow={50}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
              <div className='symbol-group symbol-hover'>
                <div
                  className='symbol symbol-35px symbol-circle'
                  data-bs-toggle='tooltip'
                  data-bs-original-title='Susan Redwood'
                  data-kt-initialized='1'
                >
                  <span className='symbol-label bg-primary text-inverse-primary fw-bold'>S</span>
                </div>
                <div
                  className='symbol symbol-35px symbol-circle'
                  data-bs-toggle='tooltip'
                  data-bs-original-title='Susan Redwood'
                  data-kt-initialized='1'
                >
                  <span className='symbol-label bg-secondary text-inverse-secondary fw-bold'>
                    A
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className='col-md-6 col-xl-4'>
          <a
            href='../../demo1/dist/apps/projects/project.html'
            className='card border-hover-primary'
          >
            <div className='card-header border-0 pt-9'>
              <div className='card-title m-0'>
                <div className='symbol symbol-50px w-50px bg-light'>
                  <img
                    src={toAbsoluteUrl('/media/svg/brand-logos/disqus.svg')}
                    alt='image'
                    className='p-3'
                  />
                </div>
              </div>
              <div className='card-toolbar'>
                <span className='badge badge-light fw-bold me-auto px-4 py-3'>Pending</span>
              </div>
            </div>
            <div className='card-body p-9'>
              <div className='fs-3 fw-bold text-dark'>Leaf CRM</div>
              <p className='text-gray-400 fw-semibold fs-5 mt-1 mb-7'>
                CRM App application to HR efficiency
              </p>
              <div className='d-flex flex-wrap mb-5'>
                <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3'>
                  <div className='fs-6 text-gray-800 fw-bold'>May 10, 2021</div>
                  <div className='fw-semibold text-gray-400'>Due Date</div>
                </div>
                <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3'>
                  <div className='fs-6 text-gray-800 fw-bold'>$36,400.00</div>
                  <div className='fw-semibold text-gray-400'>Budget</div>
                </div>
              </div>
              <div
                className='h-4px w-100 bg-light mb-5'
                data-bs-toggle='tooltip'
                aria-label='This project 30% completed'
                data-bs-original-title='This project 30% completed'
                data-kt-initialized='1'
              >
                <div
                  className='bg-info rounded h-4px'
                  role='progressbar'
                  style={{width: '30%'}}
                  aria-valuenow={30}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
              <div className='symbol-group symbol-hover'>
                <div
                  className='symbol symbol-35px symbol-circle'
                  data-bs-toggle='tooltip'
                  data-bs-original-title='Alan Warden'
                  data-kt-initialized='1'
                >
                  <span className='symbol-label bg-warning text-inverse-warning fw-bold'>A</span>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className='col-md-6 col-xl-4'>
          <a
            href='../../demo1/dist/apps/projects/project.html'
            className='card border-hover-primary'
          >
            <div className='card-header border-0 pt-9'>
              <div className='card-title m-0'>
                <div className='symbol symbol-50px w-50px bg-light'>
                  <img
                    src={toAbsoluteUrl('/media/svg/brand-logos/figma-1.svg')}
                    alt='image'
                    className='p-3'
                  />
                </div>
              </div>
              <div className='card-toolbar'>
                <span className='badge badge-light-success fw-bold me-auto px-4 py-3'>
                  Completed
                </span>
              </div>
            </div>
            <div className='card-body p-9'>
              <div className='fs-3 fw-bold text-dark'>Atica Banking</div>
              <p className='text-gray-400 fw-semibold fs-5 mt-1 mb-7'>
                CRM App application to HR efficiency
              </p>
              <div className='d-flex flex-wrap mb-5'>
                <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3'>
                  <div className='fs-6 text-gray-800 fw-bold'>Mar 14, 2021</div>
                  <div className='fw-semibold text-gray-400'>Due Date</div>
                </div>
                <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3'>
                  <div className='fs-6 text-gray-800 fw-bold'>$605,100.00</div>
                  <div className='fw-semibold text-gray-400'>Budget</div>
                </div>
              </div>
              <div
                className='h-4px w-100 bg-light mb-5'
                data-bs-toggle='tooltip'
                aria-label='This project 100% completed'
                data-bs-original-title='This project 100% completed'
                data-kt-initialized='1'
              >
                <div
                  className='bg-success rounded h-4px'
                  role='progressbar'
                  style={{width: '100%'}}
                  aria-valuenow={100}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
              <div className='symbol-group symbol-hover'>
                <div
                  className='symbol symbol-35px symbol-circle'
                  data-bs-toggle='tooltip'
                  data-bs-original-title='Mike Garcie'
                  data-kt-initialized='1'
                >
                  <span className='symbol-label bg-info text-inverse-info fw-bold'>M</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default AssignedStudentProjects
