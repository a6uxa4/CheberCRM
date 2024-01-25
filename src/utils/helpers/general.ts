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
