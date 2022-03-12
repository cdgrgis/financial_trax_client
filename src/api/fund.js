import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexFund = (user) => {
  return axios.get(apiUrl + '/funds/', {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const showFund = (user, id) => {
  return axios.get(apiUrl + `/funds/${id}/`, {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const createFund = (user, fund, id) => {
  console.log('user ', user.token)
  return axios.post(apiUrl + '/funds/',
    { fund, account: id },
    {
      headers: {
        Authorization: `Token ${user.token}`
      }
    })
}

export const updateFund = (user, id, fund) => {
  console.log('api fund ', fund)
  return axios.patch(apiUrl + `/funds/${id}/`,
    { fund },
    {
      headers: {
        Authorization: `Token ${user.token}`
      }
    })
}

export const deleteFund = (user, id) => {
  return axios.delete(apiUrl + `/funds/${id}/`, {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
