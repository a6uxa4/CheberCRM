import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth.slice'
import companyService from '../services/company.service'
import branchService from '../services/branch.service'

export const store = configureStore({
  reducer: {
    auth: authReducer.reducer,
    [companyService.reducerPath]: companyService.reducer,
    [branchService.reducerPath]: branchService.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      companyService.middleware,
      branchService.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
