import React from 'react'
import {TProject} from '../../../../types/Project'
import User from '../../../../types/User'

const ProjectSupervisors = ({
  projectsSupervisors,
}: {
  projectsSupervisors: Array<{project: TProject; supervisor: User}>
}) => {
  return (
    <div className='card card-xl-stretch mb-5 mb-xl-8'>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Project Supervisors</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>
            Supervisors {projectsSupervisors?.length || 0}
          </span>
        </h3>
      </div>
      <div className='card-body py-3'>
        <table className='table align-middle gs-0 gy-3'>
          <thead>
            <tr className='fw-bold text-muted'>
              <th className='min-w-200px'>Supervisors</th>

              <th className='min-w-300px '>Project title</th>
            </tr>
          </thead>
          <tbody>
            {projectsSupervisors?.length &&
              projectsSupervisors.slice(0, 6).map((projectsSupervisor, index) => (
                <tr key={index}>
                  <td>
                    <div className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                      <div className='symbol symbol-50px ' style={{marginRight: '10px'}}>
                        <span className='symbol-label bg-secondary text-inverse-secondary fw-bold'>
                          {projectsSupervisor?.supervisor?.lastName[0]}
                        </span>
                      </div>
                      {projectsSupervisor.supervisor.lastName +
                        '  ' +
                        projectsSupervisor.supervisor.firstName}
                    </div>
                    <span className='text-muted fw-semibold d-block fs-7'>
                      {projectsSupervisor.supervisor?.department?.name}
                    </span>
                  </td>
                  <td>
                    <span className='text-muted fw-semibold d-block fs-7'>
                      {projectsSupervisor.project?.title}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProjectSupervisors
