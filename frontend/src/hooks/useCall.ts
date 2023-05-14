// TODO bubba remove this after understanding it
import { useDispatch } from 'react-redux'
import { GLOBAL_ACTION } from 'store/actions'
import useCreateError from './useCreateError'

const verbose = false

export const useCall = () => {
  const dispatch = useDispatch()
  const createError = useCreateError()

  const call = async (callable: any) => {
    let data = null
    const functionId = `${callable?.name || 'No name given'} - ${Math.random().toString(36).substring(7)}`
    dispatch({ type: GLOBAL_ACTION.START_LOADING, data: functionId })

    if (!import.meta.env.PROD) {
      console.log(`Calling "${functionId}"`)
      // Enable this to see the stack trace of the caller
      if (verbose) {
        console.debug(callable)
        console.trace()
      }
    }

    try {
      if (typeof callable === 'function') data = await callable()
      else throw new Error(`${callable?.name ?? String(callable)} is not a function`)
    } catch (error) {
      createError(error)
      data = { error }
    }
    dispatch({ type: GLOBAL_ACTION.STOP_LOADING, data: functionId })
    return data
  }

  return call
}

export default useCall
