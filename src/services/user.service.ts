import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQueryWithReauth'
import { IGetUsers, IResUsers } from '../common/users.common'

const userService = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['user'],
  endpoints: builder => ({
    getUsers: builder.query<IResUsers[], IGetUsers>({
      query: branchId => `users/branches/${branchId}`
    })

    // -------------------------------------------------------------------------->
  })
})

export const { useGetUsersQuery } = userService

export default userService
