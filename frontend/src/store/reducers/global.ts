import { nanoid } from 'nanoid'
import { IToast } from '@empty/lib.constants'
import { GLOBAL_ACTION } from 'store/actions'

interface GlobalState {
  loading: string[]
  toasts: IToast[]
}

const initialState: GlobalState = {
  loading: ['onStart'],
  toasts: [],
}

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case GLOBAL_ACTION.START_LOADING:
      return {
        ...state,
        loading: [...state.loading, action.data],
      }
    case GLOBAL_ACTION.STOP_LOADING:
      return {
        ...state,
        loading: state.loading.filter((item: string) => item !== action.data),
      }
    case GLOBAL_ACTION.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, { ...action.data, id: nanoid() }],
      }
    case GLOBAL_ACTION.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((item: IToast) => item.id !== action.data.id),
      }
    default:
      return state
  }
}
