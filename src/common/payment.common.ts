export interface IPostPaymentProps {
  appointmentId: number
  data: {
    cash: number
    card: number
    discount: number
  }
}
