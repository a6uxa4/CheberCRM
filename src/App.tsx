import { useActions } from './hooks/useActions'
import { getUserFromStorage } from './utils/helpers/auth.helpers'

function App() {
  const { logout } = useActions()

  console.log(import.meta.env.VITE_SERVER_URL)
  console.log(getUserFromStorage().role)

  return (
    <>
      HELLO THIS IS PROJECT FOR ADMIN CHEBER THIS ROLE{' '}
      {getUserFromStorage().role}
      <button onClick={() => logout()}>Remove</button>
    </>
  )
}

export default App
