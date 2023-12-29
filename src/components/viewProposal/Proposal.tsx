import React, {useEffect, useState} from 'react'
import {Outlet, Route, Routes, useLocation, useParams} from 'react-router-dom'

import ProposalHeader from './proposalHeader'
import {PageLink, PageTitle} from '../../_metronic/layout/core'
import {useSelector} from 'react-redux'
import {selectToken} from '../../redux/selectors/auth'
import {TProposal} from '../../types/Proposal'
import get from '../../lib/get'
import ProposalOverview from './proposalOverview'
import ProposalDocuments from './proposalDocuments'
import ProposalApproval from './proposalApproval'
import TWorkflow from '../../types/Workflow'

const Proposal = () => {
  const token = useSelector(selectToken)
  const location = useLocation()
  const {proposalId} = useParams()

  const [workflows, setWorkflows] = useState<Array<TWorkflow>>([])
  const [proposal, setProposal] = useState<TProposal>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [page, setPage] = useState<'documents' | 'overview' | 'approve'>('overview')

  const getWorkflows = async () => {
    const RESPONSE = await get(`workflows`, token)
    if (RESPONSE?.data) {
      // setWorkflows(RESPONSE.data)
      setWorkflows(RESPONSE.data)
    }
  }

  useEffect(() => {
    const getProposal = async () => {
      try {
        setIsLoading(true)
        const RESPONSE = await get(`proposals/${proposalId}`, token)
        setIsLoading(false)
        setProposal(RESPONSE.data)
      } catch (error) {
        setIsLoading(false)
      }
    }
    getProposal()
    getWorkflows()
  }, [token, proposalId])

  const ProposalBreadcrumbs: Array<PageLink> = [
    {
      title: 'Proposals ',
      path: '/proposals/all',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]
  return (
    <>
      <ProposalHeader
        isLoading={isLoading}
        page={page}
        workflows={workflows}
        proposalId={proposalId}
        setPage={setPage}
        proposal={proposal}
      />
      {page === 'overview' && <ProposalOverview proposal={proposal} workflows={workflows} />}
      {page === 'documents' && <ProposalDocuments documents={proposal.files} />}
      {page === 'approve' && <ProposalApproval proposal={proposal} />}
    </>
  )
}

export default Proposal
