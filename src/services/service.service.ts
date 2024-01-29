import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQueryWithReauth'
import {
  IGetServiceSelectById,
  IResServiceSelectById
} from '../common/service.common'

const serviceService = createApi({
  reducerPath: 'serviceApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['service'],
  endpoints: builder => ({
    getServiceMasterId: builder.query<
      IResServiceSelectById[],
      IGetServiceSelectById
    >({
      query: masterId => `v2/masters/${masterId}/select`
    })

    // -------------------------------------------------------------------------->
  })
})

export const { useGetServiceMasterIdQuery } = serviceService

export default serviceService
