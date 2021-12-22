import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = (email, password, passwordConfirmation) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/sign-up/',
    data: {
      credentials: {
        email,
        password,
        password_confirmation: passwordConfirmation
      }
    }
  })
}

export const signIn = (email, password) => {
  return axios({
    url: apiUrl + '/sign-in/',
    method: 'POST',
    data: {
      credentials: {
        email,
        password
      }
    }
  })
}

export const signOut = (user) => {
  return axios({
    url: apiUrl + '/sign-out/',
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const changePassword = (oldPassword, newPassword, user) => {
  return axios({
    url: apiUrl + '/change-password/',
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      passwords: {
        old: oldPassword,
        new: newPassword
      }
    }
  })
}
