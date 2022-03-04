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

export const createAccount = (user, name, company, balance) => {
  console.log('user ', user.token)
  return axios.post(apiUrl + '/accounts/',
    {
      account: { name, company, balance }
    },
    {
      headers: {
        Authorization: `Token ${user.token}`
      }
    })
}

export const updateAccount = (user, id, name, company, balance) => {
  return axios.patch(apiUrl + `/accounts/${id}/`,
    {
      account: { name, company, balance }
    },
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
