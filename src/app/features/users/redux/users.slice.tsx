import { createSelector, createSlice } from '@reduxjs/toolkit'
import { type UserEntity } from '../types'
import { type ReduxState } from '../../../shared/types'
import { type RootState } from '../../../store'
import { fetchUserById } from './users.actions'

export interface UserStore {
  authState: string
  state: ReduxState
  data?: UserEntity
  currentUser?: UserEntity
  error?: any
}

const initialState: UserStore = {
  authState: 'none',
  state: 'inited'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.pending, (state) => {
      state.state = 'pending'
    })
    builder.addCase(fetchUserById.fulfilled, (state, { payload }) => {
      state.state = 'fulfilled'
      state.data = payload
    })
    builder.addCase(fetchUserById.rejected, (state) => {
      state.state = 'inited'
      state.data = undefined
    })
  }
})

export const selectUser = (state: RootState): UserStore => state.user
export const selectUserData = createSelector(selectUser, (user) => user.data)
export const selectUserLoading = createSelector(selectUser, (user) => user.state === 'pending')

export const userReducer = userSlice.reducer
