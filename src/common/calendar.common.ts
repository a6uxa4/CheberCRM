import FullCalendar from '@fullcalendar/react'
import { RefObject } from 'react'

export interface CalendarThisDataProps {
  endStr: string
  startStr: string
  view: any
}

export interface CalendarConfigProps {
  calendarRef: RefObject<FullCalendar>
  search: string
}

export interface IGetCalendarProps {
  startTime: string
  endTime: string
  masterId: number[]
}

export interface IResCalendar {
  appointmentId: number
  startTime: string
  endTime: string
  description: string
  appointmentStatus: string
  userId: number
  userFirstName: string
  userLastName: string
  userPhoneNumber: string
  masterId: number
  masterFirstName: string
  masterLastName: string
  services: {
    id: number
    name: string
    price: number
    duration: number
  }[]
}
