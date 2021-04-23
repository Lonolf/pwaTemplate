import React, { Component } from 'react'
import ComponentError from './ComponentError'

const withErrorBoundary = WrappedComponent => (
  class extends Component {
    constructor(props) {
      super(props)
      this.state = { error: null, info: null }
    }

    componentDidCatch(error, info) {
      this.setState({ error, info })
    }

    render() {
      if (this.state.error)
        return (
          <ComponentError props={{ passedDownError: this.state.error, info: this.state.info }} />
        )

      // Normally, just render children
      return <WrappedComponent {...this.props} />
    }
  }
)

export default withErrorBoundary
