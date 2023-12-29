import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {TProposal} from '../../types/Proposal'
import FormatDate from '../../utils/FormatDate'
import {KTIcon, toAbsoluteUrl} from '../../_metronic/helpers'
import ViewProposalDoc from './viewProposalDocument'
import * as swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import post from '../../lib/post'
import {useSelector} from 'react-redux'
import {selectToken} from '../../redux/selectors/auth'
import get from '../../lib/get'
import TWorkflow from '../../types/Workflow'

const MySwal = withReactContent(swal.default)

type PropType = {
  proposal: TProposal
  workflows: Array<TWorkflow>
}

const ProposalOverview = ({proposal, workflows}: PropType) => {
  const [docView, setDocView] = useState<any>()
  const handleViewDocClose = () => {
    setDocView(undefined)
  }
  const token = useSelector(selectToken)

  const handleDelete = async (document: TProposal) => {
    // ...{[workflow._id]:[workflow.title]}
    console.log()
    MySwal.fire({
      title: 'Are you sure, you want to approve this proposal?',
      text: `Document title: ${document.title}`,
      icon: 'error',
      input: 'select',
      inputOptions: {
        // ...workflows.map((workflow) => ({[workflow._id]: [workflow.title]})),
        apples: 'Apples',
        bananas: 'Bananas',
        grapes: 'Grapes',
        oranges: 'Oranges',
      },
      buttonsStyling: false,
      confirmButtonText: 'Yes Delete!',
      showCancelButton: true,
      heightAuto: false,
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-secondary',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await post('proposals/approve', {...proposal}, token, true, 'Project Approved').then(
          (res) => {
            if (res?.data) {
              MySwal.fire({
                title: 'Deleted!',
                text: 'File has been deleted.',
                icon: 'success',
              })
            } else {
              MySwal.fire({
                title: 'Error',
                text: res?.error,
                icon: 'error',
                confirmButtonText: 'Close!',
                customClass: {
                  confirmButton: 'btn btn-danger',
                },
              })
            }
          }
        )
      }
    })
  }

  return (
    <>
      {proposal ? (
        <div className='row'>
          <div className='col-lg-6 mb-8'>
            <div className='card  h-lg-100'>
              <div className='card-header '>
                <div className='card-title flex-column'>
                  <h3 className='fw-bold '> Overview</h3>
                </div>
                {/* <div className='card-toolbar'>
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
                      <a
                        onClick={() => null}
                        className='menu-link bg-hover-success text-hover-white  px-3'
                      >
                        Approve
                      </a>
                    </div>
                    <div className='menu-item px-3'>
                      <a
                        onClick={() => null}
                        className='menu-link bg-hover-danger text-hover-white px-3'
                      >
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
              </div> 
                  </div>
                </div> */}
              </div>
              <div className='card-body'>
                <div className='d-flex gap-7 align-items-center mb-8'>
                  <div className='symbol symbol-circle symbol-100px'>
                    <img alt='Pic' src={toAbsoluteUrl(`/media/avatars/blank.png`)} />
                  </div>
                  <div className='d-flex flex-column gap-2'>
                    <h3 className='mb-0'>
                      {proposal?.student.firstName + ' ' + proposal?.student.lastName}
                    </h3>
                    <div className='d-flex align-items-center gap-2'>
                      <i className='ki-duotone ki-sms fs-2'>
                        <span className='path1'></span>
                        <span className='path2'></span>
                      </i>
                      <a href='#' className='text-muted text-hover-primary'>
                        {proposal?.student.email}
                      </a>
                    </div>
                  </div>
                </div>
                <div className='d-flex flex-column gap-5 '>
                  <div className='d-flex flex-column gap-1'>
                    <div className='fw-bold text-muted'> Title </div>
                    <div className='fw-bold fs-5'>{proposal?.title}</div>
                  </div>
                  <div className='d-flex flex-column gap-1'>
                    <div className='fw-bold text-muted'>Description</div>
                    <div className='fw-bold fs-5'>{proposal?.description}</div>
                  </div>
                  <div className='d-flex flex-column gap-1'>
                    <div className='fw-bold text-muted'>Timeline</div>
                    <div className='fw-bold fs-5'>{proposal?.timeline}</div>
                  </div>
                  <div className='d-flex flex-column gap-1'>
                    <div className='fw-bold text-muted'>Methodology</div>
                    <div className='fw-bold fs-5'>{proposal?.methodology}</div>
                  </div>
                  <div className='d-flex flex-column gap-1'>
                    <div className='fw-bold text-muted'>Date Submitted</div>
                    <div className='fw-bold fs-5'>{FormatDate(proposal?.createdAt)}</div>
                  </div>
                  <div className='d-flex flex-column gap-1'>
                    <div className='fw-bold text-muted'>Objectives</div>
                    <div className='d-flex flex-column'>
                      {proposal?.objectives.map((ob, i) => (
                        <li key={i} className='d-flex align-items-center py-2 fs-5'>
                          <span className='bullet me-5'></span> {ob}
                        </li>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6 mb-8'>
            <div className='card  h-lg-100'>
              <div className='card-header '>
                <div className='card-title flex-column'>
                  <h3 className='fw-bold '> Documents</h3>
                </div>
              </div>
              <div className='card-body'>
                <div className='d-flex flex-column gap-5 '>
                  {proposal?.files.map((file) => (
                    <div
                      key={file._id}
                      className='d-flex align-items-center justify-content-between mb-5'
                    >
                      <div className='d-flex'>
                        <div className='symbol symbol-30px me-5'>
                          <img alt='Icon' src={toAbsoluteUrl('/media/svg/files/doc.svg')} />
                        </div>
                        <div className='fw-semibold'>
                          <a className='fs-6 fw-bold text-dark text-hover-primary' href='#'>
                            {file.name}
                          </a>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => setDocView(file)}
                          title='View'
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mr-1'
                        >
                          <KTIcon iconName='eye' className='fs-3' />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      {docView !== undefined && <ViewProposalDoc handleClose={handleViewDocClose} file={docView} />}
    </>
  )
}

export default ProposalOverview
