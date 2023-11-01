import React, {useEffect, useState} from 'react'
import {Outlet, Route, Routes, useNavigate, useParams} from 'react-router-dom'
import StudentOverviewHeader from './Header'
import AssignedStudentOverview from './AssignedStudentOverview'
import AssignedStudentProjects from './AssignedStudentProjects'
import FileViewer from '../documents/textViewer'

const AssignedStudent = () => {
  const [viewerComponent, setViewerComponent] = useState()

  const [viewDoc, setViewDoc] = useState(null)
  const navigate = useNavigate()

  return (
    <>
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-12  '>
          <StudentOverviewHeader setViewDoc={setViewDoc} />
        </div>
      </div>
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-12'>{viewDoc && <FileViewer file={viewDoc} />}</div>
      </div>
    </>
  )
}

export default AssignedStudent
