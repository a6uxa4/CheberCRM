// import {
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
// } from '@material-tailwind/react'
import clsx from 'clsx'
// import {
//   MdModeEditOutline,
//   MdOutlinePayment,
//   MdFreeCancellation
// } from 'react-icons/md'
import { translateAppointmentStatus } from '../../../../utils/helpers/general'
import {
  AppointmentStatusColor,
  translateAppointmentStatusColor
} from '../../../../utils/constants/calendar'
import styled from '@mui/system/styled'
import Tooltip, { TooltipProps } from '@mui/material/Tooltip'

interface LightTooltipProps extends TooltipProps {
  className?: string
  backgroundColor: any
}

const LightTooltip = styled(({ className, ...props }: LightTooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ backgroundColor }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: backgroundColor,
    width: 250,
    fontWeight: 500,
    color: 'aliceblue',
    fontSize: 14,
    padding: '10px',
    borderRadius: 12,
    zIndex: 999999
  }
}))

export const EventContent = ({ info, handlePayment }: any) => {
  return (
    // <Menu>
    //   <MenuHandler>
    <LightTooltip
      placement='top'
      backgroundColor={AppointmentStatusColor(
        info.event.extendedProps.appointmentStatus
      )}
      title={
        <div
          className={clsx(
            `${translateAppointmentStatusColor(
              info.event.extendedProps.appointmentStatus
            )} flex flex-col items-start justify-center gap-2 p-1 text-[15px]`
          )}
        >
          <span>Мастер: {info.event.title}</span>
          <span>
            Клиент: {info.event.extendedProps.userFirstName}
            {info.event.extendedProps.userLastName}
          </span>
          <span>
            Статус:{' '}
            {translateAppointmentStatus(
              info.event.extendedProps.appointmentStatus
            )}
          </span>
          <span>
            Номер телефона: 0
            {info.event.extendedProps.userPhoneNumber.slice(4, 13)}
          </span>
        </div>
      }
    >
      <div
        className={clsx('w-full flex cursor-pointer text-left', {
          'h-full items-center mx-0.5 mt-[1px] relative whitespace-nowrap':
            info.view.type === 'dayGridMonth',
          'mt-0.5 ml-[3px] absolute right-0 left-0 top-0 bottom-0 no-underline rounded text-[11.56px] box-border leading-[inherit]':
            info.view.type === 'timeGridWeek' ||
            info.view.type === 'timeGridDay'
        })}
      >
        <div
          style={{ backgroundColor: info.borderColor }}
          className={clsx(
            `w-2 h-2 min-w-2 min-h-2 rounded-full mx-1 text-[13.6px] leading-[20.4px] no-underline text-left whitespace-nowrap`,
            {
              hidden: info.view.type !== 'dayGridMonth'
            }
          )}
        ></div>
        <div
          className={clsx('', {
            'mr-[3px]': info.view.type === 'dayGridMonth',
            'text-[11.56px] mb-[1px] whitespace-nowrap flex-grow-0 flex-shrink-0 max-h-full overflow-hidden box-border text-white border-spacing-0 border-collapse':
              info.view.type === 'timeGridWeek'
          })}
        >
          {info.timeText}&nbsp;
        </div>
        <div
          className={clsx(
            'flex-grow flex-shrink font-bold overflow-hidden whitespace-nowrap box-border',
            {
              'text-[11.56px] bottom-0 max-h-full overflow-hidden whitespace-nowrap top-0 sticky box-border text-white cursor-pointer border-collapse border-spacing-0 indent-0 text-left leading-[inherit]':
                info.view.type === 'timeGridWeek'
            }
          )}
        >
          {info.event.title}
        </div>
      </div>
    </LightTooltip>

    //     </MenuHandler>
    //     <MenuList className='z-[9999]' placeholder='Menu'>
    //       <MenuItem
    //         onClick={() => handlePayment(info)}
    //         className='flex items-center justify-start gap-2 hover:!bg-green-50'
    //         placeholder='Menu'
    //       >
    //         <MdOutlinePayment />
    //         Оплата
    //       </MenuItem>
    //       <MenuItem
    //         className='flex items-center justify-start gap-2 hover:!bg-green-50'
    //         placeholder='Menu'
    //       >
    //         <MdModeEditOutline />
    //         Редактировать
    //       </MenuItem>
    //       <MenuItem
    //         className='flex items-center justify-start gap-2 hover:!bg-red-50'
    //         placeholder='Menu'
    //       >
    //         <MdFreeCancellation />
    //         Отменить запись
    //       </MenuItem>
    //     </MenuList>
    //   </Menu>
  )
}
