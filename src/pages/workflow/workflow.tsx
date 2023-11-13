import React, {useEffect, useState} from 'react'
import WorkflowHeader from './workflowHeader'
import CreateWorkFlow from './createWorkFlow'
import EditWorkFlow from './editWorkFlow'
import TWorkflow from '../../types/Workflow'
import {useSelector} from 'react-redux'
import {selectToken} from '../../redux/selectors/auth'
import get from '../../lib/get'

const Workflow = () => {
  const [createNew, setCreateNew] = useState<boolean>(false)
  const [currentWorkflow, setCurrentWorkflow] = useState<TWorkflow>()

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
  }, [createNew])

  const handleCurrentWorkflowChange = (workflow: any) => {
    setCurrentWorkflow(undefined)
    setCurrentWorkflow(workflow)
  }

  return (
    <>
      <div className='row mb-10'>
        <div className='card mb-5 mb-xl-10'>
          <div className='card-header'>
            <div className='card-title'>
              <h3>Workflows</h3>
            </div>
          </div>
          <div className='card-body'>
            <div className='row gx-9 gy-6'>
              {workflows?.map((workflow) => (
                <div className='col-xl-6' data-kt-billing-element='address'>
                  <div className='card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6'>
                    <div className='d-flex flex-column py-2'>
                      <div className='d-flex align-items-center fs-5 fw-bold mb-5'>
                        {workflow?.title}
                        <span className={`badge badge-${workflow?.color} fs-7 ms-2 py-2`}>
                          {'  '}
                        </span>
                      </div>
                      <div className='fs-6 fw-semibold text-gray-600'>{workflow?.description}</div>
                    </div>
                    <div className='d-flex align-items-center py-2'>
                      <button
                        className='btn btn-sm btn-light-danger btn-active-light-danger me-3'
                        data-kt-billing-action='address-delete'
                      >
                        <span className='indicator-label'>Delete</span>
                        <span className='indicator-progress'>
                          Please wait...
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      </button>
                      <button
                        className='btn btn-sm btn-light btn-active-light-primary'
                        onClick={() => setCurrentWorkflow(workflow)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className='col-xl-6'>
                <div className='notice d-flex bg-light-primary rounded border-primary border border-dashed flex-stack h-xl-100 mb-10 p-6'>
                  <div className='d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap'>
                    <div className='mb-3 mb-md-0 fw-semibold'>
                      <div className='fs-6 text-gray-700 pe-7'>
                        To create and define new workflow
                      </div>
                    </div>
                    <button
                      type='button'
                      onClick={() => setCreateNew(true)}
                      className='btn btn-primary px-6 align-self-center text-nowrap'
                    >
                      New Workflow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='col-lg-4'>
          <WorkflowHeader setPage={handleChange} setCurrentWorkflow={handleCurrentWorkflowChange} />
        </div>
        <div className='col-lg-8'> */}
        {/* {page === 'new' && !currentWorkflow && <CreateWorkFlow />} */}
        {currentWorkflow && (
          <EditWorkFlow currentWorkflow={currentWorkflow} setCurrentWorkflow={setCurrentWorkflow} />
        )}
        {createNew && <CreateWorkFlow setCreateNew={setCreateNew} />}
        {/* </div> */}
      </div>
    </>
  )
}

export default Workflow
