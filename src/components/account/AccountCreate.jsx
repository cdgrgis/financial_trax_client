import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

// Import AccountForm:
import AccountForm from './AccountForm'
import { createAccount } from '../../api/account'

const AccountCreate = ({ user, msgAlert }) => {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [balance, setBalance] = useState(0)
  const [createdId, setCreatedId] = useState(null)
  console.log('name ', name)
  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const res = await createAccount(user, name, company, balance)
      console.log('res ', res.data.account)
      setCreatedId(res.data.account.id)

      msgAlert({
        heading: 'Account Created',
        message: `Created ${name} successfully.`,
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

export default AccountCreate
