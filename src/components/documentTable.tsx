import React from 'react'
import TDocument from '../types/Document'
import {KTIcon} from '../_metronic/helpers'
import {Link} from 'react-router-dom'
import {Spinner} from './Spinner'
import FormatDate from '../utils/FormatDate'
import {useSelector} from 'react-redux'
import {selectAuth, selectUser} from '../redux/selectors/auth'
type Props = {
  isLoading: boolean
  title: string
  assginDoc: Function
  documents: Array<TDocument>
}
const DocumentTable = ({title, documents, isLoading, assginDoc}: Props) => {
  const currentUser = useSelector(selectUser)
  return (
    <div>
      <div className={`card mb-5 mb-xl-8`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>{title}</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>
              Total documents {documents && documents.length}
            </span>
          </h3>
          <div className='card-toolbar'>
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
                <div className='menu-content fs-6 text-dark fw-bold px-3 py-4'>Quick Actions</div>
              </div>
              <div className='separator mb-3 opacity-75'></div>

              <div className='menu-item px-3'>
                <Link to='/documents/create' className='menu-link px-3'>
                  New Document
                </Link>
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
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='w-25px'>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        value='1'
                        data-kt-check='true'
                        data-kt-check-target='.widget-13-check'
                      />
                    </div>
                  </th>
                  <th className='min-w-150px'>Document Id</th>
                  <th className='min-w-140px'>Title</th>
                  <th className='min-w-120px'>Description</th>
                  {/* <th className='min-w-120px'>Roles</th> */}
                  <th className='min-w-120px'>Created At</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={6}>
                      <Spinner />
                    </td>
                  </tr>
                )}
                {!isLoading && documents.length === 0 && (
                  <tr>
                    <td className='py-10 text-center text-bolder text-muted' colSpan={6}>
                      No Documents
                    </td>
                  </tr>
                )}
                {documents &&
                  documents.map((document: TDocument) => {
                    return (
                      <tr key={document._id}>
                        <td>
                          <div className='form-check form-check-sm form-check-custom form-check-solid'>
                            <input
                              className='form-check-input widget-13-check'
                              type='checkbox'
                              value='1'
                            />
                          </div>
                        </td>
                        <td>
                          <span className='text-dark fw-bold text-hover-primary fs-6'>
                            {document._id}
                          </span>
                        </td>
                        <td>
                          <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                            {document.title}
                          </span>
                          <span className='text-muted fw-semibold text-muted d-block fs-7'></span>
                        </td>

                        {/* <td>
                          <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'></span>
                        </td> */}
                        <td className='text-dark fw-bold text-hover-primary fs-6'>
                          {document.description}
                        </td>
                        <td className='text-dark fw-bold text-hover-primary fs-6'>
                          {FormatDate(document.createdAt)}
                        </td>

                        <td className='text-end'>
                          {currentUser?.roles.some(
                            (role: any) => role.name === 'Faculty Admin'
                          ) && (
                            <span
                              onClick={() => assginDoc(document._id)}
                              title='Assign'
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                            >
                              <KTIcon iconName='switch' className='fs-3' />
                            </span>
                          )}
                          {currentUser?.roles.some((role: any) => role.name === 'Supervisor') && (
                            <Link
                              to={`/documents/review/${document._id}`}
                              title='Review'
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                            >
                              <KTIcon iconName='eye' className='fs-3' />
                            </Link>
                          )}
                          {currentUser?.roles.some((role: any) => role.name === 'Student') && (
                            <Link
                              to={`/documents/edit/${document._id}`}
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mr-1'
                            >
                              <KTIcon iconName='pencil' className='fs-3' />
                            </Link>
                          )}
                          {/* <a
                            href='#'
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          >
                            <KTIcon iconName='trash' className='fs-3' />
                          </a> */}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentTable
