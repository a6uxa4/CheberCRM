import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { NextUIProvider } from '@nextui-org/react'
import App from './App.tsx'
import './css/index.css'
import { store } from './store/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </Provider>
  </BrowserRouter>
)
