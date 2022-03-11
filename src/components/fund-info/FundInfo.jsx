import React, { useState, useEffect } from 'react'
import { Navigate, useParams, useHistory } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'

import { deleteFundInfo, showFundInfo } from '../../api/fund-info'

const Fund = ({ user, msgAlert }) => {
  const [fundInfo, setFundInfo] = useState()
  const [deleted, setDeleted] = useState(false)
  const { id } = useParams()

  if (!user) return <Navigate to='/' />

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await showFundInfo(user, id)
        console.log('res ', res.data.fund_info)
        setFundInfo(res.data.fund_info)
      } catch (error) {
        msgAlert({
          heading: 'Fund failed to load',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
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
    return <Navigate to={`accounts/${fundInfo.account.id}`} />
  } else {
    console.log('fundInfo ', fundInfo)
    const history = useHistory()
    const goToPreviousPath = () => {
      history.goBack()
    }
    return (
      <>
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <h1>Ticker: {fundInfo.fund.ticker_symbol}</h1>
            <h3>Name: {fundInfo.fund.company_name}</h3>
            <h3>Price: {fundInfo.fund.price}</h3>
            <h3>Amount Owned: {fundInfo.amount_owned}</h3>
            <h3>Balance: {fundInfo.balance}</h3>

            <Button variant='danger' onClick={goToPreviousPath}>Delete Fund</Button>
          </div>
        </div>
      </>
    )
  }
}

export default Fund
