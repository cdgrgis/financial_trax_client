import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import AccountForm from './AccountForm'
import { showAccount, updateAccount } from '../../api/account'

const AccountEdit = ({ user, msgAlert }) => {
  const [type, setType] = useState('')
  const [company, setCompany] = useState('')
  const [balance, setBalance] = useState('')
  const [inception, setInception] = useState('')
  const [accountnumber, setAccountnumber] = useState('')
  const [updated, setUpdated] = useState(false)
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
        console.log('res ', res)
        setType(res.data.account.type)
        setCompany(res.data.account.company)
        setBalance(res.data.account.balance)
        setInception(res.data.account.inception)
        setAccountnumber(res.data.account.account_number)
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

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await updateAccount(user, id, type, company, balance, inception, accountnumber)
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
          type={type}
          company={company}
          balance={balance}
          inception={inception}
          accountnumber={accountnumber}
          setType={setType}
          setCompany={setCompany}
          setBalance={setBalance}
          setInception={setInception}
          setAccountnumber={setAccountnumber}
        />
      </div>
    </div>
  )
}

export default AccountEdit
