// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

const buildLoginForm = build({
  fields: {
    txtUsername: fake(f => f.internet.userName()),
    txtPassword: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', async () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  const handleSubmit = jest.fn()

  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)
  // screen.debug()

  // 🐨 get the username and password fields via `getByLabelText`
  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)
  const submit = screen.getByRole('button', {name: /submit/i})

  const {txtUsername, txtPassword} = buildLoginForm()
  console.log(txtUsername, txtPassword)
  // const {txtUsername, txtPassword} = buildLoginForm({
  //   txtUsername: 'chucknorris',
  // })

  // 🐨 use `await userEvent.type...` to change the username and password fields to
  //    whatever you want
  await userEvent.type(username, txtUsername)
  await userEvent.type(password, txtPassword)

  // 🐨 click on the button with the text "Submit"
  await userEvent.click(submit)

  // assert that submittedData is correct
  expect(handleSubmit).toHaveBeenCalledWith({
    username: txtUsername,
    password: txtPassword,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
