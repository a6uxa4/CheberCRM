import { RefObject, useRef, useState } from 'react'

import FullCalendar from '@fullcalendar/react'
import { EventClickArg } from '@fullcalendar/core'
import {
  AppointmentStatusColor,
  configCalendar,
  isLoadingSx
} from '../../../utils/constants/calendar'
import {
  CalendarThisDataProps,
  IResCalendar
} from '../../../common/calendar.common'
import { Backdrop, CircularProgress } from '@mui/material'
import { format } from 'date-fns'
import { useGetCalendarQuery } from '../../../services/calendar.service'

import { EventContent } from './Components/EventContent'
import { useLocation, useSearchParams } from 'react-router-dom'
import { CreateAppointment } from './Modal/Create'
import { Payment } from './Modal/Payment'

export const CalendarPage = () => {
  const [appointmentCalendarModal, setAppointmentCalendarModal] = useState({
    create: false,
    update: false,
    payment: {
      modal: false,
      title: ''
    }
  })
  const [thisData, setThisData] = useState({
    startTime: '',
    endTime: '',
    masterId: []
  })

  const [appointmentsCalendarData, setAppointmentsCalendarData] = useState({
    masterId: '',
    userId: '',
    serviceIds: [],
    appointmentStatus: {
      label: 'Оброботке',
      value: 'IN_PROCESSING'
    },
    startDate: '',
    startTime: '',
    endTime: '',
    description: ''
  })

  const calendarRef: RefObject<FullCalendar> = useRef(null)
  const { search } = useLocation()
  const [_, setSearchParams] = useSearchParams()

  // --------------------------------Request--------------------------------------------

  const { data: CalendarData = [], isLoading } = useGetCalendarQuery(thisData, {
    skip: thisData.startTime === ''
  })

  // --------------------------------Function--------------------------------------------

  function handleChangeSelectedDate(event: CalendarThisDataProps) {
    setAppointmentCalendarModal({
      ...appointmentCalendarModal,
      create: true
    })
    setAppointmentsCalendarData({
      ...appointmentsCalendarData,
      startDate: format(event.startStr, 'yyyy-MM-dd')
    })
  }

  function handleChangeEventClick(event: EventClickArg) {
    setAppointmentCalendarModal({
      ...appointmentCalendarModal,
      update: true
    })

    console.log('Update', event)
  }

  function handleThisMoment(event: CalendarThisDataProps) {
    const startDate = new Date(event.startStr)
    const endDate = new Date(event.endStr)

    setSearchParams({ type: event.view.type })

    const calendarApi = (calendarRef.current as any)?.getApi()
    const buttons = calendarApi?.el?.querySelectorAll(
      '.fc-myCustomButton-button'
    )

    if (buttons) {
      buttons.forEach((button: any) => {
        button.classList.add('fc-button-active')
      })
    } else {
      if (buttons) {
        buttons.forEach((button: any) => {
          button.classList.remove('fc-button-active')
        })
      }
      setThisData({
        ...thisData,
        startTime: format(startDate, 'yyyy-MM-dd'),
        endTime: format(endDate, 'yyyy-MM-dd')
      })
    }
  }

  function handlePayment(event: any) {
    setAppointmentCalendarModal({
      ...appointmentCalendarModal,
      payment: {
        modal: true,
        title: `${event.event.extendedProps.userFirstName} ${
          event.event.extendedProps.userLastName
        }~${event.event.extendedProps.services.reduce(
          (acc: number, amount: any) => {
            return acc + amount.price
          },
          0
        )}~${event.event.extendedProps.appointmentId}`
      }
    })
  }

  function handleClose() {
    setAppointmentCalendarModal({
      update: false,
      create: false,
      payment: {
        modal: false,
        title: ''
      }
    })

    setAppointmentsCalendarData({
      masterId: '',
      userId: '',
      serviceIds: [],
      appointmentStatus: {
        label: 'Оброботке',
        value: 'IN_PROCESSING'
      },
      startDate: '',
      startTime: '',
      endTime: '',
      description: ''
    })
  }

  // ----------------------------------------------------------------------------

  return (
    <div>
      <Backdrop sx={isLoadingSx} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <CreateAppointment
        appointmentsCalendarData={appointmentsCalendarData}
        setAppointmentsCalendarData={setAppointmentsCalendarData}
        handleClose={handleClose}
        appointmentCalendarModal={appointmentCalendarModal}
      />
      <Payment
        handleClose={handleClose}
        appointmentCalendarModal={appointmentCalendarModal}
      />
      <FullCalendar
        ref={calendarRef}
        datesSet={event => handleThisMoment(event)}
        select={e => handleChangeSelectedDate(e)}
        eventClick={e => handleChangeEventClick(e)}
        // views={{
        //   masterView: {
        //     type: 'custom',
        //     content: (e: any) => {
        //       return (
        //         <MasterViews
        //           handleChangeEventClick={handleChangeEventClick}
        //           setAppointmentCalendarModal={setAppointmentCalendarModal}
        //           setMasterViewsModal={setMasterViewsModal}
        //           setAppointmentDataView={setAppointmentDataView}
        //           appointmentDataMasterView={appointmentDataMasterView}
        //           dataCalendar={dataCalendar?.filter(
        //             (item: any) =>
        //               item.startTime.split('T')[0] ===
        //               e.dateProfile.currentDate.toISOString().split('T')[0]
        //           )}
        //         />
        //       )
        //     }
        //   }
        // }}
        // eventDrop={e => handleChangeDragAndDrop(e)}
        eventContent={event => {
          return <EventContent handlePayment={handlePayment} info={event} />
        }}
        events={CalendarData?.map((item: IResCalendar) => ({
          ...item,
          start: item.startTime,
          end: item.endTime,
          title: `${item.masterFirstName}\u00A0${item.masterLastName}`,
          backgroundColor: AppointmentStatusColor(item.appointmentStatus),
          borderColor: AppointmentStatusColor(item.appointmentStatus)
        }))}
        {...configCalendar({ calendarRef, search: search?.split('=')[1] })}
      />
    </div>
  )
}
