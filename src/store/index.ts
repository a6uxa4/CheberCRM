import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth.slice'

import companyService from '../services/company.service'
import branchService from '../services/branch.service'
import calendarService from '../services/calendar.service'
import userService from '../services/user.service'

export const store = configureStore({
  reducer: {
    auth: authReducer.reducer,
    [companyService.reducerPath]: companyService.reducer,
    [branchService.reducerPath]: branchService.reducer,
    [calendarService.reducerPath]: calendarService.reducer,
    [userService.reducerPath]: userService.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      companyService.middleware,
      branchService.middleware,
      calendarService.middleware,
      userService.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
