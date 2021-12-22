import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'

import './AutoDismissAlert.scss'

const AutoDismissAlert = ({ variant, heading, message, deleteAlert, id }) => {
  const [show, setShow] = useState(true)
  const [timeoutId, setTimeoutId] = useState(null)

  useEffect(() => {
    const id = setTimeout(handleClose, 5000)
    setTimeoutId(id)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  const handleClose = () => setShow(false)

  // Delete this alert after the fade animation time (300 ms by default)
  if (!show) {
    setTimeout(() => {
      deleteAlert(id)
    }, 300)
  }

  return (
    <Alert
      dismissible
      show={show}
      variant={variant}
      onClose={handleClose}>
      <div className='container'>
        <Alert.Heading>{heading}</Alert.Heading>
        <p className='alert-body'>{message}</p>
      </div>
    </Alert>
  )
}

export default AutoDismissAlert
