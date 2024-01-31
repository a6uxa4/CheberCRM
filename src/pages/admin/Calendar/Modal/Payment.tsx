import { Input } from '@nextui-org/react'
import Modal from '../../../../components/Modal'
import { useEffect, useState } from 'react'
import { Button } from '@material-tailwind/react'
import { usePostPaymentMutation } from '../../../../services/payment.service'

export const Payment = ({ handleClose, appointmentCalendarModal }: any) => {
  const [paymentCalendarData, setPaymentCalendarData] = useState({
    finalPayment: appointmentCalendarModal.payment.title.split('~')[1],
    userPayment: {
      cash: 0,
      card: 0,
      discount: 0
    }
  })
  const [percentDiscount, setPercentDiscount] = useState<string | number>('')

  const [handlePost] = usePostPaymentMutation()

  function handleChangeDiscount(value: string, discountType: string) {
    let parsedValue = parseFloat(value)

    if (discountType === 'fix') {
      if (parsedValue === -1) {
        parsedValue = appointmentCalendarModal.payment.title.split('~')[1]
      }
      if (parsedValue > appointmentCalendarModal.payment.title.split('~')[1]) {
        parsedValue = appointmentCalendarModal.payment.title.split('~')[1]
      }

      const discount = parsedValue
      const finalPayment = isNaN(discount)
        ? appointmentCalendarModal.payment.title.split('~')[1]
        : appointmentCalendarModal.payment.title.split('~')[1] - discount

      setPaymentCalendarData({
        ...paymentCalendarData,
        userPayment: {
          ...paymentCalendarData.userPayment,
          discount
        },
        finalPayment
      })

      setPercentDiscount(
        (discount / appointmentCalendarModal.payment.title.split('~')[1]) * 100
      )
    } else if (discountType === 'percent') {
      if (parsedValue === -1) {
        parsedValue = 100
      }
      if (parsedValue > 100) {
        parsedValue = 100
      }

      const discount =
        (parsedValue / 100) *
        appointmentCalendarModal.payment.title.split('~')[1]
      const finalPayment = isNaN(discount)
        ? appointmentCalendarModal.payment.title.split('~')[1]
        : appointmentCalendarModal.payment.title.split('~')[1] - discount

      setPercentDiscount(parsedValue)
      setPaymentCalendarData({
        ...paymentCalendarData,
        userPayment: {
          ...paymentCalendarData.userPayment,
          discount
        },
        finalPayment
      })
    }
  }

  async function handleClick() {
    try {
      const changeResult = handleChange(
        String(paymentCalendarData.userPayment.cash)
      )
      await handlePost({
        appointmentId: appointmentCalendarModal.payment.title.split('~')[2],
        data: {
          ...paymentCalendarData.userPayment,
          cash:
            Number(paymentCalendarData.userPayment.cash) -
            Number(changeResult.totalPayment.split('Итого к оплате: -')[1])
        }
      }).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setPaymentCalendarData({
      ...paymentCalendarData,
      finalPayment: appointmentCalendarModal.payment.title.split('~')[1]
    })
  }, [appointmentCalendarModal.payment.title])

  function handleChange(change: string) {
    const changes = String(change)
    const finalPayment =
      appointmentCalendarModal.payment.title.split('~')[1] -
      paymentCalendarData.userPayment.cash -
      paymentCalendarData.userPayment.card -
      paymentCalendarData.userPayment.discount

    if (changes.split('').includes('-')) {
      const changeAmount = Number(changes.split('-')[1])
      const remainingPayment = finalPayment - changeAmount
      const paymentOkan = String(remainingPayment).split('').includes('-')
        ? 0
        : remainingPayment
      return {
        change: `Сдача: ${changeAmount}`,
        totalPayment: `Итого к оплате: ${paymentOkan}`
      }
    } else {
      return {
        change: '',
        totalPayment: `Итого к оплате: ${finalPayment}`
      }
    }
  }

  return (
    <Modal
      headline={`Клиент: ${
        appointmentCalendarModal.payment.title.split('~')[0]
      }`}
      isOpen={appointmentCalendarModal.payment.modal}
      handleClose={handleClose}
    >
      <div className='w-[600px] p-2 mt-5 flex flex-col gap-5'>
        <div className='w-full flex items-center justify-center gap-2'>
          <div className='text-[20px] text-green-800'>
            К оплате: {appointmentCalendarModal.payment.title.split('~')[1]}
          </div>
          <div className='flex items-center justify-center gap-5'>
            <Input
              type='number'
              placeholder='0'
              onChange={e => handleChangeDiscount(e.target.value, 'percent')}
              value={String(percentDiscount)}
              labelPlacement='outside'
              startContent={
                <div className='pointer-events-none flex items-center'>
                  <span className='text-default-400 text-small'>%</span>
                </div>
              }
            />
            <Input
              type='number'
              placeholder='0'
              onChange={e => handleChangeDiscount(e.target.value, 'fix')}
              value={String(paymentCalendarData.userPayment.discount)}
              labelPlacement='outside'
              startContent={
                <div className='pointer-events-none flex items-center'>
                  <span className='text-default-400 text-small'>C</span>
                </div>
              }
            />
          </div>
        </div>
        <div className='w-full flex items-center justify-between px-2'>
          <div className='text-[20px] text-green-800'>
            {handleChange(paymentCalendarData.finalPayment).totalPayment}
          </div>
          <div className='text-[20px] text-green-800'>
            {handleChange(paymentCalendarData.finalPayment).change}
          </div>
        </div>
        <div className='flex gap-5'>
          <Input
            onClick={() =>
              setPaymentCalendarData({
                ...paymentCalendarData,
                finalPayment: 0,
                userPayment: {
                  ...paymentCalendarData.userPayment,
                  cash: paymentCalendarData.finalPayment
                }
              })
            }
            type='number'
            placeholder='0'
            label='Оплата наличными'
            onChange={e => {
              const value = Number(e.target.value)
              const finalPayment =
                appointmentCalendarModal.payment.title.split('~')[1] -
                value -
                paymentCalendarData.userPayment.card -
                paymentCalendarData.userPayment.discount
              setPaymentCalendarData({
                ...paymentCalendarData,
                finalPayment,
                userPayment: {
                  ...paymentCalendarData.userPayment,
                  cash: value
                }
              })
            }}
            value={String(paymentCalendarData.userPayment.cash)}
            labelPlacement='inside'
          />
          <Input
            onClick={() =>
              setPaymentCalendarData({
                ...paymentCalendarData,
                finalPayment: 0,
                userPayment: {
                  ...paymentCalendarData.userPayment,
                  card: paymentCalendarData.finalPayment
                }
              })
            }
            type='number'
            placeholder='0'
            label='Оплата картой'
            onChange={e => {
              const value = Number(e.target.value)
              const finalPayment =
                appointmentCalendarModal.payment.title.split('~')[1] -
                value -
                paymentCalendarData.userPayment.cash -
                paymentCalendarData.userPayment.discount

              setPaymentCalendarData({
                ...paymentCalendarData,
                finalPayment,
                userPayment: {
                  ...paymentCalendarData.userPayment,
                  card: value
                }
              })
            }}
            value={String(paymentCalendarData.userPayment.card)}
            labelPlacement='inside'
          />
        </div>
        <div className='w-full flex items-center justify-end gap-5 row-span-4'>
          <Button
            onClick={handleClose}
            color='green'
            variant='outlined'
            placeholder='Enter text'
          >
            Отмена
          </Button>
          <Button
            color='green'
            variant='filled'
            placeholder='Enter text'
            disabled={paymentCalendarData.finalPayment > 0}
            onClick={handleClick}
          >
            Оплатить
          </Button>
        </div>
      </div>
    </Modal>
  )
}
