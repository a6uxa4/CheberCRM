import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQueryWithReauth'
import { IResBranch, IResBranchAdmin } from '../common/branch.common'

const branchService = createApi({
  reducerPath: 'branchApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['branch'],
  endpoints: builder => ({
    getBranch: builder.query<IResBranch[], void>({
      query: () => `branches/owner`
    }),

    // -------------------------------------------------------------------------->

    getBranchAdmin: builder.query<IResBranchAdmin, void>({
      query: () => `branches/adminMaster`
    })
  })
})

export const { useGetBranchQuery, useGetBranchAdminQuery } = branchService

export default branchService
