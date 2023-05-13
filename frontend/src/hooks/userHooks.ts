import { UsersApi } from 'api'
import { useDispatch } from 'react-redux'
import { GLOBAL_ACTION, USER_ACTION } from 'store/actions'
import useCall from './useCall'
import {
  Capabilities,
  ICapabilityName,
  ICreateUserRequest,
  IGetUsersQuery,
  ISelectedRole,
  IUser,
  IUsers,
  RoleAssociation,
  ToastType,
  formatUser,
  getCapabilityUsers,
  permissionRequests,
} from '@empty/lib.constants'
import { useNavigate } from 'react-router'
import { routes } from 'routes/routes'
import { updateRolesAssociations } from 'api/roleAssociation.api'
import { useCheckPermission } from './userPermission'
import { useEffect } from 'react'
import { useAppSelector } from 'store'

export const useGetUserDetails = () => {
  const call = useCall()

  return (userId: string) =>
    call(async function getUserDetails() {
      return await UsersApi.getUserDetail(userId)
    })
}

export const useRequestResetUserPassword = () => {
  const call = useCall()
  const dispatch = useDispatch()

  return (userId: string) =>
    call(async function requestResetUserPassword() {
      await UsersApi.requestUserResetPassword(userId)
      dispatch({
        type: GLOBAL_ACTION.ADD_TOAST,
        data: {
          text: 'userDetails_requestResetPassword_success',
          type: ToastType.success,
        },
      })
    })
}

export const useUpdateUser = () => {
  const call = useCall()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const canActivateUser = useCheckPermission(permissionRequests.canActivateUser)

  interface IUpdateUser {
    userId: string
    values: Omit<ICreateUserRequest, 'roleAssociations'>
    oldRolesAssociations: RoleAssociation[]
    selectedRoles: ISelectedRole[]
  }

  return ({ userId, values, oldRolesAssociations, selectedRoles }: IUpdateUser) =>
    call(async function updateUser() {
      const newRolesAssociationsId = await updateRolesAssociations(oldRolesAssociations, selectedRoles)

      const data = {
        ...values,
        roleAssociations: newRolesAssociationsId.map(roleAssociation => roleAssociation.id),
        status: canActivateUser && values.status ? values.status : undefined,
      }

      const isNew = !userId

      if (isNew) await UsersApi.createUser(data)
      else await UsersApi.editUser(userId, data)

      navigate(routes.usersList)
      dispatch({
        type: GLOBAL_ACTION.ADD_TOAST,
        data: {
          text: isNew ? 'userDetails_createUser_success' : 'userDetails_editUser_success',
          type: ToastType.success,
        },
      })
    })
}

export const useGetUsers = () => {
  const call = useCall()
  const dispatch = useDispatch()

  return (params: IGetUsersQuery) => {
    call(async function getUsers() {
      const res = await UsersApi.getUsers(params)
      dispatch({
        type: USER_ACTION.GET_USERS_SUCCESS,
        data: res.reduce((obj: IUsers, user: IUser) => ({ ...obj, [user.id]: formatUser(user) }), {}),
      })
    })
  }
}

export const useGetDoctors = () => {
  const call = useCall()
  const canViewDoctors = useCheckPermission(permissionRequests.canViewDoctors)
  return () =>
    call(async () => {
      if (!canViewDoctors) return

      return await UsersApi.getDoctors()
    })
}

export const useGetAnesthesiologists = () => {
  const call = useCall()
  const dispatch = useDispatch()
  const canViewAnesthesiologists = useCheckPermission(permissionRequests.canViewAnesthesiologists)

  const getUsers = () =>
    call(async () => {
      if (!canViewAnesthesiologists) return
      const users = await UsersApi.getAnesthesiologists()
      dispatch({
        type: USER_ACTION.GET_USERS_SUCCESS,
        data: users.reduce((obj: IUsers, user: IUser) => ({ ...obj, [user.id]: user }), {}),
      })
    })

  useEffect(() => {
    getUsers()
  }, [canViewAnesthesiologists])
}
export const useImportDoctorstIntoState = () => {
  const getDoctors = useGetDoctors()
  const dispatch = useDispatch()
  const canViewDoctors = useCheckPermission(permissionRequests.canViewDoctors)
  const canViewUsers = useCheckPermission(permissionRequests.canViewUsers)
  useEffect(() => {
    const getData = async () => {
      const doctors = await getDoctors()
      dispatch({
        type: USER_ACTION.GET_USERS_SUCCESS,
        data: doctors.reduce((obj: IUsers, user: IUser) => ({ ...obj, [user.id]: user }), {}),
      })
    }
    if (canViewDoctors || canViewUsers) getData()
  }, [canViewDoctors])
}

export const useLoggedUserIsDoctor = () => {
  const loggedUserCapabilities = useAppSelector(state => state.auth.permissions)
  return loggedUserCapabilities?.[Capabilities.U_IS_DOCTOR] != null
}

export const useLoggedUserIsAnesthesiologist = () => {
  const loggedUserCapabilities = useAppSelector(state => state.auth.permissions)
  return loggedUserCapabilities?.[Capabilities.U_IS_ANESTHESIOLOGIST] != null
}

export const useGetCapabilityUsers = () => {
  const loggedUserPermissions = useAppSelector(state => state.auth.permissions)
  return (capability: ICapabilityName) => getCapabilityUsers(capability, loggedUserPermissions)
}
