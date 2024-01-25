import { createSlice } from '@reduxjs/toolkit'
import {
  getUserFromStorage,
  removeUserFromStorage
} from '../../utils/helpers/auth.helpers'

const initialState: any = {
  user: getUserFromStorage() || null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null
      removeUserFromStorage()
    }
  }
})

export const authActions = authSlice.actions
export const authReducer = authSlice
