import firebase from 'utility/firebase'
import history from 'utility/history'

export const login = async({ payload: { type, email, password, name } = {} } = {}) => {
  switch (type) {
    case 'google':
      return firebase.googleSignIn()
    case 'email':
      return firebase.emailSignIn({ email, password })
    case 'emailRegister':
      return firebase.emailSignUp({ email, password, name })
    default:
      throw new Error('Login type not found')
  }
}

export const autoLogin = async({ dispatch, actions } = {}) => {
  const user = await firebase.autoSignIn()

  if (user)
    await dispatch({ type: actions.REDUCE_EDIT_USER, payload: user })
}

export const logout = async({ dispatch, actions } = {}) => {
  await firebase.signOut()

  await dispatch({ type: actions.REDUCE_CREATE_USER, payload: {} })

  history.replace('/')
}
