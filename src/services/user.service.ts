import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQueryWithReauth'
import { IGetUsers, IResUsers, IResUsersSelect } from '../common/users.common'

const userService = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['user'],
  endpoints: builder => ({
    getUsers: builder.query<IResUsers[], IGetUsers>({
      query: branchId => `users/branches/${branchId}`
    }),

    // -------------------------------------------------------------------------->

    getUsersSelect: builder.query<IResUsersSelect[], void>({
      query: () => `users/select`
    })
  })
})

export const { useGetUsersQuery, useGetUsersSelectQuery } = userService

export default userService
