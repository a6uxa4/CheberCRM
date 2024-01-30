import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQueryWithReauth'
import {
  IResMasterSelect,
  IResMasterSchedule,
  IGetMasterSchedule
} from '../common/master.common'

const masterService = createApi({
  reducerPath: 'masterApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['master'],
  endpoints: builder => ({
    getMastersSelect: builder.query<IResMasterSelect[], void>({
      query: () => `v1/masters/select`
    }),

    // -------------------------------------------------------------------------->

    getFreeTimeSchedule: builder.query<
      IResMasterSchedule[],
      IGetMasterSchedule
    >({
      query: ({ masterId, appointmentDate, serviceTime }) => {
        return {
          url: `day-schedules/free-time/${masterId}?appointmentDate=${appointmentDate}&serviceTime=${serviceTime}`
        }
      }
    })
  })
})

export const { useGetMastersSelectQuery, useGetFreeTimeScheduleQuery } =
  masterService

export default masterService
