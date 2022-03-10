import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexFundInfo = (user) => {
  return axios.get(apiUrl + '/fund-infos/', {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const showFundInfo = (user, id) => {
  return axios.get(apiUrl + `/fund-infos/${id}/`, {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const createFundInfo = (user, fundInfo) => {
  return axios.post(apiUrl + '/fund-infos/',
    { fund_info: fundInfo },
    {
      headers: {
        Authorization: `Token ${user.token}`
      }
    })
}

export const updateFundInfo = (user, id, fundInfo) => {
  return axios.patch(apiUrl + `/fund-infos/${id}/`,
    { fund_info: fundInfo },
    {
      headers: {
        Authorization: `Token ${user.token}`
      }
    })
}

export const deleteFundInfo = (user, id) => {
  return axios.delete(apiUrl + `/fund-infos/${id}/`, {
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
