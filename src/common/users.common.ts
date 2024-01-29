export interface IGetUsers {
  branchId: number
}

export interface IResUsers {
  id: number
  fullName: string
  phoneNumber: string
  avatar: string
  bonus: number
}

export interface IResUsersSelect {
  userId: number
  fullName: string
}
