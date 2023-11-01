import React, {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {TProposal} from '../../types/Proposal'
import FormatDate from '../../utils/FormatDate'
import {KTIcon, toAbsoluteUrl} from '../../_metronic/helpers'
import ViewProposalDoc from './viewProposalDocument'

type PropType = {
  proposal: TProposal
}

const ProposalOverview = ({proposal}: PropType) => {
  const [docView, setDocView] = useState<any>()
  const handleViewDocClose = () => {
    setDocView(undefined)
  }
  return (
    <>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='card  h-lg-100'>
            <div className='card-header '>
              <div className='card-title flex-column'>
                <h3 className='fw-bold '> Overview</h3>
              </div>
            </div>
            <div className='card-body'>
              <div className='d-flex gap-7 align-items-center mb-8'>
                <div className='symbol symbol-circle symbol-100px'>
                  <img alt='Pic' src={toAbsoluteUrl(`/media/avatars/blank.png`)} />
                </div>
                <div className='d-flex flex-column gap-2'>
                  <h3 className='mb-0'>
                    {' '}
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
        <div className='col-lg-6'>
          <div className='card  h-lg-100'>
            <div className='card-header '>
              <div className='card-title flex-column'>
                <h3 className='fw-bold '> Documents</h3>
              </div>
            </div>
            <div className='card-body'>
              <div className='d-flex flex-column gap-5 '>
                {proposal?.files.map((file) => (
                  <div className='d-flex align-items-center justify-content-between mb-5'>
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
      {docView !== undefined && <ViewProposalDoc handleClose={handleViewDocClose} file={docView} />}
    </>
  )
}

export default ProposalOverview
