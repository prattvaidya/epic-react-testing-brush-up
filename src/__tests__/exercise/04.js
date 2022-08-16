// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  let submittedData
  const handleSubmit = data => {
    submittedData = data
  }

  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)
  // screen.debug()

  // 🐨 get the username and password fields via `getByLabelText`
  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)
  const submit = screen.getByRole('button', {name: /submit/i})

  const txtUsername = 'chucknorris'
  const txtPassword = 'i need no password'

  // 🐨 use `await userEvent.type...` to change the username and password fields to
  //    whatever you want
  await userEvent.type(username, txtUsername)
  await userEvent.type(password, txtPassword)

  // 🐨 click on the button with the text "Submit"
  await userEvent.click(submit)

  // assert that submittedData is correct
  expect(submittedData).toEqual({
    username: txtUsername,
    password: txtPassword,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
