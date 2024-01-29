import { Textarea } from '@nextui-org/react'
import { DatePicker } from '../../../../components/DatePickerWithSchedule'
import Modal from '../../../../components/Modal'
import { SelectDefault } from '../../../../components/Select'
import { useGetMastersSelectQuery } from '../../../../services/master.service'
import { useGetServiceMasterIdQuery } from '../../../../services/service.service'
import { useGetUsersSelectQuery } from '../../../../services/user.service'
import { translateDuration } from '../../../../utils/helpers/general'

export const CreateAppointment = () => {
  const { data: userData = [] } = useGetUsersSelectQuery()
  const { data: masterData = [] } = useGetMastersSelectQuery()

  const { data: masterServiceData = [] } = useGetServiceMasterIdQuery(1)

  return (
    <Modal
      isOpen={true}
      headline='2024'
      handleClose={() => console.log('hello')}
    >
      <div className='w-[400px] p-5 flex flex-col gap-5'>
        <SelectDefault
          label='Клиент'
          option={userData.map(item => {
            return { label: item.fullName, value: item.userId }
          })}
        />
        <SelectDefault
          label='Мастеры'
          option={masterData.map(item => {
            return { label: item.fullName, value: item.masterId }
          })}
        />
        <DatePicker
          label='Date'
          scheduleData={[]}
          onDate={() => console.log()}
          onTime={() => console.log()}
        />
        <SelectDefault
          placeholder='HELLO'
          label='Services'
          type='multiselect'
          option={masterServiceData.map(item => {
            return {
              label: `${item.name} ${item.price}с ${translateDuration(
                item.duration
              )}мин`,
              value: item.id
            }
          })}
        />
        <Textarea
          className='w-full border-[#899ca8] border-[1px] rounded-xl'
          classNames={{
            mainWrapper: 'bg-[#f9fafb]',
            inputWrapper: 'bg-[#f9fafb] hover:!bg-[#f9fafb]'
          }}
          label='Description'
          placeholder='Enter your description'
        />
      </div>
    </Modal>
  )
}
