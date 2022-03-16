import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexAccount = (user) => {
  return axios.get(apiUrl + '/accounts/', {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const showAccount = (user, id) => {
  return axios.get(apiUrl + `/accounts/${id}/`, {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const createAccount = (user, account) => {
  return axios.post(apiUrl + '/accounts/',
    { account },
    {
      headers: {
        Authorization: `Token ${user.token}`
      }
    })
}

export const updateAccount = (user, id, account) => {
  return axios.patch(apiUrl + `/accounts/${id}/`,
    { account },
    {
      headers: {
        Authorization: `Token ${user.token}`
      }
    })
}

export const deleteAccount = (user, id) => {
  return axios.delete(apiUrl + `/accounts/${id}/`, {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
