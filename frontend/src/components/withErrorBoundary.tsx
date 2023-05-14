import React, { Component, FC } from 'react'
import ComponentError from './ComponentError'

const withErrorBoundary = (WrappedComponent: FC<any>) =>
  class extends Component<any, { error: Error | null }> {
    constructor(props: any) {
      super(props)
      this.state = { error: null }
    }

    static getDerivedStateFromError(error: Error) {
      return { error }
    }

    componentDidCatch(error: Error) {
      console.error(error)
      // this.props.dispatch({ type: actions.ADD_ERROR, error })
    }

    render() {
      if (this.state.error) return <ComponentError {...{ error: this.state.error }} />

      return <WrappedComponent {...this.props} />
    }
  }

export default withErrorBoundary
