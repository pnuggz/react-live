import React, { Component } from 'react'

class JS extends Component {
  render() {
    const { lists, html } = this.props
    
    console.log(lists)
    console.log(html)

    return (
      lists.map(list => {html})
    )
  }
}

export default JS