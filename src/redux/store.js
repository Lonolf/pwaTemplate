import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  process.env.REACT_APP_ENV !== 'production'
    ? window?.__REDUX_DEVTOOLS_EXTENSION__?.()
    : props => props,
)

const disableDevTools = () => {
  for (const prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__)
    if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'function')
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = () => {}
    else
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = null
}

if (process.env.REACT_APP_ENV === 'production')
  disableDevTools()

export default store
