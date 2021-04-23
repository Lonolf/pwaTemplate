import { useDispatch } from 'react-redux'
import * as actions from 'redux/actions'
import { useHistory } from 'react-router'

export const useParseUrl = () => {
  const dispatch = useDispatch()

  return async({ user = {} } = {}) => {
    dispatch({ type: actions.STOP_LOADING, payload: 'autoLogin' })
  }
}

export const useNavigate = () => {
  const history = useHistory()

  return (url) => {
    if (typeof url === 'string')
      history.replace(url)
  }
}

export const useGoBack = () => {
  const history = useHistory()

  return () => { history.goBack() }
}

export const useResetApp = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  return () => {
    dispatch({ type: actions.RESET, payload: {} })
    history.replace('/')
  }
}
