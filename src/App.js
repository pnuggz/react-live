import React, { PropTypes } from 'react'  

const App = props => (  
  <div className="App">
    <div className="App-header">
      <h2>Welcome to Widget Reactory</h2>
    </div>
    <section className="App-body">
      {props.children}
    </section>
  </div>
)

App.propTypes = {  
  children: PropTypes.node,
}

export default App