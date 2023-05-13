import React, { useState } from 'react'
import AuthLayout from 'layouts/AuthLayout'
import { Box, Button, TextField, Typography } from '@mui/material'
import logo from '../../../assets/img/logo.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useForgotPassword, useLogin, useResendVerificationEmail } from 'hooks'
import { routes } from 'routes/routes'
import VerifyModal from 'components/pages/Login/VerifyModal'
import ActivateModal from 'components/pages/Login/ActivateModal'
import { trlb } from '../../../utilities/translator/translator'
import { useAppSelector } from 'store'
import { useNavigate } from 'react-router'

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .required(trlb('commons_email_required')),
  password: Yup.string().required(trlb('commons_password_required')),
})

const Login = () => {
  const isLoading = useAppSelector(state => state.global.loading.length)
  const navigate = useNavigate()
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [showActivateModal, setShowActivateModal] = useState(false)
  const [error, setError] = useState(false)
  const login = useLogin()
  const forgotPassword = useForgotPassword()
  const resendVerificationEmail = useResendVerificationEmail()

  // @ts-ignore
  const onSubmit = async (values: any) => {
    const res = await login(values)
    if (res.status !== 200) handleError(res.message)
    else navigate(routes.home)
  }

  const onForgotPasswordSubmit = async (values: { email: string }) =>
    forgotPassword({ email: values.email })

  const onResendVerificationEmail = async (values: any) =>
    resendVerificationEmail(values.email)

  const handleError = (err: string) => {
    if (err === 'error_userNotVerified') setShowVerifyModal(true)
    else if (err === 'error_userNotActive') setShowActivateModal(true)
    else setError(true)
  }

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit,
    validateOnMount: true,
  })

  React.useEffect(() => {
    setError(false)
  }, [form.values.email, form.values.password])

  if (isLoading) return null

  return (
    <AuthLayout>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <img src={logo} width={160} />
      </Box>

      <form onSubmit={form.handleSubmit}>
        <Box sx={{ mb: 4 }}>
          <TextField
            label={trlb('patientForm_Email')}
            variant="outlined"
            sx={{ width: '100%' }}
            error={!!form.errors.email && !!form.touched.email}
            helperText={form.errors.email}
            {...form.getFieldProps('email')}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <TextField
            type="password"
            label={trlb('password')}
            variant="outlined"
            sx={{ width: '100%' }}
            error={!!form.errors.password && !!form.touched.password}
            helperText={form.errors.password}
            {...form.getFieldProps('password')}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            align: 'items-center',
          }}
          mb={1}
        >
          <Button
            color="primary"
            variant="contained"
            sx={{ width: 120 }}
            type="submit"
            disabled={form.isSubmitting || !form.isValid || error}
          >
            {trlb('login')}
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            align: 'items-center',
          }}
          mb={1}
        >
          <Button
            onClick={() => onForgotPasswordSubmit(form.values)}
            variant="text"
            disabled={
              form.isSubmitting || !form.values.email || !!form.errors.email
            }
          >
            <Typography sx={{ fontSize: 14 }} align="center">
              {trlb('forgot_password')}
            </Typography>
          </Button>
        </Box>
      </form>
      <VerifyModal
        open={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
        onRetry={() => onResendVerificationEmail(form.values)}
      />
      <ActivateModal
        open={showActivateModal}
        onClose={() => setShowActivateModal(false)}
      />
    </AuthLayout>
  )
}

export default Login