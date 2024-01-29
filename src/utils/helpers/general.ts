export const distinguishROLE = (
  distinguish: 'ADMIN' | 'SUPER_ADMIN' | 'OWNER'
) => {
  switch (distinguish) {
    case 'SUPER_ADMIN':
      return 0
    case 'OWNER':
      return 1
    case 'ADMIN':
      return 2
  }
}

export function translateAppointmentStatus(name: string) {
  switch (name) {
    case 'IN_PROCESSING':
      return 'В оброботке'
    case 'CONFIRMED':
      return 'Подтвержден'
    case 'ARRIVE':
      return 'Пришел'
    case 'COMPLETED':
      return 'Завершенный'
    case 'CANCELED':
      return 'Отменен'
    default:
      return 'Подтвержден'
  }
}

export function calculateEndTime(
  startTime: string,
  fullDuration: number
): string {
  const [startHours, startMinutes] = startTime.split(':').map(Number)
  let hours = Math.floor(fullDuration / 60)
  let minutes = fullDuration % 60
  let endHours = startHours + hours
  let endMinutes = startMinutes + minutes
  if (endMinutes >= 60) {
    endMinutes -= 60
    endHours++
  }
  const formattedEndHours = endHours.toString().padStart(2, '0')
  const formattedEndMinutes = endMinutes.toString().padStart(2, '0')
  const endTime = `${formattedEndHours}:${formattedEndMinutes}:00`
  return endTime
}

export const translateDuration = (time: number) => {
  const hour = Math.floor(time / 60)
  const minute = time % 60
  const formattedHour = hour.toString().padStart(2, '0')
  const formattedMinute = minute.toString().padStart(2, '0')
  if (hour !== 0) {
    return `${formattedHour}:${formattedMinute}`
  } else {
    return `${minute}мин`
  }
}
