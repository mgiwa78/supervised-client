import React, {useEffect, useState} from 'react'
import {PageTitle} from '../../_metronic/layout/core'
import type {PageLink} from '../../_metronic/layout/core'
import {KTIcon} from '../../_metronic/helpers'
import get from '../../lib/get'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/store'
import User from '../../types/User'

import FormatDate from '../../utils/FormatDate'
import {Spinner} from '../../components/Spinner'
import {TProposal} from '../../types/Proposal'
import ProposalsTable from '../../components/proposals'

const MyProposals = ({role = 'Proposals'}) => {
  const token = useSelector((state: RootState) => state.auth.token)
  const [proposals, setProposals] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>()

  useEffect(() => {
    const handleSetProposals = async () => {
      setProposals(proposals)
      try {
        const RESPONSE = await get('proposals', token)
        setProposals(RESPONSE.data)
        setIsLoading(false)
      } catch (error) {
        setProposals([])
        setIsLoading(false)
      }
    }

    handleSetProposals()
  }, [])

  //   const handleModalUpdate = (newuser: User | null) => {
  //     newuser ? setItemIdForUpdate(newuser._id) : setItemIdForUpdate(null)
  //     getProposals(newuser)
  //   }

  return (
    <>
      <ProposalsTable role={'Proposals'} proposals={proposals} isLoading={isLoading} />
    </>
  )
}

export default MyProposals
