import { AuthApi, UsersApi } from 'api'
import { PermissionsApi } from 'api/permissions.api'
import { ACCESS_TOKEN } from 'config/constant'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { routes } from 'routes/routes'
import { AUTH_ACTION, GLOBAL_ACTION } from 'store/actions'
import { useGetWeekCases } from './caseshooks'
import { useGetSystemConfiguration } from './systemConfigurationHooks'
import useCall from './useCall'
import { useGetOperatingRooms } from './roomsHooks'
import { ToastType } from '@empty/lib.constants'

export const useLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const call = useCall()
  const getOperatingRooms = useGetOperatingRooms()
  const getSystemConfiguration = useGetSystemConfiguration()

  interface loginProps {
    email: string
    password: string
  }

  return (data: loginProps) =>
    call(async function login() {
      const res = await AuthApi.login(data)

      if (res.accessToken) {
        dispatch({
          type: AUTH_ACTION.LOGIN_SUCCESS,
          data: res,
        })

        localStorage.setItem(ACCESS_TOKEN, res.accessToken)
        getSystemConfiguration()
        getOperatingRooms()
        navigate(routes.home)
        return true
      } else {
        dispatch({
          type: GLOBAL_ACTION.ADD_TOAST,
          data: { text: res.message, type: 'error' },
        })
        return res
      }
    })
}

export const useLogout = () => {
  const dispatch = useDispatch()
  const call = useCall()
  const navigate = useNavigate()

  return (noRedirect?: boolean) =>
    call(async function logout() {
      await AuthApi.logout()
      dispatch({ type: AUTH_ACTION.LOG_OUT })
      localStorage.removeItem(ACCESS_TOKEN)
      window.location.reload()
      if (!noRedirect) navigate(routes.login)
    })
}

export const useGetCurrentUser = () => {
  const dispatch = useDispatch()
  const call = useCall()
  const getWeekCases = useGetWeekCases()
  const getOperatingRooms = useGetOperatingRooms()
  const getSystemConfiguration = useGetSystemConfiguration()

  return () =>
    call(async function getCurrentUser() {
      const accessToken = localStorage.getItem(ACCESS_TOKEN)

      if (!accessToken) return null

      const res = await UsersApi.getCurrentUser()
      dispatch({ type: AUTH_ACTION.GET_CURRENT_USER_SUCCESS, data: res })

      getWeekCases(new Date())
      getOperatingRooms()
      getSystemConfiguration()

      return res
    })
}

export const useOnLoading = () => {
  const dispatch = useDispatch()
  const [shouldRedirect, setShouldRedirect] = React.useState<boolean>(true)
  const getCurrentUser = useGetCurrentUser()
  const logout = useLogout()

  React.useEffect(() => {
    getCurrentUser().then(user => {
      if (window.location.pathname.includes('reset-password')) {
        setShouldRedirect(false)
        if (user) logout(true)
      }

      dispatch({ type: GLOBAL_ACTION.STOP_LOADING, data: 'onStart' })
    })
  }, [])

  return { shouldRedirect }
}

export const useResetPassword = () => {
  const dispatch = useDispatch()
  const call = useCall()
  const navigate = useNavigate()

  interface resetPasswordProps {
    password: string
    token: string
  }

  return (data: resetPasswordProps) =>
    call(async function resetPassword() {
      const res = await AuthApi.resetPassword(data)
      if (res === true) {
        dispatch({
          type: GLOBAL_ACTION.ADD_TOAST,
          data: { text: 'reset_password_success', type: 'success' },
        })
        navigate(routes.login)
      } else {
        throw new Error(res.message)
      }
    })
}

export const useForgotPassword = () => {
  const dispatch = useDispatch()
  const call = useCall()

  interface forgotPasswordProps {
    email: string
  }

  return (data: forgotPasswordProps) =>
    call(async function forgotPassword() {
      await AuthApi.forgotPassword(data)
      dispatch({
        type: GLOBAL_ACTION.ADD_TOAST,
        data: { text: 'forgot_password_success', type: 'success' },
      })
    })
}

export const useResendVerificationEmail = () => {
  const dispatch = useDispatch()
  const call = useCall()

  interface resendVerificationEmailProps {
    email: string
  }

  return (data: resendVerificationEmailProps) =>
    call(async function resendVerificationEmail() {
      await AuthApi.resendVerificationEmail(data)
      dispatch({
        type: GLOBAL_ACTION.ADD_TOAST,
        data: { text: 'verify_email_success', type: 'success' },
      })
    })
}

export const useVerifyEmail = () => {
  const location = useLocation()
  const call = useCall()
  const [isVerified, setIsVerified] = React.useState<boolean | null>(null)
  const dispatch = useDispatch()

  React.useEffect(() => {
    call(async function verifyEmail() {
      const params = location.search.slice(1).split('=')
      const token = params ? params[1] : ''

      if (token)
        AuthApi.verifyEmail(token)
          .then(res => {
            setIsVerified(true)
            dispatch({
              type: GLOBAL_ACTION.ADD_TOAST,
              data: { type: ToastType.success, text: 'login_emailVerified_success' },
            })
          })
          .catch(err => {
            console.log(err)
            setIsVerified(false)
            dispatch({
              type: GLOBAL_ACTION.ADD_TOAST,
              data: { type: ToastType.error, text: 'login_emailVerified_error' },
            })
          })
      else setIsVerified(null)
    })
  }, [location])

  return { isVerified }
}
