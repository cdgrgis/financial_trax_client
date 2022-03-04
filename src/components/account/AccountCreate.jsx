import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

// Import AccountForm:
import AccountForm from './AccountForm'
import { createAccount } from '../../api/account'

const AccountCreate = ({ user, msgAlert }) => {
  const [type, setType] = useState('')
  const [company, setCompany] = useState('')
  const [balance, setBalance] = useState(0)
  const [inception, setInception] = useState(null)
  const [accountNumber, setAccountNumber] = useState('')
  const [createdId, setCreatedId] = useState(null)

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const res = await createAccount(user, type, company, balance, inception, accountNumber)
      console.log('res ', res.data.account)
      setCreatedId(res.data.account.id)

      msgAlert({
        heading: 'Account Created',
        message: `Created ${type} successfully.`,
        variant: 'success'
      })
    } catch (error) {
      msgAlert({
        heading: 'Failed to create account',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  // if user is null, redirect to home page
  if (!user) {
    return <Navigate to='/' />
  } else if (createdId) {
    // if movie has been created,Navigate to the 'show' page
    return <Navigate to={`/accounts/${createdId}`} />
  }
  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Create Account</h3>
        <AccountForm
          handleSubmit={handleSubmit}
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

export default AccountCreate
