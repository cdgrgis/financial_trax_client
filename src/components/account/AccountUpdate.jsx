import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import AccountForm from './AccountForm'
import { showAccount, updateAccount } from '../../api/account'

const AccountEdit = ({ user, msgAlert }) => {
  const [account, setAccount] = useState({})
  const [type, setType] = useState('')
  const [company, setCompany] = useState('')
  const [balance, setBalance] = useState('')
  const [updated, setUpdated] = useState(false)
  const [inception, setInception] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const { id } = useParams()

  // if user is null, redirect to home page
  // Note: Must check before useEffect, since it needs user
  if (!user) {
    return <Navigate to='/' />
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await showAccount(user, id)
        setAccount(res.data.account)
      } catch (error) {
        msgAlert({
          heading: 'Failed to load account',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])
  console.log(account)
  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await updateAccount(user, id, type, company, balance, inception, accountNumber)
      setUpdated(true)
    } catch (error) {
      msgAlert({
        heading: 'Failed to update account',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  if (updated) {
    // Navigate to the 'show' page
    return <Navigate to={`/accounts/${id}`} />
  }

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Edit Account</h3>
        <AccountForm
          handleSubmit={handleSubmit}
          accountData={account}
          setAccountData={setAccount}
          type={type}
          company={company}
          balance={balance}
          inception={inception}
          accountNumber={accountNumber}
          setType={setType}
          setCompany={setCompany}
          setBalance={setBalance}
          setInception={setInception}
          setAccountNumber={setAccountNumber}
        />
      </div>
    </div>
  )
}

export default AccountEdit
