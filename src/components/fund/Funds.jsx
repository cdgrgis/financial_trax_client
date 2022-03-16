import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'
import { indexFund } from '../../api/fund'

const Funds = ({ user, msgAlert }) => {
  if (!user) return <Navigate to ='/' />

  const [funds, setFunds] = useState([])
  const [navigateCreate, setNavigateCreate] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await indexFund(user)
        setFunds(res.data.funds)
      } catch (error) {
        msgAlert({
          heading: 'Funds List failed to load',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])

  const handleNavigateCreate = () => {
    setNavigateCreate(true)
  }

  let mappedFunds
  // If funds is null, funds is still loading
  if (!funds) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  } else if (funds.length === 0) {
    return <h1>No funds have been added</h1>
  } else if (navigateCreate) {
    return <Navigate to='/funds/create' />
  } else {
    mappedFunds = funds.map(fund => (
      <li key={fund.id}>
        <Link to={`/funds/${fund.id}`}>{fund.company_name} - {fund.ticker_symbol} - {fund.price}</Link>
      </li>
    ))
    return (
      <>
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <Button variant='success' onClick={handleNavigateCreate}>Create</Button>
            <h3>Funds</h3>
            <p>Company - Ticker - Price</p>
            <ul>{mappedFunds}</ul>
          </div>
        </div>
      </>
    )
  }
}

export default Funds
