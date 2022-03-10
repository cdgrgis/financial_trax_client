import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

// Import FundForm:
import FundForm from './FundForm'
import { createFund } from '../../api/fund'

const FundCreate = ({ user, msgAlert }) => {
  const [fund, setFund] = useState({
    ticker_symbol: '',
    company_name: '',
    price: 0
  })
  const [createdId, setCreatedId] = useState('')

  console.log('fund data ', fund)

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const res = await createFund(user, fund)
      console.log('res ', res.data.fund)
      setCreatedId(res.data.fund.id)

      msgAlert({
        heading: 'Fund Created',
        message: `Created ${fund.type} successfully.`,
        variant: 'success'
      })
    } catch (error) {
      msgAlert({
        heading: 'Failed to create fund',
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
    return <Navigate to={`/funds/${createdId}`} />
  }
  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Create Fund</h3>
        <FundForm
          handleSubmit={handleSubmit}
          fund={fund}
          setFund={setFund}
        />
      </div>
    </div>
  )
}

export default FundCreate
