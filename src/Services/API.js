// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articleAPI = createApi({
  tagTypes: ['articles'],
  reducerPath: 'articleAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://iim.etherial.fr' }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => `products`,
      providesTags: ['products'],
    }),
    createArticle: builder.mutation({
      query: (data) => ({
        url: '/articles',
        method: "POST",
        body: data
      }),
      invalidatesTags: ['articles'],
    }),
  }),
})

export const { useGetArticlesQuery, useCreateArticleMutation } = articleAPI

export const commentAPI = createApi({
  tagTypes: ['comments'],
  reducerPath: 'commentAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://iim.etherial.fr' }),
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (id) => `products/${id}/comments`,
      providesTags: (result, error, id) => [{ type: 'comments', id }],
    }),
    createComment: builder.mutation({
      query: ({ productId, username, comment }) => ({
        url: `products/${productId}/comments`,
        method: 'POST',
        body: { productId, username, comment },
      }),
      invalidatesTags: ({ productId }) => [{ type: 'comments', id: productId }],
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentMutation } = commentAPI;

