import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'


const blog = {
  "title":"Component Structure",
  "author":"Mahesh J",
  "url":"http://react-comonent/component",
  "likes": 0,
  "users": [
    {"id": "45687h7869hyuibfrd"}
  ]
}

test('renders blog data', () => {
  render(<Blog blog={blog} />)
  const element = screen.getAllByText('Component Structure')
  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleLikeButton={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('title and author name rendered by default', () => {
  const { container } = render(<Blog blog={blog} />)
  
  const title = container.querySelector('.title')
  const author = container.querySelector('.author')
  const url = container.querySelector('.url')
  const user = container.querySelector('.user')
  const likes = container.querySelector('.likes')

  expect(title).toBeVisible()
  expect(author).toBeVisible()
  expect(url).not.toBeVisible()
  expect(user).not.toBeVisible()  
  expect(likes).not.toBeVisible()
})

test('url, likes visible after clicking on show button', async () => {

  const {container} = render(<Blog blog={blog}/>)

  const showHideBtn = container.querySelector('.showHideBtn')

  await userEvent.click(showHideBtn)

  const url = container.querySelector('.url')
  const likes = container.querySelector('.likes')
  const user = container.querySelector('.user')

  expect(url).toBeVisible()
  expect(likes).toBeVisible()
  expect(user).toBeVisible()
})


test('like button called twice test', async () => {
  const mockLikeFn = jest.fn()
  const user = userEvent.setup()

  const {container} = render(<Blog blog={blog} handleLikeButton={mockLikeFn} />)

  const likeBtn = container.querySelector('.linkbtn')

  await user.click(likeBtn)
  await user.click(likeBtn)

  // expect(mockLikeFn).toHaveBeenCalledTimes(2)
  expect(mockLikeFn.mock.calls).toHaveLength(2)
})
