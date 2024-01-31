import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../api/baseQueryWithReauth'
import {
  IPostPaymentProps,
  IGetPaymentProps,
  IResPaymentProps
} from '../common/payment.common'

const paymentService = createApi({
  reducerPath: 'paymentApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['payment'],
  endpoints: builder => ({
    postPayment: builder.mutation<any, IPostPaymentProps>({
      query: ({ appointmentId, data }) => {
        return {
          url: `payments/toPay/${appointmentId}`,
          method: 'POST',
          body: data
        }
      }
    }),

    // -------------------------------------------------------------------------->

    getPayment: builder.query<IResPaymentProps, IGetPaymentProps>({
      query: appointmentId => `payments/wantsToPay/${appointmentId}`
    })
  })
})

export const { usePostPaymentMutation, useGetPaymentQuery } = paymentService

export default paymentService
