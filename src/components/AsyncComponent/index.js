import React, { Component } from 'react'

const asyncComponent = (importComponent) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        component: null
      }
    }
    componentDidMount() {
      const { history, route } = this.props
      const token = sessionStorage.getItem('token')
      if (route.requiredAuth && !token) {
        history.replace('/login')
        return
      }
      importComponent().then(cmp => {
        this.setState({
          component: cmp.default.WrappedComponent || cmp.default
        })
      })
    }

    render() {
      const C = this.state.component
      return C ? <C {...this.props} /> : null
    }
  }
}

export default asyncComponent