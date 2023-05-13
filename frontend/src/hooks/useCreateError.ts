import { useDispatch } from 'react-redux'
import { GLOBAL_ACTION } from 'store/actions'
import { getErrorMessage } from '@empty/lib.constants'

const useCreateError = (): Function => {
  const dispatch = useDispatch()
  return (error: Error): void => {
    try {
      console.error(error)
      const text = getErrorMessage(error)
      console.log('text', text)

      dispatch({ type: GLOBAL_ACTION.ADD_TOAST, data: { text, type: 'error' } })
    } catch (error) {
      console.error(error)
    }
  }
}

export default useCreateError
