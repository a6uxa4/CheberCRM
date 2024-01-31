export interface IPostPaymentProps {
  appointmentId: number
  data: {
    cash: number
    card: number
    discount: number
  }
}

export interface IResPaymentProps {
  sum: number
  appointmentStatus: string
  bonus: number
}

export interface IGetPaymentProps {
  appointmentId: number
}
