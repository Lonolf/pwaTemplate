import React from 'react'
import firebase from 'utility/firebase'

export const useRecoverPassword = () => {
  const [passwordRequested, setPasswordRequested] = React.useState(false)

  const recoverPassword = async({ email }) => {
    await firebase.sendPasswordResetEmail({ email })
    setPasswordRequested(true)
    setTimeout(() => setPasswordRequested(false), 5000)
  }

  const resetRequest = () => setPasswordRequested(false)

  return ({ passwordRequested, recoverPassword, resetRequest })
}
