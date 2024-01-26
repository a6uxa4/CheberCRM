import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQueryWithReauth'
import { IResCompany } from '../common/company.common'

const companyService = createApi({
  reducerPath: 'companyApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['company'],
  endpoints: builder => ({
    getCompany: builder.query<IResCompany[], void>({
      query: () => `companies`
    })

    // -------------------------------------------------------------------------->
  })
})

export const { useGetCompanyQuery } = companyService

export default companyService
