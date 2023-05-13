import auth from './auth'
import global from './global'
import { combineReducers } from 'redux'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const rootReducer = combineReducers({
  auth,
  global,
})

export type RootState = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
