import React from 'react'
import {Tables1} from './overview/table'

const AssignedStudentOverview = () => {
  return (
    <>
      <div className='row g-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xl-6'>
          <Tables1 title='Recent Documents' className='card-xl-stretch mb-5 mb-xl-8' />
        </div>
        <div className='col-xl-6'>
          <Tables1 title='Approved Documents' className='card-xl-stretch mb-5 mb-xl-8' />
        </div>
      </div>
    </>
  )
}

export default AssignedStudentOverview
