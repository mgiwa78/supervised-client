import React, {useEffect, useMemo, useState} from 'react'
import WorkflowHeader from './workflowHeader'
import CreateWorkFlow from './createWorkFlow'
import EditWorkFlow from './editWorkFlow'
import TWorkflow from '../../types/Workflow'
import {useSelector} from 'react-redux'
import {selectToken} from '../../redux/selectors/auth'
import get from '../../lib/get'

import * as swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import deleteReq from '../../lib/delete'

const MySwal = withReactContent(swal.default)

const Workflow = () => {
  const [createNew, setCreateNew] = useState<boolean>(false)
  const [currentWorkflow, setCurrentWorkflow] = useState<TWorkflow>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [workflows, setWorkflows] = useState<Array<TWorkflow>>()
  const token = useSelector(selectToken)

  const getWorkflows = async () => {
    setIsLoading(true)
    const RESPONSE = await get(`workflows`, token)
    if (RESPONSE?.data) {
      setWorkflows(RESPONSE.data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getWorkflows()
  }, [createNew])

  const handleCurrentWorkflowChange = (workflow: any) => {
    setCurrentWorkflow(undefined)
    setCurrentWorkflow(workflow)
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [filter, setFilter] = useState(0)
  const [pageSize, setPageSize] = useState(5)

  const handlePageClick = (page: any) => {
    setCurrentPage(page)
  }
  const handleDelete = (workflow: TWorkflow) => {
    MySwal.fire({
      title: 'Delete this workflow?',
      text: `Are you sure, you want to delete ${workflow.title} workflow?`,
      icon: 'error',
      buttonsStyling: false,
      confirmButtonText: 'Yes Delete!',
      heightAuto: false,
      customClass: {
        confirmButton: 'btn btn-danger',
      },
    }).then(async () => {
      await deleteReq(`workflows/${workflow._id}`, token, true, 'Workflow Deleted').then(() => {
        getWorkflows()
      })
    })
  }
  const filteredData = useMemo(() => {
    setCurrentPage(0)
    return workflows?.filter((workflow) =>
      Object.values(workflow).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(searchTerm.trim().toLowerCase())
      )
    )
  }, [workflows, searchTerm])

  const paginatedData = useMemo(() => {
    const startIndex = currentPage * pageSize
    return filteredData?.slice(startIndex, startIndex + pageSize)
  }, [filteredData, currentPage, pageSize])

  const totalPages = Math.ceil(filteredData?.length / pageSize)

  const paginationItems = []

  for (let i = 0; i < totalPages; i++) {
    paginationItems.push(
      <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
        <button className='page-link' onClick={() => handlePageClick(i)}>
          {i + 1}
        </button>
      </li>
    )
  }
  return (
    <>
      <div className='row mb-10' style={{minHeight: '100%'}}>
        <div className='card mb-5 mb-xl-10' style={{minHeight: '100%', position: 'relative'}}>
          <div className='card-header'>
            <div className='card-title'>
              <h3>Workflows</h3>
            </div>
            <div className='card-toolbar'>
              <div className='d-flex align-items-center position-relative me-4'>
                <i className='ki-duotone ki-magnifier fs-3 position-absolute ms-3'>
                  <span className='path1'></span>
                  <span className='path2'></span>
                </i>
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type='text'
                  id='kt_filter_search'
                  className='form-control form-control-sm form-control-solid w-150px ps-10'
                  placeholder='Search'
                />
              </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='row gx-9 gy-6'>
              {workflows ? (
                paginatedData?.map((workflow) => (
                  <div className='col-xl-6' data-kt-billing-element='address'>
                    <div className='card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6'>
                      <div className='d-flex flex-column py-2'>
                        <div className='d-flex flex-column py-2 mb-3'>
                          <div className='d-flex align-items-center fs-5 py-0 fw-bold mb-1'>
                            {workflow?.title}
                          </div>
                          <div className='fs-6 fw-semibold text-gray-600'>
                            {workflow?.description}
                          </div>
                        </div>
                        <div className='d-flex  d-flex g-2'>
                          {workflow.states.length > 0 ? (
                            workflow.states.map((state) => (
                              <span
                                style={{width: 'max-content', backgroundColor: state?.color}}
                                className={`badge fs-7 ms-2 py-2`}
                              >
                                {state?.title}
                              </span>
                            ))
                          ) : (
                            <span
                              style={{width: 'max-content'}}
                              className={`text-muted fs-5 ms-2 py-2`}
                            >
                              No States
                            </span>
                          )}
                        </div>
                      </div>
                      <div className='d-flex align-items-center py-2'>
                        <button
                          type='button'
                          className='btn btn-sm btn-light-danger btn-active-light-danger me-3'
                          data-kt-billing-action='address-delete'
                          onClick={() => handleDelete(workflow)}
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
                ))
              ) : (
                <div className='fv-row d-flex justify-content-center mh-300px'>
                  <div className='h-40px w-40px spinner-border spinner-border-sm align-middle ms-2'></div>
                </div>
              )}
              {workflows?.length === 0 && !isLoading && (
                <div className='fv-row d-flex justify-content-center mh-300px fs-5 py-20'>
                  <span className='text-muted'> No Workflows</span>
                </div>
              )}

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
          <div className='d-flex' style={{position: 'absolute', bottom: '20px', right: '20px'}}>
            <select
              name='status'
              data-control='select2'
              data-hide-search='true'
              className='form-select form-select-sm form-select-solid w-80px select2-hidden-accessible'
              tabIndex={-1}
              aria-hidden='true'
              data-kt-initialized='1'
              onChange={(e) => {
                setCurrentPage(0)
                setPageSize(Number(e.target.value))
              }}
              defaultValue={pageSize}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <ul className='pagination'>
              <li className={`page-item previous ${currentPage === 0 ? 'disabled' : ''}`}>
                <a href='#' className='page-link' onClick={() => handlePageClick(currentPage - 1)}>
                  <i className='previous'></i>
                </a>
              </li>
              {paginationItems}
              <li className={`page-item next ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                <a href='#' className='page-link' onClick={() => handlePageClick(currentPage + 1)}>
                  <i className='next'></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className='col-lg-4'>
          <WorkflowHeader setPage={handleChange} setCurrentWorkflow={handleCurrentWorkflowChange} />
        </div>
        <div className='col-lg-8'> */}
        {/* {page === 'new' && !currentWorkflow && <CreateWorkFlow />} */}
        {currentWorkflow && (
          <EditWorkFlow
            refreshWorkflow={getWorkflows}
            currentWorkflow={currentWorkflow}
            setCurrentWorkflow={setCurrentWorkflow}
          />
        )}
        {createNew && <CreateWorkFlow refreshWorkflow={getWorkflows} setCreateNew={setCreateNew} />}
        {/* </div> */}
      </div>
    </>
  )
}

export default Workflow
