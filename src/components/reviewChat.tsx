/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState} from 'react'
import clsx from 'clsx'
import {
  toAbsoluteUrl,
  defaultMessages,
  defaultUserInfos,
  MessageModel,
  UserInfoModel,
  messageFromClient,
  KTIcon,
} from '../_metronic/helpers'
import TComment from '../types/Comment'
import post from '../lib/post'
import {useSelector} from 'react-redux'
import {selectToken, selectUser} from '../redux/selectors/auth'
import {useParams} from 'react-router'
import {bottom} from '@popperjs/core'
import FormatDate from '../utils/FormatDate'
import axios from 'axios'
import deleteReq from '../lib/delete'

type Props = {
  isDrawer?: boolean
  comments: Array<TComment>
  setComments: Function
}

const bufferMessages = defaultMessages

const ReviewChat: FC<Props> = ({isDrawer = false, comments = [], setComments}) => {
  const {reviewSessionId} = useParams()
  const user = useSelector(selectUser)
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false)
  const [chatUpdateFlag, toggleChatUpdateFlat] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')

  // const [allComments, setAllComments] = useState<TComment[]>(comments)
  const [userInfos] = useState<UserInfoModel[]>(defaultUserInfos)

  const token = useSelector(selectToken)

  const sendMessage = async () => {
    try {
      setIsUserLoading(true)
      const newMessage: MessageModel = {
        user: 2,
        type: 'out',
        text: comment,
        time: 'Just now',
      }

      // bufferMessages.push(newMessage)
      // setMessages(bufferMessages)
      // toggleChatUpdateFlat(!chatUpdateFlag)
      // setMessage('')
      // setTimeout(() => {
      //   bufferMessages.push(messageFromClient)
      //   setMessages(() => bufferMessages)
      //   toggleChatUpdateFlat((flag) => !flag)
      // }, 1000)
      const RESPONSE = await post(
        `reviewSessions/comment/${reviewSessionId}`,
        {comment},
        token,
        false
      )
      setComment('')

      if (RESPONSE.data) {
        setComments(RESPONSE.data)
      }
      setIsUserLoading(false)
    } catch (error) {
      setIsUserLoading(false)
    }
  }
  const handleCommentDelete = async (commentID: string) => {
    const RESPONSE = await deleteReq(`comments/${commentID}`, token, true, 'Comment deleted')
    setComments(RESPONSE.data)
  }

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div
      className='card-body px-0'
      style={{height: '100%', position: 'relative'}}
      id={isDrawer ? 'kt_drawer_chat_messenger_body' : 'kt_chat_messenger_body'}
    >
      <div
        className={clsx('scroll-y', {'h-200px h-lg-auto': !isDrawer})}
        style={{paddingRight: '20px', overflowX: 'hidden'}}
        data-kt-element='messages'
        data-kt-scroll='true'
        data-kt-scroll-activate='{default: false, lg: true}'
        data-kt-scroll-max-height='auto'
        data-kt-scroll-dependencies={
          isDrawer
            ? '#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer'
            : '#kt_header, #kt_app_header, #kt_app_toolbar, #kt_toolbar, #kt_footer, #kt_app_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer'
        }
        data-kt-scroll-wrappers={
          isDrawer
            ? '#kt_drawer_chat_messenger_body'
            : '#kt_content, #kt_app_content, #kt_chat_messenger_body'
        }
        data-kt-scroll-offset={isDrawer ? '0px' : '5px'}
      >
        {comments.length > 0 ? (
          comments.map((message, index) => {
            console.log(message.author === user._id)
            console.log(typeof message.author !== 'string' && message.author._id, user._id)

            // const state = message.author === user._id ? 'info' : 'primary'
            const state =
              typeof message.author !== 'string'
                ? message.author._id === user._id
                  ? 'info'
                  : 'primary'
                : message.author === user._id
                ? 'info'
                : 'primary'

            const templateAttr = {}
            if (message.template) {
              Object.defineProperty(templateAttr, 'data-kt-element', {
                value: `template-${message.author === user._id}`,
              })
            }
            const contentClass = `${isDrawer ? '' : 'd-flex'} justify-content-${
              message.author === user._id ? 'start' : 'end'
            } mb-10`
            return (
              <div
                key={`message${index}`}
                className={clsx('d-flex', contentClass, 'mb-10', {'d-none': message.template})}
                {...templateAttr}
              >
                <div
                  className={clsx(
                    'd-flex flex-column align-items',
                    `align-items-${message.author === user._id ? 'start' : 'end'}`
                  )}
                >
                  <div className='d-flex align-items-center mb-2'>
                    {typeof message.author !== 'string' && message.author._id === user._id ? (
                      <>
                        <div className='symbol  symbol-35px symbol-circle '>
                          <img alt='Pic' src={toAbsoluteUrl(`/media/avatars/blank.png`)} />
                        </div>
                        <div className='ms-3'>
                          <a
                            href='#'
                            className='fs-7 fw-bolder text-gray-900 text-hover-primary me-1'
                          >
                            {message.author.firstName}
                            {message.author.lastName}
                          </a>{' '}
                          <br />
                          <span className='text-muted fs-7 mb-1'>
                            {' '}
                            {FormatDate(message.createdAt)}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className='me-3'>
                          <span className='text-muted fs-7 mb-1'>{message.createdAt}</span>
                          <a
                            href='#'
                            className='fs-5 fw-bolder text-gray-900 text-hover-primary ms-1'
                          >
                            You
                          </a>
                        </div>
                        <div className='symbol  symbol-35px symbol-circle '>
                          <img alt='Pic' src={toAbsoluteUrl(`/media/avatars/blank.png`)} />
                        </div>
                      </>
                    )}
                  </div>
                  <div className='text-end'>
                    <button
                      type='button'
                      onClick={() => handleCommentDelete(message._id)}
                      className='btn btn-sm btn-icon btn-color-danger btn-active-light-danger mb-2'
                      data-kt-menu-trigger='click'
                      data-kt-menu-placement='bottom-end'
                      data-kt-menu-flip='top-end'
                      title='Delete'
                    >
                      <KTIcon iconName='trash' className='fs-2' />
                    </button>{' '}
                    <div
                      className={clsx(
                        'p-5 rounded',
                        `bg-light-${state}`,
                        'text-dark fw-bold mw-lg-400px',
                        `text-${message.author === user._id ? 'start' : 'end'}`
                      )}
                      data-kt-element='message-text'
                      dangerouslySetInnerHTML={{__html: message.content}}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className='row'>
            <div className='col-12 text-center text-bolder text-muted' style={{height: '100%'}}>
              No Comments
            </div>
          </div>
        )}
      </div>

      <div
        className='card-footer pt-4'
        id={isDrawer ? 'kt_drawer_chat_messenger_footer' : 'kt_chat_messenger_footer'}
        style={{position: 'absolute', bottom: '10px', width: '90%', right: 0}}
      >
        <textarea
          className='form-control form-control-flush mb-3'
          rows={1}
          data-kt-element='input'
          placeholder='Type a message'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={onEnterPress}
        ></textarea>

        <div className='d-flex flex-stack'>
          <div className='d-flex align-items-center me-2'>
            <button
              className='btn btn-sm btn-icon btn-active-light-primary me-1'
              type='button'
              data-bs-toggle='tooltip'
              title='Coming soon'
            >
              <i className='bi bi-paperclip fs-3'></i>
            </button>
            <button
              className='btn btn-sm btn-icon btn-active-light-primary me-1'
              type='button'
              data-bs-toggle='tooltip'
              title='Coming soon'
            >
              <i className='bi bi-upload fs-3'></i>
            </button>
          </div>
          <button
            className='btn btn-primary'
            type='button'
            data-kt-element='send'
            onClick={sendMessage}
            disabled={isUserLoading}
          >
            <span className='indicator-label'>Submit</span>
            {isUserLoading && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export {ReviewChat}
