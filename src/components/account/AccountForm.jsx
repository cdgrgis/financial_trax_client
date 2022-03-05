import React from 'react'
import { Form, Button } from 'react-bootstrap'

const AccountForm = ({ handleSubmit, type, company, balance, inception, accountnumber, setType, setCompany, setBalance, setInception, setAccountnumber }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId='type'>
      <Form.Label>Type</Form.Label>
      <Form.Control
        placeholder='Account Type'
        type='type'
        value={type}
        onChange={event => setType(event.target.value)}
      />
    </Form.Group>

    <Form.Group controlId='accountnumber'>
      <Form.Label>Account Number</Form.Label>
      <Form.Control
        placeholder='Account Number'
        accountnumber='accountnumber'
        value={accountnumber}
        onChange={event => setAccountnumber(event.target.value)}
        // onChange={event => setAccountData(prev => ({ account: { ...prev.account, }}))}
      />
    </Form.Group>

    <Form.Group controlId='company'>
      <Form.Label>Company</Form.Label>
      <Form.Control
        placeholder='Account Company'
        company='company'
        value={company}
        onChange={event => setCompany(event.target.value)}
      />
    </Form.Group>

    <Form.Group controlId='balance'>
      <Form.Label>Balance</Form.Label>
      <Form.Control
        placeholder='Account Balance'
        balance='balance'
        value={balance}
        onChange={event => setBalance(event.target.value)}
      />
    </Form.Group>

    <Form.Group controlId='inception'>
      <Form.Label>Inception</Form.Label>
      <Form.Control
        placeholder='Account Inception'
        inception='inception'
        value={inception}
        onChange={event => setInception(event.target.value)}
      />
    </Form.Group>

    <Button className='mt-2' variant='primary' type='submit'>Submit</Button>
  </Form>
)

export default AccountForm
