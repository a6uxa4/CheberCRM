import { FormatterInput } from '@fullcalendar/core'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { CalendarConfigProps } from '../../common/calendar.common'

export const isLoadingSx = {
  color: '#fff',
  zIndex: (theme: any) => theme.zIndex.drawer + 1
}

export function AppointmentStatusColor(type: string) {
  switch (type) {
    case 'IN_PROCESSING':
      return '#e59560'
    case 'CONFIRMED':
      return '#5a8100'
    case 'ARRIVE':
      return '#647295'
    case 'COMPLETED':
      return '#FF6347'
    case 'CANCELED':
      return '#d05663'
  }
}

export const configCalendar = ({
  calendarRef,
  search
}: CalendarConfigProps) => {
  function handleClickMaster() {
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView('masterView')
    }
  }
  return {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    customButtons: {
      myCustomButton: {
        text: 'Мастера',
        click: handleClickMaster
      }
    },
    headerToolbar: {
      left: 'prev,dayGridMonth,timeGridWeek,myCustomButton',
      center: 'title',
      right: 'today,timeGridDay,listWeek,next'
    },
    selectable: true,
    allDaySlot: false,
    dayMaxEvents: true,
    fixedWeekCount: false,
    eventStartEditable: true,
    eventDurationEditable: false,
    moreLinkContent: (el: any) => `${el.shortText} Еще`,
    buttonText: {
      today: 'Сегодня',
      day: 'День',
      month: 'Месяц',
      week: 'Неделя',
      list: 'Список'
    },
    initialView: search,
    noEventsText: 'Нет Записей',
    locale: 'ru',
    firstDay: 1,
    height: '100vh',
    slotMinTime: '09:00',
    slotMaxTime: '23:00',
    eventTimeFormat: { hour: 'numeric', minute: '2-digit' } as FormatterInput
  }
}
