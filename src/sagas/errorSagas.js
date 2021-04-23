// import StackdriverErrorReporter from 'stackdriver-errors-js'

// export const errorHandler = new StackdriverErrorReporter()
// errorHandler.start({
//   key: '',
//   projectId: '',
// })

export const createError = ({ dispatch, actions, payload }) => {
  try {
    // errorHandler.report(error)

    console.error(payload)

    dispatch({ type: actions.REDUCE_CREATE_ERROR, payload })
  } catch (error) {
    console.error(error)
  }
}
