import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Spinner, Button } from 'react-bootstrap'

import { deleteFund, showFund } from '../../api/fund'

const Fund = ({ user, msgAlert }) => {
  const [fund, setFund] = useState({})
  const [deleted, setDeleted] = useState(false)
  const { id } = useParams()

  if (!user) return <Navigate to='/' />

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await showFund(user, id)
        console.log('res ', res.data)
        setFund(res.data.fund)
      } catch (error) {
        msgAlert({
          heading: 'Fund failed to load',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])

  const handleDelete = async () => {
    try {
      await deleteFund(user, id)
      setDeleted(true)
    } catch (error) {
      msgAlert({
        heading: 'Failed to delete fund',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  if (!fund) {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  } else if (deleted) {
    return <Navigate to='/funds/' />
  } else {
    return (
      <>
        <div className='row'>
          <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <h1>Ticker: {fund.ticker_symbol}</h1>
            <h3>Name: {fund.company_name}</h3>
            <h3>Price: {fund.price}</h3>

            <Button variant='danger' onClick={handleDelete}>Delete Fund</Button>
            <Link to={`/funds/${id}/edit`}>
              <Button variant='primary' type='submit'>Update Fund</Button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default Fund
