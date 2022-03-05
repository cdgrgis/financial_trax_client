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

export const createAccount = (user, type, company, balance, inception, accountnumber) => {
  console.log('user ', user.token)
  return axios.post(apiUrl + '/accounts/',
    {
      account: { type, company, balance, inception, account_number: accountnumber }
    },
    {
      headers: {
        Authorization: `Token ${user.token}`
      }
    })
}

export const updateAccount = (user, id, type, company, balance, inception, accountnumber) => {
  return axios.patch(apiUrl + `/accounts/${id}/`,
    {
      account: { type, company, balance, inception, account_number: accountnumber }
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
