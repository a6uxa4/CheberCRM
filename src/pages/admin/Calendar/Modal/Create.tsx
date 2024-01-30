import { Textarea } from '@nextui-org/react'
import { DatePicker } from '../../../../components/DatePickerWithSchedule'
import Modal from '../../../../components/Modal'
import { SelectDefault } from '../../../../components/Select'
import {
  useGetFreeTimeScheduleQuery,
  useGetMastersSelectQuery
} from '../../../../services/master.service'
import { useGetServiceMasterIdQuery } from '../../../../services/service.service'
import { useGetUsersSelectQuery } from '../../../../services/user.service'
import {
  calculateEndTime,
  translateDuration
} from '../../../../utils/helpers/general'

export const CreateAppointment = ({
  setAppointmentsCalendarData,
  appointmentsCalendarData,
  appointmentCalendarModal,
  handleClose
}: any) => {
  const { data: masterServiceData = [] } = useGetServiceMasterIdQuery(
    appointmentsCalendarData.masterId,
    {
      skip: appointmentsCalendarData.masterId === ''
    }
  )

  const filteredServices = masterServiceData.filter(item =>
    appointmentsCalendarData.serviceIds.includes(item.id)
  )

  const totalDuration = filteredServices.reduce(
    (total, item) => total + item.duration,
    0
  )

  const { data: userData = [] } = useGetUsersSelectQuery()
  const { data: masterData = [] } = useGetMastersSelectQuery()
  const { data: freeTimeData = [] } = useGetFreeTimeScheduleQuery(
    {
      masterId: appointmentsCalendarData.masterId,
      appointmentDate: appointmentsCalendarData.startDate,
      serviceTime: totalDuration
    },
    {
      skip: !Boolean(totalDuration) || appointmentsCalendarData.startDate === ''
    }
  )

  return (
    <Modal
      isOpen={appointmentCalendarModal.create}
      headline='2024'
      handleClose={handleClose}
    >
      <div className='w-[400px] p-5 flex flex-col gap-5'>
        <SelectDefault
          label='Клиент'
          value={appointmentsCalendarData.userId}
          onChange={e =>
            setAppointmentsCalendarData({
              ...appointmentsCalendarData,
              userId: e.target.value
            })
          }
          placeholder='Выберите пользователя'
          option={userData.map(item => {
            return { label: item.fullName, value: item.userId }
          })}
        />
        <SelectDefault
          label='Мастеры'
          value={appointmentsCalendarData.masterId}
          onChange={e =>
            setAppointmentsCalendarData({
              ...appointmentsCalendarData,
              masterId: e.target.value
            })
          }
          placeholder='Выберите мастера'
          option={masterData.map(item => {
            return { label: item.fullName, value: item.masterId }
          })}
        />
        <DatePicker
          label='Дата'
          scheduleData={freeTimeData}
          endTime={calculateEndTime(
            appointmentsCalendarData.startTime,
            totalDuration
          )}
          values={`${appointmentsCalendarData.startDate}~${appointmentsCalendarData.startTime}`}
          onDate={e =>
            setAppointmentsCalendarData({
              ...appointmentsCalendarData,
              startDate: e
            })
          }
          onTime={e => {
            setAppointmentsCalendarData({
              ...appointmentsCalendarData,
              startTime: e,
              endTime: calculateEndTime(e, totalDuration)
            })
          }}
        />
        <SelectDefault
          label='Услуги'
          value={appointmentsCalendarData.serviceIds}
          onChange={e =>
            setAppointmentsCalendarData({
              ...appointmentsCalendarData,
              serviceIds: e.target.value.split(',').map(Number)
            })
          }
          placeholder='Выберите услугу'
          type='multiple'
          option={masterServiceData.map(item => {
            return {
              label: `${item.name} ${item.price}с ${translateDuration(
                item.duration
              )}`,
              value: item.id
            }
          })}
        />
        <Textarea
          label='Комментарий'
          value={appointmentsCalendarData.description}
          onChange={e =>
            setAppointmentsCalendarData({
              ...appointmentsCalendarData,
              description: e.target.value
            })
          }
          placeholder='Оставьте комментарий'
          className='w-full border-[#899ca8] border-[1px] rounded-xl'
          classNames={{
            mainWrapper: 'bg-[#f9fafb]',
            inputWrapper: 'bg-[#f9fafb] hover:!bg-[#f9fafb]'
          }}
        />
      </div>
    </Modal>
  )
}
