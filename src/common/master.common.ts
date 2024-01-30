export interface IResMasterSelect {
  masterId: number
  fullName: string
}

export interface IResMasterSchedule {
  startTime: string
  endTime: string
}

export interface IGetMasterSchedule {
  masterId: number
  appointmentDate: string
  serviceTime: number
}
