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

  const [deleted, setDeleted] = useState(false)
  const { id } = useParams()

  const [fund, setFund] = useState({
    ticker_symbol: 'GME',
    company_name: 'GameStop Corp',
    price: 152.81
  })
  const [fundInfo, setFundInfo] = useState({
    amount_owned: 4,
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

    myPromise()
      .then(res => {
        console.log('res ', res.data.account)
        setAccount(res.data.account)
        setFundInfo(prev => ({ ...prev, account: res.data.account.id }))
        return res.data.account.id
      })
      .then(id => indexAccountSpecificFundInfo(user, id))
    const fetchData = async () => {
      try {
        const res = await showAccount(user, id)
        console.log('res ', res.data.account)
        setAccount(res.data.account)
        setFundInfo(prev => ({ ...prev, account: res.data.account.id }))
        const fundRes = await indexAccountSpecificFundInfo(user, res.data.account.id)
        console.log('fund info res ', fundRes.data.fund_infos)
        setFundInfoData([fundRes.data.fund_infos[0]])
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

  const handleSubmit = (event) => {
    event.preventDefault()
    const myPromise = new Promise((resolve, reject) => {
      resolve(createFund(user, fund, account.id))
      console.log('reject ', reject)
    })

    myPromise
      .then(res => {
        console.log('fund res ', res)
        // setCreatedId(res.data.fund.id)

        setFundInfo(prev => ({ ...prev, fund: res.data.fund.id, balance: (res.data.fund.price * prev.amount_owned) }))
        console.log('fund info ', fundInfo)
      })
      .then(() => createFundInfo(user, fundInfo))
      .then(res => console.log('fund info res ', res))

      .catch(error => console.error(error))
    // try {
    //   const res = await createFund(user, fund, account.id)
    //   console.log('fund res ', res.data.fund)
    //   setCreatedId(res.data.fund.id)
    //   setFundInfo(prev => ({ ...prev, fund: res.data.fund.id, balance: (res.data.fund.price * prev.amount_owned) }))

    //   msgAlert({
    //     heading: 'Fund Created',
    //     message: `Created ${fund.type} successfully.`,
    //     variant: 'success'
    //   })
    // } catch (error) {
    //   msgAlert({
    //     heading: 'Failed to create fund',
    //     message: error.message,
    //     variant: 'danger'
    //   })
    // }
    // setTimeout(() => {
    //   try {
    //     console.log('fund info ', fundInfo)
    //     const res = createFundInfo(user, fundInfo)
    //     console.log('fund info res ', res)

    //     msgAlert({
    //       heading: 'Fund Info Created',
    //       message: 'Created Fund Info successfully.',
    //       variant: 'success'
    //     })
    //   } catch (error) {
    //     msgAlert({
    //       heading: 'Failed to create fund',
    //       message: error.message,
    //       variant: 'danger'
    //     })
    //   }
    // }, 100)
    // console.log(createFundInfo, setCreatedId)
  }

  if (fundInfoData) {
    console.log('fund info data ', fundInfoData)
    mappedFunds = fundInfoData.map(fundInfo => {
      console.log('map fund ', fundInfo)
      return (
        <>
          <h3>Fund: {fundInfo.fund}</h3>
          <h4>Amount Owned: {fundInfo.amount_owned}</h4>
        </>
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
            <h3>Funds</h3>
            {fundInfoData && mappedFunds}

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
