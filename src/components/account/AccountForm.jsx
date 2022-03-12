import React from 'react'
import { Form, Button } from 'react-bootstrap'

const AccountForm = ({ handleSubmit, account, handleAccountChange }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId='type'>
      <Form.Label>Type</Form.Label>
      <Form.Control
        placeholder='Account Type'
        name='type'
        value={account.type}
        onChange={handleAccountChange} />
    </Form.Group>

    <Form.Group controlId='accountnumber'>
      <Form.Label>Account Number</Form.Label>
      <Form.Control
        placeholder='Account Number'
        name='account_number'
        value={account.account_number}
        onChange={handleAccountChange} />
    </Form.Group>

    <Form.Group controlId='company'>
      <Form.Label>Company</Form.Label>
      <Form.Control
        placeholder='Account Company'
        name='company'
        value={account.company}
        onChange={handleAccountChange} />
    </Form.Group>

    <Form.Group controlId='inception'>
      <Form.Label>Inception</Form.Label>
      <Form.Control
        placeholder='Account Inception'
        name='inception'
        value={account.inception}
        onChange={handleAccountChange}
      />
    </Form.Group>

    <Button className='mt-2' variant='primary' type='submit'>Submit</Button>
  </Form>
)

export default AccountForm
