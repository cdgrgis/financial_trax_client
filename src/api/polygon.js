import axios from 'axios'

export const indexStockData = (tickerSymbol) => {
  return axios.get(`https://api.polygon.io/v1/open-close/${tickerSymbol}/2022-03-10?adjusted=true&apiKey=L7KxVlsGiPCOHCRjeTRtRRKZU4yDRQvq`, {
    headers: {
      Authorization: 'Bearer L7KxVlsGiPCOHCRjeTRtRRKZU4yDRQvq'
    }
  })
}
