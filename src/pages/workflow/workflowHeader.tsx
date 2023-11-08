import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {selectToken} from '../../redux/selectors/auth'
import get from '../../lib/get'
import TWorkflow from '../../types/Workflow'

type PropTypes = {
  setCurrentWorkflow: Function
  setPage: Function
}

const WorkflowHeader = ({setCurrentWorkflow, setPage}: PropTypes) => {
  const [workflows, setWorkflows] = useState<Array<TWorkflow>>()
  const token = useSelector(selectToken)

  useEffect(() => {
    const getWorkflows = async () => {
      const RESPONSE = await get(`workflows`, token)
      if (RESPONSE?.data) {
        setWorkflows(RESPONSE.data)
      }
    }
    getWorkflows()
  }, [])

  return (
    <div className='card card-flush h-100'>
      <div className='card-header pt-7' id='kt_chat_contacts_header'>
        <div className='card-title d-flex justify-content-between w-100'>
          <h2>All Workflow</h2>
          <div className='badge badge-light-primary'>{workflows?.length || '0'}</div>
        </div>
      </div>
      <div className='card-body pt-5'>
        <div className='d-flex flex-column gap-5'>
          {workflows && workflows?.length > 0 ? (
            workflows.map((workflow) => (
              <div
                key={workflow._id}
                style={{cursor: 'pointer'}}
                onClick={() => setCurrentWorkflow(workflow)}
                className='d-flex flex-stack bg-none'
              >
                <span
                  className={`fs-6 fw-bold text-gray-800 text-${workflow?.color || '0'} text-hover`}
                >
                  {workflow.title}
                </span>
                <div className='badge badge-light-primary'>{workflow?.count}</div>
              </div>
            ))
          ) : (
            <div className='fv-row d-flex justify-content-center mh-300px fs-5 py-20'>
              <span className='text-muted'> No Workflows</span>
            </div>
          )}

          {/* <div className='d-flex flex-stack'>
            <a
              href='../../demo1/dist/apps/contacts/getting-started.html'
              className='fs-6 fw-bold text-gray-800 text-hover-primary'
            >
              Tier 1 Member
            </a>
            <div className='badge badge-light-primary'>1</div>
          </div>
          <div className='d-flex flex-stack'>
            <a
              href='../../demo1/dist/apps/contacts/getting-started.html'
              className='fs-6 fw-bold text-gray-800 text-hover-primary'
            >
              Pending Approval
            </a>
            <div className='badge badge-light-primary'>3</div>
          </div>
          <div className='d-flex flex-stack'>
            <a
              href='../../demo1/dist/apps/contacts/getting-started.html'
              className='fs-6 fw-bold text-danger text-hover-primary'
            >
              Blocked
            </a>
            <div className='badge badge-light-danger'>2</div>
          </div> */}
        </div>

        <div className='separator my-7'></div>
        <button onClick={() => setPage('new')} className='btn btn-primary w-100'>
          <i className='ki-duotone ki-badge fs-2'>
            <span className='path1'></span>
            <span className='path2'></span>
            <span className='path3'></span>
            <span className='path4'></span>
            <span className='path5'></span>
          </i>
          Create Workflow
        </button>
      </div>
    </div>
  )
}

export default WorkflowHeader
