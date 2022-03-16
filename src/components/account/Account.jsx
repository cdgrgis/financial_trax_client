import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'

import { deleteAccount, showAccount } from '../../api/account'

import FundForm from '../fund/FundForm'
import { createFund } from '../../api/fund'
import { createFundInfo, indexAccountSpecificFundInfo } from '../../api/fund-info'

const Account = ({ user, msgAlert }) => {
  const [account, setAccount] = useState({})
  const [fundInfoData, setFundInfoData] = useState([])
  const [balance, setBalance] = useState(0)

  const [deleted, setDeleted] = useState(false)
  const [fundCreatedId, setFundCreatedId] = useState('')
  const { id } = useParams()

  const [fund, setFund] = useState({
    ticker_symbol: '',
    company_name: '',
    price: ''
  })
  const [fundInfo, setFundInfo] = useState({
    amount_owned: '',
    balance: 0,
    account: 0,
    fund: 0
  })
  // const [createdId, setCreatedId] = useState('')
  const [amountOwned, setAmountOwned] = useState(0)
  let mappedFunds

  if (!user) return <Navigate to='/' />

  useEffect(() => {
    const myPromise = new Promise((resolve, reject) => {
      resolve(showAccount(user, id))
      console.log(reject)
    })

    myPromise
      .then(res => {
        setAccount(res.data.account)
        setFundInfo(prev => ({ ...prev, account: res.data.account.id }))
        return res.data.account.id
      })
      .then(id => indexAccountSpecificFundInfo(user, id))
      .then(fundRes => {
        setBalance(fundRes.data.balance.balance__sum)
        setFundInfoData(fundRes.data.fund_infos)
      })
      .catch(err => {
        msgAlert({
          heading: 'Fund Info Update Failed',
          message: err.message,
          variant: 'danger'
        })
      })
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

  const handleSubmit = (event) => {
    event.preventDefault()
    const myPromise = new Promise((resolve, reject) => {
      try {
        resolve(createFund(user, fund, account.id))
      } catch (err) {
        reject(err)
      }
    })

    myPromise
      .then(res => {
        const newFundInfo = { ...fundInfo, fund: res.data.fund.id, balance: (res.data.fund.price * fundInfo.amount_owned) }
        setFundInfo(prev => newFundInfo)
        return newFundInfo
      })
      .then((fundInfo) => createFundInfo(user, fundInfo)) // PROBLEM
      .then(res => {
        setFundCreatedId(res.data.fund_info.id)
        msgAlert({
          heading: 'Fund Created',
          message: `Created ${fundInfo.fund.company_name} successfully.`,
          variant: 'success'
        })
      })

      .catch(error => console.error(error))
  }

  if (fundInfoData) {
    mappedFunds = fundInfoData.map(fundInfo => {
      return (
        <li key={fundInfo.id}>
          <Link to={`/fund-infos/${fundInfo.id}`}>
            {fundInfo.fund.company_name} - {fundInfo.fund.ticker_symbol} - Price: {fundInfo.fund.price} - Owned: {fundInfo.amount_owned} - Balance: {fundInfo.balance}
          </Link>
        </li>
      )
    })
  }
  if (!account) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  } else if (deleted) {
    return <Navigate to='/accounts/' />
  } else if (fundCreatedId) {
    return <Navigate to={`/fund-infos/${fundCreatedId}`} />
  } else {
    return (
      <>
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <Button variant='danger' onClick={handleDelete}>Delete Account</Button>
            <Link to={`/accounts/${id}/edit`}>
              <Button variant='primary' type='submit'>Update Account</Button>
            </Link>
            <h1>{account.company} {account.type}</h1>

            <h3>Account Number: {account.account_number}</h3>

            {balance && (<h3>Balance: {balance}</h3>)}
            <h3>Inception: {account.inception}</h3>
            <br></br>
            {fundInfoData !== [] && (
              <>
                <h3>Funds</h3>
                <ul>
                  {mappedFunds}
                </ul>
              </>
            )}
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
