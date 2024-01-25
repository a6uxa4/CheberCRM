import Cookies from 'js-cookie'

export const USER_KEY = '@USER_AUTH'

const windowIsExists = () =>
  typeof window !== 'undefined' && window.localStorage

export const getUserFromStorage = () => {
  if (windowIsExists()) {
    const userCookie = Cookies.get(USER_KEY)
    return userCookie && JSON.parse(userCookie)
  }
  return null
}
