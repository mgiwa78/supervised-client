import React from 'react'
import {useLocation} from 'react-router-dom'

const ProjectOverview = () => {
  const location = useLocation()

  return (
    <div className='col-lg-6'>
      <div className='card  h-lg-100'>
        <div className='card-header mt-6'>
          <div className='card-title flex-column'>
            <h3 className='fw-bold mb-1'>Project Overview</h3>
          </div>
        </div>
        <div className='card-body'>
          <div className='accordion accordion-icon-collapse' id='kt_accordion_3'>
            <div className='mb-5'>
              <div
                className='accordion-header py-3 d-flex'
                data-bs-toggle='collapse'
                data-bs-target='#kt_accordion_3_item_1'
              >
                <span className='accordion-icon'>
                  <i className='ki-duotone ki-plus-square fs-3 accordion-icon-off'>
                    <span className='path1'></span>
                    <span className='path2'></span>
                    <span className='path3'></span>
                  </i>
                  <i className='ki-duotone ki-minus-square fs-3 accordion-icon-on'>
                    <span className='path1'></span>
                    <span className='path2'></span>
                  </i>
                </span>
                <h3 className='fs-4 fw-semibold mb-0 ms-4'>Approved Documents</h3>
              </div>

              <div
                id='kt_accordion_3_item_1'
                className='fs-6 collapse show ps-10'
                data-bs-parent='#kt_accordion_3'
              >
                ...
              </div>
            </div>

            <div className='mb-5'>
              <div
                className='accordion-header py-3 d-flex collapsed'
                data-bs-toggle='collapse'
                data-bs-target='#kt_accordion_3_item_2'
              >
                <span className='accordion-icon'>
                  <i className='ki-duotone ki-plus-square fs-3 accordion-icon-off'>
                    <span className='path1'></span>
                    <span className='path2'></span>
                    <span className='path3'></span>
                  </i>
                  <i className='ki-duotone ki-minus-square fs-3 accordion-icon-on'>
                    <span className='path1'></span>
                    <span className='path2'></span>
                  </i>
                </span>
                <h3 className='fs-4 fw-semibold mb-0 ms-4'>In Progress</h3>
              </div>

              <div
                id='kt_accordion_3_item_2'
                className='collapse fs-6 ps-10'
                data-bs-parent='#kt_accordion_3'
              >
                ...
              </div>
            </div>

            <div className='mb-5'>
              <div
                className='accordion-header py-3 d-flex collapsed'
                data-bs-toggle='collapse'
                data-bs-target='#kt_accordion_3_item_3'
              >
                <span className='accordion-icon'>
                  <i className='ki-duotone ki-plus-square fs-3 accordion-icon-off'>
                    <span className='path1'></span>
                    <span className='path2'></span>
                    <span className='path3'></span>
                  </i>
                  <i className='ki-duotone ki-minus-square fs-3 accordion-icon-on'>
                    <span className='path1'></span>
                    <span className='path2'></span>
                  </i>
                </span>
                <h3 className='fs-4 fw-semibold mb-0 ms-4'>Backlog</h3>
              </div>

              <div
                id='kt_accordion_3_item_3'
                className='collapse fs-6 ps-10'
                data-bs-parent='#kt_accordion_3'
              >
                ...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectOverview
