/* eslint-disable react/prop-types */
import React, { Component } from 'react'  
import { reduxForm, Field, formValueSelector} from 'redux-form'  
import { connect } from 'react-redux'  
import { Link } from 'react-router'
import PropTypes from 'prop-types'

// Import the helpers.. that we'll make here in the next step
// import Messages from '../../containers/notifications/SignupSuccess'  
// import Errors from '../../containers/notifications/SignupErrors'

import loginRequest  from '../../actions/login'

class Login extends Component {
  // Redux Form will call this function with the values of our
  // Form fields "email" and "password" when the form is submitted
  // this will in turn call the action
  submit = (values) => {
    // we could just do signupRequest here with the static proptypes
    // but ESLint doesn't like that very much...
    this.props.loginRequest(values)
  }

  render () {
    // grab what we need from props.  The handleSubmit from ReduxForm
    // and the pieces of state from the global state.
    const {
      handleSubmit,
      login: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props

    return (
      <div className="container-fluid main-container ng-scope" id="signup">
        <div className="signup">
          <div className="signup-header box-center">
            <img src="/assets/logo.png" className="img-responsive"></img>
          </div>
          <div className="box-form">
            <img src="/assets/head_signup.png" className="img-responsive image-head-signup"></img>
            {/* Use the Submit handler with our own submit handler*/}
            <form id="Login" onSubmit={handleSubmit(this.submit)}>
              <div className="signup-form">
                <div className="form-group">
                  <label htmlFor="username"><h3>Username</h3></label>         
                  <Field
                    name="username"
                    type="text"
                    className="block input username"
                    placeholder="Username"
                    component="input"
                  />
                  <label htmlFor="password"><h3>Password</h3></label>         
                  <Field
                    name="password"
                    type="password"
                    className="block input username"
                    placeholder="Password"
                    component="input"
                  />
                </div>
                <button action="submit">SIGNUP</button>
              </div>
            </form>
          </div>
          <div className="auth-messages">
            {
              /* 
              These are all nothing more than helpers that will show up
              based on the UI states, not worth covering in depth.  Simply put
              if there are messages or errors, we show them
              */
            }
            {console.log(messages.body)}
            {!requesting && !!errors.length && (
              <div>None</div>
            )}
            {!requesting && !!messages.length && (
              <div>None</div>
            )}
            {!requesting && messages.success && (
              <div>
                Signup Successful! Click here to Login »
              </div>
            )}
            {/* Redux Router's <Link> component for quick navigation of routes */}
            {!requesting && !successful && (
              <div>Already a Widgeter? Login Here »</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

// Pass the correct proptypes in for validation
Login.propTypes = {
  handleSubmit: PropTypes.func,
  loginRequest: PropTypes.func,
  login: PropTypes.shape({
    requesting: PropTypes.bool,
    successful: PropTypes.bool,
    messages: PropTypes.array,
    errors: PropTypes.array,
  }),
}

// Grab only the piece of state we need
const mapStateToProps = (state) => ({  
  login: state.login,
})

// Connect our component to redux and attach the "signup" piece
// of state to our "props" in the component.  Also attach the
// "signupRequest" action to our "props" as well.
const connected = connect(mapStateToProps, { loginRequest })(Login)

// Connect our connected component to Redux Form.  It will namespace
// the form we use in this component as "signup".
const formed = reduxForm({  
  form: 'Login',
})(connected) 

// // Export our well formed component!
export default formed  