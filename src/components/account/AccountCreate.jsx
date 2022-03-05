import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

// Import AccountForm:
import AccountForm from './AccountForm'
import { createAccount } from '../../api/account'

const AccountCreate = ({ user, msgAlert }) => {
  const [account, setAccount] = useState({
    type: '',
    company: '',
    balance: 0,
    inception: '',
    account_number: ''
  })
  const [createdId, setCreatedId] = useState('')

  console.log('account data ', account)

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const res = await createAccount(user, account)
      console.log('res ', res.data.account)
      setCreatedId(res.data.account.id)

      msgAlert({
        heading: 'Account Created',
        message: `Created ${account.type} successfully.`,
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
          account={account}
          setAccount={setAccount}
        />
      </div>
    </div>
  )
}

export default AccountCreate
