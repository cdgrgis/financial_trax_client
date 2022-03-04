import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'

import { deleteAccount, showAccount } from '../../api/account'

const Account = ({ user, msgAlert }) => {
  const [account, setAccount] = useState({})
  const [deleted, setDeleted] = useState(false)
  const { id } = useParams()

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

            <Button variant='danger' onClick={handleDelete}>Delete Account</Button>
            <Link to={`/accounts/${id}/edit`}>
              <Button variant='primary' type='submit'>Update Account</Button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default Account
