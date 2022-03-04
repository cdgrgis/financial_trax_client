import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import AccountForm from './AccountForm'
import { showAccount, updateAccount } from '../../api/account'

const AccountEdit = ({ user, msgAlert }) => {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [balance, setBalance] = useState('')
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
        setName(res.data.account.name)
        setCompany(res.data.account.company)
        setBalance(res.data.account.balance)
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
      await updateAccount(user, id, name, company, balance)
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
          name={name}
          company={company}
          balance={balance}
          setName={setName}
          setCompany={setCompany}
          setBalance={setBalance}
        />
      </div>
    </div>
  )
}

export default AccountEdit
