import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate, useLocation} from 'react-router-dom'
import {MasterLayout} from '../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../_metronic/assets/ts/_utils'
import {WithChildren} from '../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import {StudentRoutes} from './sub-routes/StudentsRoutes'
import Users from '../modules/users/users'
import Roles from '../modules/users/roles'
import Permissions from '../modules/users/permissions'
import CreateDocuments from '../modules/documents/createdocuments'
import MyDocuments from '../modules/documents/mydocuments'
import EditDocument from '../modules/documents/editDocument'
import AllDocuments from '../modules/documents/allDocuments'
import AllSupervisors from '../pages/users/supervisors'
import AssignedDocument from '../modules/documents/assignedDocuments'
import ReviewDocument from '../modules/documents/reviewDocument'
import ReviewsTable from '../components/ReviewsTable'
import AllReviewsSessions from '../modules/documents/allReviewSessions'
import AllStudentReviewSessions from '../modules/documents/allStudentReviewSessions'
import AllAssignedStudents from '../pages/users/assignedStudents'
import StudentOverview from '../modules/assignedStudent/Header'
import AssignedStudent from '../modules/assignedStudent/AssignedStudent'
import AssignedStudentOverview from '../modules/assignedStudent/AssignedStudentOverview'
import AssignedStudentProjects from '../modules/assignedStudent/AssignedStudentProjects'
import ProjectPage from '../modules/projects/projectpage'
import ProjectOverview from '../modules/projects/projectOverview'
import CreateProject from '../modules/project/createProject'
import MyProjects from '../modules/project/myProjects'
import AllProjects from '../modules/project/allProjects'
import ProjectDocuments from '../modules/projects/projectDocuments'
import AllStudentsProjects from '../modules/project/allStudentProjects'
import AllAssignedProjects from '../modules/project/allAssignedProjects'
import FileViewer from '../modules/documents/textViewer'
import CreateProposal from '../modules/proposal/createProposal'
import MyProposals from '../modules/proposal/myProposals'
import SubmittedProposals from '../modules/proposal/submittedProposals'

import Proposal from '../components/viewProposal/Proposal'
import AllStudents from '../pages/users/students'
import Workflow from '../pages/workflow/workflow'

const PrivateRoutes = () => {
  const location = useLocation()

  const printRoute = () => {
    console.log(location)
  }
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />

        {/*  */}
        {/*  */}
        {/* Asset based routes */}
        {/* Asset based routes */}
        {/*  */}
        {/*  */}

        <Route path='/users'>
          <Route index element={<Navigate to='/users/all' />} />
          <Route path='all' element={<Users />} />
          <Route path='roles' element={<Roles />} />
          <Route path='permissions' element={<Permissions />} />
          <Route path='supervisors' element={<AllSupervisors />} />
          <Route path='students' element={<AllStudents />} />
        </Route>

        <Route path='/proposals'>
          <Route path='submit' element={<CreateProposal />} />
          <Route path='my' element={<MyProposals />} />
        </Route>

        <Route path='/facultyadmin'>
          <Route path='proposals'>
            <Route path='submitted' element={<SubmittedProposals />} />
            <Route path=':proposalId' element={<Proposal />} />
          </Route>
        </Route>

        <Route path='/project'>
          <Route path='my' element={<MyProjects />} />
          <Route path='review/:reviewSessionId' element={<ReviewDocument />} />
          <Route path='all' element={<AllProjects />} />

          {/* <Route path='create' element={<CreateDocuments />} /> */}

          <Route path='create' element={<CreateProject />} />
          <Route path='assigned' element={<AllAssignedProjects />} />

          <Route path='reviewSessions'>
            <Route path='supervisor' element={<AllReviewsSessions />} />
            <Route path='student' element={<AllStudentReviewSessions />} />
          </Route>

          <Route path='edit/:documentID' element={<EditDocument />} />

          <Route path=':projectId' element={<ProjectPage />}>
            <Route path='overview' element={<ProjectOverview />} />
            <Route path='supervisors' element={<ProjectOverview />} />
            <Route path='documents' element={<ProjectDocuments />} />
          </Route>
        </Route>

        <Route path='workflow' element={<Workflow />} />
        <Route path='students'>
          {/* <Route path='users'>
            <Route index element={<Navigate to='/users/all' />} />
            <Route path='all' element={<CreateDocuments />} />
          </Route> */}

          <Route path='assignedStudents'>
            <Route index element={<AllAssignedStudents />} />
            <Route path=':studentId' element={<AllStudentsProjects />} />
            <Route path=':studentId/project/:projectId' element={<AssignedStudent />}>
              <Route path='' element={<AssignedStudentOverview />} />
              <Route path=':fileId' element={<FileViewer />} />
            </Route>

            {/* <Route path=':studentId' element={<AssignedStudent />}> */}
            <Route path='projects' element={<AssignedStudentProjects />} />
            {/* </Route> */}
          </Route>
        </Route>

        <Route
          path='*'
          element={
            <>
              {printRoute()}
              <Navigate to='/error/404' />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
