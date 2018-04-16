import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'

import { setClient, unsetClient } from '../actions/client'
import { loginAPI } from './apiCalls';

export function* logout() {
  // dispatches the CLIENT_UNSET action
  yield put(unsetClient())

  // remove our token
  localStorage.removeItem('userInfo')

  // redirect to the /login screen
  history.push('/login')
}

export function* loginRequest(action) {
  var username = action.username
  var password = action.password
  let token

  try {
    const login = yield call(loginAPI, username, password)

    yield put({ type: 'LOGIN_SUCCESS' })

    let token = login.token
    let userData = login.data
    let userInfo = {
      token: token,
      data: userData
    }

    console.log(userInfo)
    console.log(token)
    console.log(userData)

    yield put(setClient(token))

    console.log('setting local storage')

    localStorage.setItem('userInfo', JSON.stringify(userInfo))

    console.log('all set')

    history.push('/')
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR', payload: error.message })
  } finally {
    if (yield cancelled()) {
      history.push('/login')
    }
  }

  return token
  
}
