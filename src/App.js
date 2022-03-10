/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'

import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'

import Home from './components/Home'
import Accounts from './components/account/Accounts'
import Account from './components/account/Account'
import AccountCreate from './components/account/AccountCreate'
import AccountUpdate from './components/account/AccountUpdate'

import Funds from './components/fund/Funds'
import Fund from './components/fund/Fund'
import FundCreate from './components/fund/FundCreate'
import FundUpdate from './components/fund/FundUpdate'

const App = () => {
  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    console.log('logged in user ', loggedInUser)
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      setUser(foundUser)
    }
  }, [])

  const clearUser = () => setUser(null)

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    setMsgAlerts(msgAlerts => ([...msgAlerts, { heading, message, variant, id }]))
  }

  return (
    <>
      <Header user={user} />
      {msgAlerts.map(msgAlert => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
        />
      ))}
      <main className='container'>
        <Routes>
          <Route
            path='/'
            element={<Home /> }
          />

          <Route
            path='/sign-up/'
            element={<SignUp msgAlert={msgAlert} setUser={setUser} /> }
          />
          <Route
            path='/sign-in/'
            element={<SignIn msgAlert={msgAlert} setUser={setUser} /> }
          />
          <Route
            path='/sign-out/'
            element={<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} /> }
          />
          <Route
            path='/change-password/'
            element={<ChangePassword msgAlert={msgAlert} user={user} /> }
          />

          <Route
            path='/accounts/'
            element={<Accounts msgAlert={msgAlert} user={user} /> }
          />
          <Route
            path='/accounts/:id'
            element={<Account msgAlert={msgAlert} user={user} /> }
          />
          <Route
            path='/accounts/create'
            element={<AccountCreate msgAlert={msgAlert} user={user} /> }
          />
          <Route
            path='/accounts/:id/edit'
            element={<AccountUpdate msgAlert={msgAlert} user={user} /> }
          />

          <Route
            path='/funds/'
            element={<Funds msgAlert={msgAlert} user={user} /> }
          />
          <Route
            path='/funds/:id'
            element={<Fund msgAlert={msgAlert} user={user} /> }
          />
          <Route
            path='/funds/create'
            element={<FundCreate msgAlert={msgAlert} user={user} /> }
          />
          <Route
            path='/funds/:id/edit'
            element={<FundUpdate msgAlert={msgAlert} user={user} /> }
          />
        </Routes>
      </main>
    </>
  )
}

export default App
