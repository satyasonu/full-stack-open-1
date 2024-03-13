import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const anecdotesApi = createApi({
  reducerPath: 'anecdotesApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
  tagTypes: ['Anecdote'],
  endpoints: (builder) => ({
    getAllAnecdotes: builder.query({
      query: () => '/anecdotes',
      providesTags: ['Anecdote']
    }),
    addAnecdote : builder.mutation({
      query: (anecdote) => ({url: '/anecdotes', method: 'POST', body: anecdote}),
      invalidatesTags: ['Anecdote']
    }),
    updateAnecdote: builder.mutation({
      query : (anecdote) => ({url: `/anecdotes/${anecdote.id}`, method: 'PATCH', body: anecdote}),
      invalidatesTags: ['Anecdote']
    })
  })

})

export const {useGetAllAnecdotesQuery, useAddAnecdoteMutation, useUpdateAnecdoteMutation } = anecdotesApi