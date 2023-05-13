import { UserPermissions } from '@empty/lib.constants'
import { AUTH_ACTION } from 'store/actions'

export interface AuthState {
  isAuthenticated: boolean
  user: any
  permissions: UserPermissions
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
  permissions: {} as UserPermissions,
}

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case AUTH_ACTION.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.data.user,
        isAuthenticated: true,
      }
    case AUTH_ACTION.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.data,
      }
    case AUTH_ACTION.GET_CURRENT_USER_ERROR:
      return {
        ...state,
        error: action.error,
      }
    case AUTH_ACTION.LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
      }
    case AUTH_ACTION.GET_PERMISSIONS_SUCCESS:
      return {
        ...state,
        permissions: action.data,
      }
    default:
      return state
  }
}
