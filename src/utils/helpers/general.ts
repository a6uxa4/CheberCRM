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
