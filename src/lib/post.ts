import axios, {AxiosError} from 'axios'
import {useNavigate} from 'react-router-dom'
// import {process.env.REACT_APP_API_URL} from '__CONSTANTS__/index'
import * as swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {logout} from '../redux/slice/authSlice'
import {useDispatch} from 'react-redux'
import Users from '../modules/users/users'

const MySwal = withReactContent(swal.default)

const post = async (
  path: string,
  data: Object,
  authToken: string | null = null,
  isPrompt: boolean = false,
  prompt: string = ''
) => {
  try {
    const RESPONSE = await axios.post(process.env.REACT_APP_API_URL + path, data, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    })

    isPrompt &&
      MySwal.fire({
        text: prompt,
        icon: 'success',
        buttonsStyling: false,
        confirmButtonText: 'Ok!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      }).then(() => {})
    return RESPONSE.data
  } catch (error: any) {
    console.log(error)

    if (error.response.status === 401) {
      return MySwal.fire({
        text: 'Unauthorised',
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Ok!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      }).then(() => {})
    }
    if (error.response.status === 409) {
      console.log('first')
      return MySwal.fire({
        text: 'Athentication Required',
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Ok!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      }).then(() => {
        window.location.href = '/logout'
      })
    }
    if (error.response.status === 403) {
      return MySwal.fire({
        text: 'Permission Denied',
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Ok!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      }).then(() => {})
    }
    if (error.response.status === 500) {
      return MySwal.fire({
        text: error.response.data.message || `Internal server error`,
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Ok!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      }).then(() => {})
    }

    if (error.response?.data.errors) {
      return MySwal.fire({
        icon: 'error',
        html:
          '<div class="text-left align-left">' +
          error.response.data.errors.map(
            (e: any) => `<b class="text-capitalize"> ${e.field} </b>: ${e.message}<br>`
          ) +
          '</div>',
        buttonsStyling: false,
        confirmButtonText: 'Ok!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      }).then(() => {})
    }
    if (error.response.data.error) {
      return MySwal.fire({
        text: error.response.data.error,
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Ok!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      }).then(() => {})
    } else {
      return MySwal.fire({
        text: error.message,
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Ok!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      }).then(() => {})
    }
  }
}

export default post
