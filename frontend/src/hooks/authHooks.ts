import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { routes } from 'routes/routes'
import { AUTH_ACTION, GLOBAL_ACTION } from 'store/actions'
import useCall from './useCall'
import { STORAGE_STRING } from '@empty/lib.constants'

export const useLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const call = useCall()

  interface loginProps {
    email: string
    password: string
  }

  return (data: loginProps) =>
    call(async function login() {
      // INSTALL: Replace this with your own login API
      const res = {
        accessToken: '123',
        message: 'login_success',
      }

      if (res.accessToken) {
        dispatch({
          type: AUTH_ACTION.LOGIN_SUCCESS,
          data: res,
        })

        localStorage.setItem(STORAGE_STRING, res.accessToken)
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
      // INSTALL: Replace this with your own logout API
      // await AuthApi.logout()
      dispatch({ type: AUTH_ACTION.LOG_OUT })
      localStorage.removeItem(STORAGE_STRING)
      window.location.reload()
      if (!noRedirect) navigate(routes.login)
    })
}

export const useGetCurrentUser = () => {
  const dispatch = useDispatch()
  const call = useCall()

  return () =>
    call(async function getCurrentUser() {
      const accessToken = localStorage.getItem(STORAGE_STRING)

      if (!accessToken) return null

      // INSTALL: Replace this with your own getCurrentUser API
      const res = {}
      dispatch({ type: AUTH_ACTION.GET_CURRENT_USER_SUCCESS, data: res })

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
      // INSTALL: Replace this with your own resetPassword API
      const res = true
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
      // INSTALL: Replace this with your own forgotPassword API
      // await AuthApi.forgotPassword(data)
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
      // INSTALL: Replace this with your own resendVerificationEmail API
      // await AuthApi.resendVerificationEmail(data)
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
        // INSTALL: Replace this with your own verifyEmail API
        //   AuthApi.verifyEmail(token)
        //     .then(res => {
        //       setIsVerified(true)
        //       dispatch({
        //         type: GLOBAL_ACTION.ADD_TOAST,
        //         data: { type: ToastType.success, text: 'login_emailVerified_success' },
        //       })
        //     })
        //     .catch(err => {
        //       console.log(err)
        //       setIsVerified(false)
        //       dispatch({
        //         type: GLOBAL_ACTION.ADD_TOAST,
        //         data: { type: ToastType.error, text: 'login_emailVerified_error' },
        //       })
        //     })
        // else setIsVerified(null)
        return true
    })
  }, [location])

  return { isVerified }
}
