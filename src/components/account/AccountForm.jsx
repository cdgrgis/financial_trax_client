import React from 'react'
import { Form, Button } from 'react-bootstrap'

const AccountForm = ({ handleSubmit, name, company, balance, setName, setCompany, setBalance }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId='name'>
      <Form.Label>Name</Form.Label>
      <Form.Control
        placeholder='Account Name'
        name='name'
        value={name}
        onChange={event => setName(event.target.value)}
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

    <Button className='mt-2' variant='primary' type='submit'>Submit</Button>
  </Form>
)

export default AccountForm
