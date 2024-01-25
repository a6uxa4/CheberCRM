import { getUserFromStorage } from './utils/helpers/auth.helpers'

function App() {
  console.log(import.meta.env.VITE_SERVER_URL)
  console.log(getUserFromStorage())
  return <>HELLO THIS IS PROJECT FOR ADMIN CHEBER</>
}

export default App
