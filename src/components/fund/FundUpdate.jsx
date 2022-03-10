import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import FundForm from './FundForm'
import { showFund, updateFund } from '../../api/fund'

const FundEdit = ({ user, msgAlert }) => {
  const [fund, setFund] = useState({
    ticker_symbol: '',
    company_name: '',
    price: 0
  })
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
        const res = await showFund(user, id)
        console.log('res ', res.data)
        setFund(res.data.fund)
      } catch (error) {
        msgAlert({
          heading: 'Failed to load fund',
          message: error.message,
          variant: 'danger'
        })
      }
    }
    fetchData()
  }, [])
  console.log('fund data', fund)

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await updateFund(user, id, fund)
      setUpdated(true)
    } catch (error) {
      msgAlert({
        heading: 'Failed to update fund',
        message: error.message,
        variant: 'danger'
      })
    }
  }

  if (updated) {
    // Navigate to the 'show' page
    return <Navigate to={`/funds/${id}`} />
  }

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Edit Fund</h3>
        <FundForm
          handleSubmit={handleSubmit}
          fund={fund}
          setFund={setFund}
        />
      </div>
    </div>
  )
}

export default FundEdit
