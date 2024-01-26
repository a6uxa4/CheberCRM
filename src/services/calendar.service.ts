import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQueryWithReauth'
import { IGetCalendarProps, IResCalendar } from '../common/calendar.common'

const calendarService = createApi({
  reducerPath: 'calendarApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['calendar'],
  endpoints: builder => ({
    getCalendar: builder.query<IResCalendar[], IGetCalendarProps>({
      query: ({ startTime, endTime }) =>
        `appointments/calendar?startDay=${startTime}&endDay=${endTime}`
    })

    // -------------------------------------------------------------------------->
  })
})

export const { useGetCalendarQuery } = calendarService

export default calendarService
