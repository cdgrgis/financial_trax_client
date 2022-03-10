import React from 'react'
import { Form, Button } from 'react-bootstrap'

const FundForm = ({ handleSubmit, fund, setFund, fundInfo, setFundInfo }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId='tickerSymbol'>
      <Form.Label>Ticker</Form.Label>
      <Form.Control
        placeholder='Ticker Symbol'
        ticker_symbol='ticker_symbol'
        value={fund.ticker_symbol}
        onChange={event => setFund(prev => ({ ...prev, ticker_symbol: event.target.value })) }
      />
    </Form.Group>

    <Form.Group controlId='companyName'>
      <Form.Label>Company Name</Form.Label>
      <Form.Control
        placeholder='Company Name'
        value={fund.company_name}
        onChange={event => setFund(prev => ({ ...prev, company_name: event.target.value })) }
      />
    </Form.Group>

    <Form.Group controlId='price'>
      <Form.Label>Price</Form.Label>
      <Form.Control
        placeholder='Price'
        price='price'
        value={fund.price}
        onChange={event => setFund(prev => ({ ...prev, price: event.target.value })) }
      />
    </Form.Group>

    <Form.Group controlId='amountOwned'>
      <Form.Label>Amount Owned</Form.Label>
      <Form.Control
        placeholder='Amount Owned'
        value={fundInfo.amount_owned}
        onChange={event => setFundInfo(prev => ({ ...prev, amount_owned: event.target.value })) }
      />
    </Form.Group>

    <Button className='mt-2' variant='primary' type='submit'>Submit</Button>
  </Form>
)

export default FundForm
