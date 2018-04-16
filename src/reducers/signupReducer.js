const initialState = {  
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

export function signup(state = initialState, action) {
  switch (action.type) {
    case 'SIGNUP_REQUEST':
      return {
        requesting: true,
        successful: false,
        messages: { body: 'Signing up...', time: new Date() },
        errors: [],
      }

    case 'SIGNUP_SUCCESS':
    return {
      errors: [],
      messages: {
        body: action.payload,
        time: new Date(),
      },
      requesting: false,
      successful: true,
    }

    case 'SIGNUP_ERROR':
    return {
      errors: state.errors.concat([{
        body: action.payload.toString(),
        time: new Date(),
      }]),
      messages: [],
      requesting: false,
      successful: false,
    }

    default:
      return state
  }
}