import * as actions from 'redux/actions'
import { createError } from 'sagas/errorSagas'
import { useDispatch, useSelector } from 'react-redux'

const useCall = ({ selector = state => state } = {}) => {
  const dispatch = useDispatch()
  const state = useSelector(selector)

  const call = async(callable, payload = {}) => {
    let error = null
    let data = null
    dispatch({ type: actions.START_LOADING, payload: callable?.name ?? 'undefined' })
    if (process.env.REACT_APP_ENV !== 'production')
      console.log(callable?.name ?? 'undefined', payload)
    try {
      if (typeof callable === 'function')
        data = await callable({ dispatch, actions, state, call, payload })
      else
        throw new Error(`${callable?.name ?? String(callable)} is not a function`)
    } catch (err) {
      call(createError, err)
      error = err
    }
    dispatch({ type: actions.STOP_LOADING, payload: callable?.name ?? 'undefined' })
    return ({ data, error })
  }

  return call
}

export default useCall
