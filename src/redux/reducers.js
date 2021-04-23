import { combineReducers } from 'redux'

import produce from 'immer'

import * as actions from './actions'
import * as initialState from './initialState'

import uniqid from 'uniqid'

const error = produce((draft, { type, payload: { errorId, message } = {} }) => {
  switch (type) {
    case actions.REDUCE_CREATE_ERROR:
      const newErrorId = errorId ?? uniqid()
      return { ...draft, [newErrorId]: { message, errorId: newErrorId } }
    case actions.REDUCE_DELETE_ERROR:
      if (draft[errorId] != null)
        delete draft[errorId]
      return draft
    default:
      return draft
  }
}, {})

const loading = produce((draft, { type, payload }) => {
  switch (type) {
    case actions.START_LOADING:
      return ([...draft, payload])
    case actions.STOP_LOADING:
      return draft.filter(value => value !== payload)
  }
}, initialState.loading)

const user = produce((draft, { type, payload }) => {
  switch (type) {
    case actions.REDUCE_CREATE_USER:
      return payload
    case actions.REDUCE_EDIT_USER:
      return ({ ...draft, ...payload })
  }
}, initialState.user)

const rootReducer = combineReducers({
  error,
  loading,
  user,
})

export default rootReducer
