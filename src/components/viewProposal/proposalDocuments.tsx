import React, {useEffect, useState} from 'react'
import {Link, useLocation, useParams} from 'react-router-dom'
import {KTIcon, toAbsoluteUrl} from '../../_metronic/helpers'
import {useSelector} from 'react-redux'
import {selectToken, selectUser} from '../../redux/selectors/auth'
import get from '../../lib/get'
import TDocument from '../../types/Document'
import * as swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ViewProposalDoc from './viewProposalDocument'

const MySwal = withReactContent(swal.default)

type PropTypes = {
  documents: Array<{
    name: string
    path: string
  }>
}
const ProposalDocuments = ({documents}: PropTypes) => {
  const location = useLocation()
  const user = useSelector(selectUser)
  const {projectId} = useParams()
  const token = useSelector(selectToken)

  const [docView, setDocView] = useState<any>()

  const handleDelete = (document: string) => {
    MySwal.fire({
      title: 'Are you sure, you want to delete this document?',
      icon: 'error',
      buttonsStyling: false,
      confirmButtonText: 'Yes Delete!',
      heightAuto: false,
      customClass: {
        confirmButton: 'btn btn-danger',
      },
    }).then(() => {})
  }

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDelete, setisDelete] = useState<boolean>(false)
  const [IsLoading, setIsLoading] = useState<boolean>(false)

  const handleViewDocClose = () => {
    setDocView(undefined)
  }

  // useEffect(() => {
  //   const getProjects = async () => {
  //     setIsLoading(true)
  //     try {
  //       if (token) {
  //         const RESPONSE = await get(`documents/project/${projectId}`, token)
  //         setDocuments(RESPONSE.data)
  //         console.log(RESPONSE.data)
  //         setIsLoading(false)
  //       }
  //     } catch (error) {
  //       setIsLoading(false)
  //       setDocuments([])
  //       console.log(error)
  //     }
  //   }
  //   getProjects()
  // }, [token])

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bold my-2'>
          Documents
          <span className='fs-6 text-gray-400 fw-semibold ms-1'></span>
        </h3>
        <div className='d-flex my-2'>
          <div className='d-flex align-items-center position-relative me-4'>
            <i className='ki-duotone ki-magnifier fs-3 position-absolute ms-3'>
              <span className='path1'></span>
              <span className='path2'></span>
            </i>
            <input
              type='text'
              id='kt_filter_search'
              className='form-control form-control-sm form-control-solid w-150px ps-10'
              placeholder='Search'
            />
          </div>

          {/* {user?.roles.some((role) => role.name === 'Student') && (
            <button onClick={() => setIsOpen(true)} className='btn btn-primary btn-sm'>
              Create Document
            </button>
          )} */}
        </div>
      </div>
      <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
        {documents?.map((document) => (
          <div className='col-md-6 col-lg-4 col-xl-3'>
            <div className='card h-100' style={{position: 'relative'}}>
              {user?.roles.some((role) => role.name === 'Student') && (
                <button
                  type='button'
                  onClick={() => handleDelete(document.name)}
                  className='btn btn-sm btn-icon btn-color-danger btn-active-light-danger mb-2'
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                  data-kt-menu-flip='top-end'
                  title='Delete'
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '10px',
                  }}
                >
                  <KTIcon iconName='trash' className='fs-2' />
                </button>
              )}
              <button
                type='button'
                onClick={() => setDocView(document)}
                className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary mb-2'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
                data-kt-menu-flip='top-end'
                title='View'
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                }}
              >
                <KTIcon iconName='eye' className='fs-2' />
              </button>

              <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
                <span className='text-gray-800 text-hover-primary d-flex flex-column'>
                  <div className='symbol symbol-60px mb-5'>
                    <img
                      src={toAbsoluteUrl('/media/svg/files/doc.svg')}
                      className='theme-light-show'
                      alt=''
                    />
                    <img
                      src={toAbsoluteUrl('/media/svg/files/doc.svg')}
                      className='theme-dark-show'
                      alt=''
                    />
                  </div>
                  <div className='fs-5 fw-bold mb-2'>{document.name}</div>
                </span>
                {/* <div className='fs-4 fw-semibold text-gray-400'>{document.description}</div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* {isOpen && <CreateDocument handleClose={handleClose} />} */}
      {docView !== undefined && <ViewProposalDoc handleClose={handleViewDocClose} file={docView} />}
    </>
  )
}

export default ProposalDocuments
