import React from 'react'
import { Form, Button } from 'react-bootstrap'

const AccountForm = ({ handleSubmit, account, setAccount }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId='type'>
      <Form.Label>Type</Form.Label>
      <Form.Control
        placeholder='Account Type'
        type='type'
        value={account.type}
        onChange={event => setAccount(prev => ({ ...prev, type: event.target.value })) }
      />
    </Form.Group>

    <Form.Group controlId='accountnumber'>
      <Form.Label>Account Number</Form.Label>
      <Form.Control
        placeholder='Account Number'
        accountnumber='accountnumber'
        value={account.account_number}
        onChange={event => setAccount(prev => ({ ...prev, account_number: event.target.value })) }
      />
    </Form.Group>

    <Form.Group controlId='company'>
      <Form.Label>Company</Form.Label>
      <Form.Control
        placeholder='Account Company'
        company='company'
        value={account.company}
        onChange={event => setAccount(prev => ({ ...prev, company: event.target.value })) }
      />
    </Form.Group>

    <Form.Group controlId='balance'>
      <Form.Label>Balance</Form.Label>
      <Form.Control
        placeholder='Account Balance'
        balance='balance'
        value={account.balance}
        onChange={event => setAccount(prev => ({ ...prev, balance: event.target.value })) }
      />
    </Form.Group>

    <Form.Group controlId='inception'>
      <Form.Label>Inception</Form.Label>
      <Form.Control
        placeholder='Account Inception'
        inception='inception'
        value={account.inception}
        onChange={event => setAccount(prev => ({ ...prev, inception: event.target.value })) }
      />
    </Form.Group>

    <Button className='mt-2' variant='primary' type='submit'>Submit</Button>
  </Form>
)

export default AccountForm
