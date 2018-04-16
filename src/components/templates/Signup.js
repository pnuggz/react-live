/* eslint-disable react/prop-types */
import React, { Component } from 'react'  
import { reduxForm, Field, formValueSelector} from 'redux-form'  
import { connect } from 'react-redux'  
import { Link } from 'react-router'
import PropTypes from 'prop-types'

import JS from './js'

// Import the helpers.. that we'll make here in the next step
// import Messages from '../../containers/notifications/SignupSuccess'  
// import Errors from '../../containers/notifications/SignupErrors'

import signupRequest  from '../../actions/signup'

class Signup extends Component {
  // Redux Form will call this function with the values of our
  // Form fields "email" and "password" when the form is submitted
  // this will in turn call the action
  submit = (values) => {
    // we could just do signupRequest here with the static proptypes
    // but ESLint doesn't like that very much...
    this.props.signupRequest(values)
  }

  render () {
    // grab what we need from props.  The handleSubmit from ReduxForm
    // and the pieces of state from the global state.
    const {
      handleSubmit,
      signup: {
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props

    console.log()

    return (
      <div className="container-fluid main-container ng-scope" id="signup">
        <div className="signup">
          <div className="signup-header box-center">
            <img src="/assets/logo.png" className="img-responsive"></img>
          </div>
          <div className="box-form">
            <img src="/assets/head_signup.png" className="img-responsive image-head-signup"></img>
            {/* Use the Submit handler with our own submit handler*/}
            <form id="Signup" onSubmit={handleSubmit(this.submit)}>
              <div className="signup-form">
                <div className="form-group">
                  <label htmlFor="first_name"><h3>First Name</h3></label>
                  <Field
                    name="first_name"
                    type="text"
                    className="block input username"
                    placeholder="First name"
                    component="input"
                  />
                  <label htmlFor="last_name"><h3>Last Name</h3></label>          
                  <Field
                    name="last_name"
                    type="text"
                    className="block input username"
                    placeholder="Last Name"
                    component="input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username"><h3>Username</h3></label>         
                  <Field
                    name="username"
                    type="text"
                    className="block input username"
                    placeholder="Username"
                    component="input"
                  />
                  <label htmlFor="email"><h3>Email</h3></label>         
                  <Field
                    name="email"
                    type="text"
                    className="block input username"
                    placeholder="Email"
                    component="input"
                  />
                  <label htmlFor="password"><h3>Password</h3></label>
                </div>
                <div className="form-group">
                  <Field
                    name="password"
                    type="password"
                    className="block input username"
                    placeholder="Password"
                    component="input"
                  />
                  <label htmlFor="password2"><h3>Password Confirmation</h3></label>
                  <Field
                    name="password2"
                    type="password"
                    className="block input username"
                    placeholder="Password"
                    component="input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address"><h3>Address</h3></label>
                  <Field
                    name="address"
                    type="text"
                    className="block input username"
                    placeholder="Address"
                    component="input"
                  />
                  <label htmlFor="zipcode"><h3>Zipcode</h3></label>
                  <Field
                    name="zipcode"
                    type="text"
                    className="block input username"
                    placeholder="Zipcode"
                    component="input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobilephone"><h3>Phone Number</h3></label>
                  <Field
                    name="mobilephone"
                    type="text"
                    className="block input username"
                    placeholder="Phone Number"
                    component="input"
                  />
                  <label htmlFor="birthday"><h3>Birthday</h3></label>
                  <Field
                    name="birthday"
                    type="date"
                    className="birthday"
                    placeholder="block input username"
                    component="input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender"><h3>Gender</h3></label>
                    <label htmlFor="gender">Male
                      <Field
                        name="gender"
                        type="radio"
                        className="gender"
                        value="0"
                        component="input"
                      />
                    </label>
                    <label htmlFor="gender">Female
                      <Field
                        name="gender"
                        type="radio"
                        className="gender"
                        value="1"
                        component="input"
                      />
                    </label>
                  <label htmlFor="subscribe"><h3>Subscription</h3></label>
                  <label htmlFor="subscribe">Yes
                      <Field
                        name="subscribe"
                        type="radio"
                        className="subscribe"
                        value="0"
                        component="input"
                      />
                    </label>
                    <label htmlFor="subscribe">No
                      <Field
                        name="subscribe"
                        type="radio"
                        className="subscribe"
                        value="1"
                        component="input"
                      />
                    </label>
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
Signup.propTypes = {
  handleSubmit: PropTypes.func,
  signupRequest: PropTypes.func,
  signup: PropTypes.shape({
    requesting: PropTypes.bool,
    successful: PropTypes.bool,
    messages: PropTypes.array,
    errors: PropTypes.array,
  }),
}

// Grab only the piece of state we need
const mapStateToProps = (state) => ({  
  signup: state.signup,
})

// Connect our component to redux and attach the "signup" piece
// of state to our "props" in the component.  Also attach the
// "signupRequest" action to our "props" as well.
const connected = connect(mapStateToProps, { signupRequest })(Signup)

// Connect our connected component to Redux Form.  It will namespace
// the form we use in this component as "signup".
const formed = reduxForm({  
  form: 'Signup',
})(connected) 

// // Export our well formed component!
export default formed  