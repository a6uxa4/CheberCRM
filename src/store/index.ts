import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth.slice'

import companyService from '../services/company.service'
import branchService from '../services/branch.service'
import calendarService from '../services/calendar.service'
import userService from '../services/user.service'
import masterService from '../services/master.service'
import serviceService from '../services/service.service'

export const store = configureStore({
  reducer: {
    auth: authReducer.reducer,
    [companyService.reducerPath]: companyService.reducer,
    [branchService.reducerPath]: branchService.reducer,
    [calendarService.reducerPath]: calendarService.reducer,
    [userService.reducerPath]: userService.reducer,
    [masterService.reducerPath]: masterService.reducer,
    [serviceService.reducerPath]: serviceService.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      companyService.middleware,
      branchService.middleware,
      calendarService.middleware,
      userService.middleware,
      masterService.middleware,
      serviceService.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
