import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'

import { deleteAccount, showAccount } from '../../api/account'

import FundForm from '../fund/FundForm'
import { createFund } from '../../api/fund'
import { createFundInfo } from '../../api/fund-info'

const Account = ({ user, msgAlert }) => {
  const [account, setAccount] = useState({})
  const [deleted, setDeleted] = useState(false)
  const { id } = useParams()

  const [fund, setFund] = useState({
    ticker_symbol: '',
    company_name: '',
    price: 0
  })
  const [fundInfo, setFundInfo] = useState({
    amount_owned: 0,
    balance: 0,
    account: 0,
    fund: ''
  })
  const [createdId, setCreatedId] = useState('')
  const [amountOwned, setAmountOwned] = useState(0)
  let mappedFunds

  if (!user) return <Navigate to='/' />

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await showAccount(user, id)
        console.log('res ', res.data)
        setAccount(res.data.account)
      } catch (error) {
        msgAlert({
          heading: 'Account failed to load',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])

  const handleDelete = async () => {
    try {
      await deleteAccount(user, id)
      setDeleted(true)
    } catch (error) {
      msgAlert({
        heading: 'Failed to delete account',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const res = await createFund(user, fund, account.id)
      console.log('fund res ', res.data.fund)
      setCreatedId(res.data.fund.id)

      msgAlert({
        heading: 'Fund Created',
        message: `Created ${fund.type} successfully.`,
        variant: 'success'
      })
    } catch (error) {
      msgAlert({
        heading: 'Failed to create fund',
        message: error.message,
        variant: 'danger'
      })
    }

    try {
      const res = await createFundInfo(user, fundInfo)
      console.log('fund info res ', res)

      msgAlert({
        heading: 'Fund Info Created',
        message: 'Created Fund Info successfully.',
        variant: 'success'
      })
    } catch (error) {
      msgAlert({
        heading: 'Failed to create fund',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  if (account.funds) {
    mappedFunds = account.funds.map(fund => (
      <li key={fund.id}>
        <Link to={`/funds/${fund.id}/`}>{fund.company_name} - {fund.ticker_symbol} - {fund.price}</Link>
      </li>
    ))
  }

  if (!account) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  } else if (deleted) {
    return <Navigate to='/accounts/' />
  } else if (createdId) {
    // return <Navigate to={`/funds/${createdId}`} />
  } else {
    return (
      <>
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <h1>Type: {account.type}</h1>
            <h3>Account Number: {account.account_number}</h3>
            <h3>Company: {account.company}</h3>
            <h3>Balance: {account.balance}</h3>
            <h3>Inception: {account.inception}</h3>
            <h3>Funds</h3><ul>
              {account.funds & mappedFunds}
            </ul>

            <Button variant='danger' onClick={handleDelete}>Delete Account</Button>
            <Link to={`/accounts/${id}/edit`}>
              <Button variant='primary' type='submit'>Update Account</Button>
            </Link>
          </div>

          <div>
            <FundForm
              handleSubmit={handleSubmit}
              fund={fund}
              setFund={setFund}
              amountOwned={amountOwned}
              setAmountOwned={setAmountOwned}
              fundInfo={fundInfo}
              setFundInfo={setFundInfo}
            />
          </div>
        </div>
      </>
    )
  }
}

export default Account
