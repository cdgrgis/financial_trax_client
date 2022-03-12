import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'

import { updateFund } from '../../api/fund'
import { deleteFundInfo, showFundInfo } from '../../api/fund-info'
import { indexStockData } from '../../api/polygon'

const FundInfo = ({ user, msgAlert }) => {
  const [fundInfo, setFundInfo] = useState()
  const [deleted, setDeleted] = useState(false)
  const [stockData, setStockData] = useState({})
  const { id } = useParams()
  // const navigate = useNavigate()

  if (!user) return <Navigate to='/' />

  useEffect(() => {
    const myPromise = new Promise((resolve, reject) => {
      resolve(showFundInfo(user, id))
      console.log(reject)
    })

    myPromise
      .then(res => {
        console.log('res ', res.data.fund_info)
        setFundInfo(res.data.fund_info)
        return res.data.fund_info.fund.ticker_symbol
      })
      .then((tickerSymbol) => indexStockData(tickerSymbol))
      .then(res => {
        console.log('stock data', res)
        setStockData(res.data)
        return res.data.close
      })
      .then(async close => {
        await updateFund(user, fundInfo.fund.id, { price: close })
      })
      .then()
      .catch(error => {
        console.log(error)
        msgAlert({
          heading: 'Fund Info failed to load',
          message: error.message,
          variant: 'danger'
        })
      })
    // const fetchData = async () => {
    //   try {
    //     const res = await showFundInfo(user, id)
    //     console.log('res ', res.data.fund_info)
    //     setFundInfo(res.data.fund_info)
    //     const stockRes = await indexStockData()
    //     console.log('stockres', stockRes)
    //   } catch (error) {
    //     msgAlert({
    //       heading: 'Fund failed to load',
    //       message: error.message,
    //       variant: 'danger'
    //     })
    //   }
    // }
    // fetchData()
  }, [])

  const handleDelete = async () => {
    try {
      await deleteFundInfo(user, id)
      setDeleted(true)
    } catch (error) {
      msgAlert({
        heading: 'Failed to delete fund',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  if (!fundInfo) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  } else if (deleted) {
    return <Navigate to={`/accounts/${fundInfo.account.id}/`} />
  } else {
    console.log('fundInfo ', fundInfo)

    return (
      <>
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <h1>Ticker: {fundInfo.fund.ticker_symbol}</h1>
            <h3>Name: {fundInfo.fund.company_name}</h3>
            <h3>Price: {fundInfo.fund.price}</h3>
            <h3>Amount Owned: {fundInfo.amount_owned}</h3>
            <h3>Balance: {fundInfo.balance}</h3>

            <Button variant='danger' onClick={handleDelete}>Delete Fund</Button>

            <br />
            <h1>RealTime</h1>
            <br />
            <h3>open:{stockData.open}</h3>
            <h3>high:{stockData.high}</h3>
            <h3>low:{stockData.low}</h3>
            <h3>close:{stockData.close}</h3>
          </div>
        </div>
      </>
    )
  }
}

export default FundInfo
