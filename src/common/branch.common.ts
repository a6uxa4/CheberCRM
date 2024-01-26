export interface IResBranch {
  id: number
  phoneNumber: string
  address: string
  image: string
  rating: number
  domain: string
  main: true
}

export interface IResBranchAdmin {
  companyId: number
  companyName: string
  branchId: number
  address: string
  phoneNumber: string
  instagram: string
  image: string
  domain: string
}
