import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQueryWithReauth'
import { IResBranch } from '../common/branch.common'

const branchService = createApi({
  reducerPath: 'branchApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['branch'],
  endpoints: builder => ({
    getBranch: builder.query<IResBranch[], void>({
      query: () => `branches/owner`
    })

    // -------------------------------------------------------------------------->
  })
})

export const { useGetBranchQuery } = branchService

export default branchService
