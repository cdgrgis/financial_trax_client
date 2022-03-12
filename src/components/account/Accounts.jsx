import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'
import { indexAccount } from '../../api/account'

const Accounts = ({ user, msgAlert }) => {
  if (!user) return <Navigate to ='/' />

  const [accounts, setAccounts] = useState([])
  const [navigateCreate, setNavigateCreate] = useState(false)

  let mappedAccounts

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await indexAccount(user)
        console.log('res ', res.data)
        setAccounts(res.data.accounts)
      } catch (error) {
        msgAlert({
          heading: 'Accounts List failed to load',
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

  console.log('account ', accounts)

  // If accounts is null, accounts is still loading
  if (!accounts) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  } else if (navigateCreate) {
    return <Navigate to='/accounts/create' />
  } else if (accounts.length === 0) {
    return (
      <>
        <h1>No accounts have been added</h1>
        <Button variant='success' onClick={handleNavigateCreate}>Create</Button>
      </>
    )
  } else {
    mappedAccounts = accounts.map(account => (
      <li key={account.id}>
        <Link to={`/accounts/${account.id}`}>{account.company} - {account.type} - {account.account_number}</Link>
      </li>
    ))
    return (
      <>
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <Button variant='success' onClick={handleNavigateCreate}>Create</Button>
            <h3>Accounts</h3>
            <p>Company - Account Type - Account Number</p>
            <ul>{mappedAccounts}</ul>
          </div>
        </div>
      </>

    )
  }
}

export default Accounts
