import React, {useState} from 'react'
import WorkflowHeader from './workflowHeader'
import CreateWorkFlow from './createWorkFlow'
import EditWorkFlow from './editWorkFlow'

const Workflow = () => {
  const [page, setPage] = useState<'documents' | 'new'>('new')
  const [currentWorkflow, setCurrentWorkflow] = useState()

  return (
    <>
      <div className='row mb-10'>
        <div className='col-lg-4'>
          <WorkflowHeader setPage={setPage} setCurrentWorkflow={setCurrentWorkflow} />
        </div>
        <div className='col-lg-8'>
          {page === 'new' && !currentWorkflow && <CreateWorkFlow />}
          {currentWorkflow && <EditWorkFlow currentWorkflow={currentWorkflow} />}
        </div>
      </div>
    </>
  )
}

export default Workflow
