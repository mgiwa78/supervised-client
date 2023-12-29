/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../_metronic/helpers'
import {Link, useLocation, useParams} from 'react-router-dom'
import {Dropdown1} from '../../_metronic/partials'
import {useSelector} from 'react-redux'
import {selectToken} from '../../redux/selectors/auth'
import get from '../../lib/get'
import User from '../../types/User'
import {Spinner} from '../../components/Spinner'
import FormatDate from '../../utils/FormatDate'
import {TProposal} from '../../types/Proposal'
import TWorkflow from '../../types/Workflow'
import * as swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import post from '../../lib/post'
const MySwal = withReactContent(swal.default)

type PropType = {
  proposal: TProposal
  workflows: Array<TWorkflow>
  isLoading: boolean
  proposalId: string
  setPage: Function
  page: string
}
const ProposalHeader = ({proposal, isLoading, proposalId, setPage, page, workflows}: PropType) => {
  const location = useLocation()
  const token = useSelector(selectToken)
  let workFlowOptions: any = {}

  useEffect(() => {
    workflows.forEach((workflow) => {
      workFlowOptions[workflow._id] = workflow.title
    })
  }, [workflows])
  const handleApprove = async (proposal: TProposal) => {
    // ...{[workflow._id]:[workflow.title]}

    console.log(workFlowOptions)
    MySwal.fire({
      title: 'Are you sure, you want to approve this proposal?',
      text: `Document title: ${document.title}`,
      input: 'select',
      inputOptions: workFlowOptions,
      inputPlaceholder: 'Select Project Workflow',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve()
          } else {
            resolve('You need to select a Workflow')
          }
        })
      },
      buttonsStyling: false,
      confirmButtonText: 'Approve!',
      showCancelButton: true,
      heightAuto: false,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-secondary',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await post(
          'proposals/approve',
          {...proposal, workflow: result.value},
          token,
          true,
          'Project Approved'
        )
      }
    })
  }
  return (
    <>
      {proposal && !isLoading && (
        <div className='card mb-5 mb-xl-10'>
          <div className='card-toolbar' style={{position: 'absolute', right: 15, top: 15}}>
            <button
              type='button'
              className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='top-end'
            >
              <KTIcon iconName='category' className='fs-2' />
            </button>
            <div
              className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-200px'
              data-kt-menu='true'
            >
              <div className='menu-item px-3'>
                <div
                  onClick={() => handleApprove(proposal)}
                  className='menu-link bg-hover-success text-hover-white  px-3'
                >
                  Approve
                </div>
              </div>
              <div className='menu-item px-3'>
                <a onClick={() => null} className='menu-link bg-hover-danger text-hover-white px-3'>
                  Reject
                </a>
              </div>

              <div className='separator mt-3 opacity-75'></div>

              {/* <div className='menu-item px-3'>
                <div className='menu-content px-3 py-3'>
                  <a className='btn btn-primary btn-sm px-4' href='#'>
                    Generate Reports
                  </a>
                </div>
              </div> */}
            </div>
          </div>
          <div className='card-body pt-9 pb-0'>
            <div className='d-flex flex-wrap flex-sm-nowrap mb-6'>
              <div className='d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4'>
                <span className='symbol-label  fs-1  fw-bold'>{proposal.title[0]}</span>
              </div>
              <div className='flex-grow-1'>
                <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                  <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center mb-1'>
                      <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bold me-3'>
                        {proposal.title}
                      </a>
                      <span className='badge badge-light-success me-auto'>{proposal.status}</span>
                    </div>
                    <div className='d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-400'>
                      {proposal.description}
                    </div>
                  </div>
                </div>
                <div className='d-flex flex-wrap justify-content-start'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-4 fw-bold'>
                        {' '}
                        {proposal.student.lastName + ' ' + proposal.student.firstName}
                      </div>
                    </div>
                    <div className='fw-semibold fs-6 text-gray-400'>Author</div>
                  </div>

                  <div className='d-flex flex-wrap'>
                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <div className='fs-4 fw-bold'>
                          {proposal.createdAt ? FormatDate(proposal.createdAt) : '-----'}
                        </div>
                      </div>
                      <div className='fw-semibold fs-6 text-gray-400'>Date Created</div>
                    </div>
                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <div
                          className='fs-4 fw-bold counted'
                          data-kt-countup='true'
                          data-kt-countup-value='5'
                          data-kt-initialized='1'
                        >
                          {proposal.files.length ? proposal.files.length : 'No Files'}
                        </div>
                      </div>
                      <div className='fw-semibold fs-6 text-gray-400'>Documents</div>
                    </div>

                    {/* <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div
                        className='fs-4 fw-bold counted'
                        data-kt-countup='true'
                        data-kt-countup-value='15000'
                        data-kt-countup-prefix='$'
                        data-kt-initialized='1'
                      >
                        23
                      </div>
                    </div>
                    <div className='fw-semibold fs-6 text-gray-400'>Total Segments</div>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className='separator'></div>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold'>
              <li className='nav-item'>
                <button
                  className={`nav-link text-active-primary me-6 py-5 ` + (page === 'overview')}
                  onClick={() => setPage('overview')}
                >
                  Overview
                </button>
                <button
                  className={`nav-link text-active-primary me-6 py-5 ` + (page === 'documents')}
                  onClick={() => setPage('documents')}
                >
                  Documents
                </button>
                {/* <button
                  className={`nav-link text-active-primary me-6 py-5 ` + (page === 'approve')}
                  onClick={() => setPage('approve')}
                >
                  Approve
                </button> */}
              </li>
            </ul>
          </div>
        </div>
      )}{' '}
      {isLoading && <Spinner />}
    </>
  )
}

export default ProposalHeader
