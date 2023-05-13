import { createStore, compose } from 'redux'
import { rootReducer, useAppSelector } from './reducers/rootReducer'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const initialState = {}

const composedEnhancers = compose(composeEnhancers())

// TODO: delete if not needed
// export const setupStore = (initialState: any) =>
//   createStore(rootReducer, initialState, composedEnhancers)

// TODO: change to not deprecated
export default createStore(rootReducer, initialState, composedEnhancers)
export { useAppSelector }
