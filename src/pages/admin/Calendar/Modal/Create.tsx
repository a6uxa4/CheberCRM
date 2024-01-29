import Modal from '../../../../components/Modal'
import { SelectDefault } from '../../../../components/Select'
import { useGetMastersSelectQuery } from '../../../../services/master.service'
import { useGetUsersSelectQuery } from '../../../../services/user.service'

export const CreateAppointment = () => {
  const { data: userData = [] } = useGetUsersSelectQuery()
  const { data: masterData = [] } = useGetMastersSelectQuery()

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
      </div>
    </Modal>
  )
}
