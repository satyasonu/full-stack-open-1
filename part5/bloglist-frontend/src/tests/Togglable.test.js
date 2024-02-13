import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggleable from '../components/Toggleable'

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Toggleable buttonLabel="show...">
        <div className="testDiv" >
          Toggleable content
        </div>
      </Toggleable>
    ).container
  })

test('renders its children', async () => {
  await screen.findAllByText('Toggleable content')
})

test('initially child content is not visible', () => {
  const div = container.querySelector('.toggleableContent')
  expect(div).toHaveStyle('display: none')
})

test('after click child content is visible', async () => {
  const user = userEvent.setup()
  const button = screen.getByText('show...')
  await user.click(button)

  const div = container.querySelector('.toggleableContent')
  expect(div).not.toHaveStyle('display:none')
})

test('togglable content can be closed', async() => {
  const user = userEvent.setup()
  const button = screen.getByText('show...')
  await user.click(button)

  const closeButton = screen.getByText('cancel')
  await user.click(closeButton)

  const div = container.querySelector('.toggleableContent')
  expect(div).toHaveStyle('display:none')
})

})