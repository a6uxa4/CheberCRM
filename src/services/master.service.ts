import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQueryWithReauth'
import { IResMasterSelect } from '../common/master.common'

const masterService = createApi({
  reducerPath: 'masterApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['master'],
  endpoints: builder => ({
    getMastersSelect: builder.query<IResMasterSelect[], void>({
      query: () => `v1/masters/select`
    })

    // -------------------------------------------------------------------------->
  })
})

export const { useGetMastersSelectQuery } = masterService

export default masterService
