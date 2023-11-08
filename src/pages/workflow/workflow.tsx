import React, {useState} from 'react'
import WorkflowHeader from './workflowHeader'
import CreateWorkFlow from './createWorkFlow'
import EditWorkFlow from './editWorkFlow'
import TWorkflow from '../../types/Workflow'

const Workflow = () => {
  const [page, setPage] = useState<'documents' | 'new'>('new')
  const [currentWorkflow, setCurrentWorkflow] = useState<TWorkflow>()

  const handleChange = (page: 'documents' | 'new') => {
    if (page === 'new') {
      setCurrentWorkflow(undefined)
    }
    setPage(page)
  }
  const handleCurrentWorkflowChange = (workflow: any) => {
    setCurrentWorkflow(undefined)
    setCurrentWorkflow(workflow)
  }

  return (
    <>
      <div className='row mb-10'>
        <div className='col-lg-4'>
          <WorkflowHeader setPage={handleChange} setCurrentWorkflow={handleCurrentWorkflowChange} />
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
