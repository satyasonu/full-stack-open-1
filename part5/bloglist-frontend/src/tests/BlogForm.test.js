import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

describe('<BlogForm />' , () => {
  test('handlesubmit test', async () => {
      const mockSubmitHandler = jest.fn(e => e.preventDefault())
      const user = userEvent.setup()

      render(<BlogForm handleBlogSubmit={mockSubmitHandler} />)

      const titleInput = screen.getByPlaceholderText('Enter title')
      const authorInput = screen.getByPlaceholderText('Enter author name')
      const urlInput = screen.getByPlaceholderText('Enter url')
      const likesInput = screen.getByPlaceholderText('Enter likes')

      const createButton = screen.getByText('create')

      await user.type(titleInput, 'new blog')
      await user.type(authorInput, 'new author')
      await user.type(urlInput, 'new url')
      await user.type(likesInput, '90')

      await user.click(createButton)

      expect(mockSubmitHandler).toHaveBeenCalledTimes(1)
      expect(mockSubmitHandler.mock.calls).toHaveLength(1)
      expect(mockSubmitHandler.mock.calls[0][1]).toEqual({
        title: 'new blog',
        author: 'new author',
        url: 'new url',
        likes: '90'
      })
  })
})