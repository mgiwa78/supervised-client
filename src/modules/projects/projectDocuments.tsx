import React, {useEffect, useState} from 'react'
import {Link, useLocation, useParams} from 'react-router-dom'
import {KTIcon, toAbsoluteUrl} from '../../_metronic/helpers'
import {useSelector} from 'react-redux'
import {selectToken, selectUser} from '../../redux/selectors/auth'
import CreateDocument from './createDocument'
import get from '../../lib/get'
import TDocument from '../../types/Document'
import * as swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {TProject} from '../../types/Project'
import FormatDate from '../../utils/FormatDate'
import deleteReq from '../../lib/delete'

const MySwal = withReactContent(swal.default)

type Props = {
  refreshProject: Function
  project: TProject
}

const ProjectDocuments = ({project, refreshProject}: Props) => {
  const location = useLocation()
  const user = useSelector(selectUser)
  const {projectId} = useParams()
  const token = useSelector(selectToken)

  const handleDelete = (document: TDocument) => {
    MySwal.fire({
      title: 'Are you sure, you want to delete this document?',
      text: `Document title: ${document.name}`,
      icon: 'error',
      buttonsStyling: false,
      confirmButtonText: 'Yes Delete!',
      showCancelButton: true,
      heightAuto: false,
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-secondary',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFile(document).then((res) => {
          if (res?.data) {
            refreshProject()
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
        })
      }
    })
  }

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDelete, setisDelete] = useState<boolean>(false)
  const [IsLoading, setIsLoading] = useState<boolean>(false)
  const [documents, setDocuments] = useState<Array<TDocument>>()

  const handleClose = () => {
    setIsOpen(false)
  }

  const deleteFile = async (file: any) => {
    const RESPONSE = await deleteReq(`projects/${projectId}/${file._id}`, token)
    console.log(RESPONSE)
    return RESPONSE
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
          <div className='me-4' data-select2-id='select2-data-196-n49e'>
            <select
              name='status'
              data-control='select2'
              data-hide-search='true'
              className='form-select form-select-sm form-select-solid w-125px select2-hidden-accessible'
              data-select2-id='select2-data-9-1ubb'
              tabIndex={-1}
              aria-hidden='true'
              data-kt-initialized='1'
              defaultValue={'Backlog'}
            >
              <option value='' data-select2-id='select2-data-11-t490'>
                Select State
              </option>
              {project?.workflow?.states?.map((state) => (
                <option value={state._id} key={state._id} data-select2-id='select2-data-11-t490'>
                  {state.title}
                </option>
              ))}
            </select>
          </div>
          {user?.roles.some((role) => role.name === 'Student') && (
            <button onClick={() => setIsOpen(true)} className='btn btn-primary btn-sm'>
              Create Document
            </button>
          )}
        </div>
      </div>
      <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
        {project.files?.map((document: any) => (
          <div key={document._id} className='col-md-6 col-lg-4 col-xl-3'>
            <div className='card h-100' style={{position: 'relative'}}>
              <button
                type='button'
                onClick={() => handleDelete(document)}
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
                <div className='fs-4 fw-semibold text-gray-400'>
                  {FormatDate(document.createdAt)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isOpen && <CreateDocument refreshProject={refreshProject} handleClose={handleClose} />}
    </>
  )
}

export default ProjectDocuments
