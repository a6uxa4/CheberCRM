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
import { Button } from '@material-tailwind/react'

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
      headline='Новый визит'
      handleClose={handleClose}
    >
      <div className='flex flex-col items-center justify-center gap-3 p-2 min-w-[350px] max-w-[350px] mt-3'>
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
        <Textarea
          label='Комментарий'
          value={appointmentsCalendarData.description}
          onValueChange={e =>
            setAppointmentsCalendarData({
              ...appointmentsCalendarData,
              description: e
            })
          }
          placeholder='Оставьте комментарий'
          className='w-full border-[#899ca8] border-[1px] rounded-xl'
          classNames={{
            mainWrapper: 'bg-[#f9fafb]',
            inputWrapper: 'bg-[#f9fafb] hover:!bg-[#f9fafb]'
          }}
        />
        <div className='w-full flex items-center justify-end gap-5 row-span-4'>
          <Button
            onClick={handleClose}
            color='green'
            variant='outlined'
            placeholder='Enter text'
          >
            Отмена
          </Button>
          <Button color='green' variant='filled' placeholder='Enter text'>
            Сохранить
          </Button>
        </div>
      </div>
    </Modal>
  )
}
