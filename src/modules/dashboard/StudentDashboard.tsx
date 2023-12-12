/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {PageLink, PageTitle} from '../../_metronic/layout/core'
import ProjectSupervisors from './components/student/projectSupervisors'
import {useSelector} from 'react-redux'
import {selectAuth} from '../../redux/selectors/auth'
import get from '../../lib/get'

const Dashboard = ({projectsAnalytics, proposalAnalytics}: any) => (
  <>
    <div className='row g-5 g-xl-8'>
      <div className='col-xl-6'>
        <div className='row g-5 g-xl-8'>
          <div className='col-xl-6'>
            <a href='#' className='card bg-body hoverable card-xl-stretch mb-xl-8'>
              <div className='card-body'>
                <i className='ki-duotone ki-chart-simple text-primary fs-2x ms-n1'>
                  <span className='path1'></span>
                  <span className='path2'></span>
                  <span className='path3'></span>
                  <span className='path4'></span>
                </i>
                <div className='text-gray-900 fw-bold fs-2 mb-2 mt-5'>
                  {projectsAnalytics?.pendingProjects || 0}
                </div>
                <div className='fw-semibold text-gray-400'>Pending Projects</div>
              </div>
            </a>
          </div>
          <div className='col-xl-6'>
            <a href='#' className='card bg-dark hoverable card-xl-stretch mb-xl-8'>
              <div className='card-body'>
                <i className='ki-duotone ki-cheque text-gray-100 fs-2x ms-n1'>
                  <span className='path1'></span>
                  <span className='path2'></span>
                  <span className='path3'></span>
                  <span className='path4'></span>
                  <span className='path5'></span>
                  <span className='path6'></span>
                  <span className='path7'></span>
                </i>
                <div className='text-gray-100 fw-bold fs-2 mb-2 mt-5'>
                  {projectsAnalytics?.ongoingProjects || 0}
                </div>
                <div className='fw-semibold text-gray-100'>Ongoing Projects</div>
              </div>
            </a>
          </div>
        </div>
        <div className='row g-5 g-xl-8'>
          <div className='col-xl-6'>
            <a href='#' className='card bg-info hoverable card-xl-stretch mb-5 mb-xl-8'>
              <div className='card-body'>
                <i className='ki-duotone ki-chart-pie-simple text-white fs-2x ms-n1'>
                  <span className='path1'></span>
                  <span className='path2'></span>
                </i>
                <div className='text-white fw-bold fs-2 mb-2 mt-5'>
                  {' '}
                  {projectsAnalytics?.approvedProjects || 0}
                </div>
                <div className='fw-semibold text-white'>Approved Projects </div>
              </div>
            </a>
          </div>
          <div className='col-xl-6'>
            <a href='#' className='card bg-warning hoverable card-xl-stretch mb-xl-8'>
              <div className='card-body'>
                <i className='ki-duotone ki-briefcase text-white fs-2x ms-n1'>
                  <span className='path1'></span>
                  <span className='path2'></span>
                </i>
                <div className='text-white fw-bold fs-2 mb-2 mt-5'>
                  {proposalAnalytics?.pendingProposals}
                </div>
                <div className='fw-semibold text-white'>Pending Proposals</div>
              </div>
            </a>
          </div>
        </div>
        <div className='row g-5 g-xl-8'>
          <div className='col-xl-6'>
            <a href='#' className='card bg-success hoverable card-xl-stretch mb-xl-8'>
              <div className='card-body'>
                <i className='ki-duotone ki-briefcase text-white fs-2x ms-n1'>
                  <span className='path1'></span>
                  <span className='path2'></span>
                </i>
                <div className='text-white fw-bold fs-2 mb-2 mt-5'>
                  {proposalAnalytics?.approvedProposals}
                </div>
                <div className='fw-semibold text-white'>Approved Proposals</div>
              </div>
            </a>
          </div>
        </div>
      </div>{' '}
      <div className='col-xl-6'>
        <div className='card card-xl-stretch mb-5 mb-xl-8'>
          <div className='card-header border-0'>
            <h3 className='card-title fw-bold text-dark'>Notifications</h3>
            <div className='card-toolbar'>
              <button
                type='button'
                className='btn   btn-color-primary btn-active-light-primary'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
              >
                View All
              </button>
            </div>
          </div>
          <div className='card-body pt-2'>
            <div className='d-flex align-items-center mb-8'>
              <span className='bullet bullet-vertical h-40px bg-success'></span>
              <div className='form-check form-check-custom form-check-solid mx-5'>
                <input className='form-check-input' type='checkbox' value='' />
              </div>
              <div className='flex-grow-1'>
                <a href='#' className='text-gray-800 text-hover-primary fw-bold fs-6'>
                  Your Project Propsal: _Title_, has been approved
                </a>
                <span className='text-muted fw-semibold d-block'>15 minutes ago</span>
              </div>
              <span className='badge badge-light-success fs-8 fw-bold'>New</span>
            </div>
            <div className='d-flex align-items-center mb-8'>
              <span className='bullet bullet-vertical h-40px bg-warning'></span>
              <div className='form-check form-check-custom form-check-solid mx-5'>
                <input className='form-check-input' type='checkbox' value='' />
              </div>
              <div className='flex-grow-1'>
                <a href='#' className='text-gray-800 text-hover-primary fw-bold fs-6'>
                  New Comment on project : _Title_
                </a>
                <span className='text-muted fw-semibold d-block'>15 minutes ago</span>
              </div>
              <span className='badge badge-light-warning fs-8 fw-bold'>New</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='row g-5 g-xl-8'>
      <div className='col-xl-6'>
        <ProjectSupervisors projectsSupervisors={projectsAnalytics?.projectsSupervisors} />
      </div>
    </div>
  </>
)

const StudentDashboard: FC = () => {
  const {token} = useSelector(selectAuth)
  const [projectsAnalytics, setProjectsAnalytics] = useState<any>([])
  const [proposalAnalytics, setProposalAnalytics] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getDashboardData = async () => {
      setIsLoading(true)
      try {
        if (token) {
          let ProposalAnalytics_RESPONSE
          const ProjectsAnalytics_RESPONSE = await get('projects/student/dashboardData', token)

          if (ProjectsAnalytics_RESPONSE?.data) {
            ProposalAnalytics_RESPONSE = await get('proposals/student/dashboardData', token)

            setProjectsAnalytics(ProjectsAnalytics_RESPONSE.data)
          }
          if (ProposalAnalytics_RESPONSE?.data) {
            setProposalAnalytics(ProposalAnalytics_RESPONSE.data)
          }
        }
      } catch (error) {
        setIsLoading(false)
        setProjectsAnalytics([])
        console.log(error)
      }
    }
    getDashboardData()
  }, [token])
  const studentDahboard: Array<PageLink> = [
    {
      title: 'Home',
      path: '/',
      isSeparator: false,
      isActive: false,
    },
    {
      title: 'Student Dahboard',
      path: '/dashboard',
      isSeparator: true,
      isActive: false,
    },
  ]
  return (
    <>
      <PageTitle breadcrumbs={studentDahboard}>Student Dashboard</PageTitle>
      <Dashboard projectsAnalytics={projectsAnalytics} proposalAnalytics={proposalAnalytics} />
    </>
  )
}

export {StudentDashboard}
