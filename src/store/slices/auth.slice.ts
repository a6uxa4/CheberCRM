import { createSlice } from '@reduxjs/toolkit'

import {
  getUserFromStorage,
  removeUserFromStorage,
  saveUserToStorage
} from '../../utils/helpers/auth.helpers'
import { IInitialState } from '../../common/auth-interfaces/auth.interface'

const initialState: IInitialState = {
  user: getUserFromStorage() || null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload
      saveUserToStorage(action.payload)
    },
    logout: state => {
      state.user = null
      removeUserFromStorage()
    }
  }
})

export const authActions = authSlice.actions
export const authReducer = authSlice
