import { createAsyncThunk } from '@reduxjs/toolkit'
import { type AxiosError } from 'axios'
import { authController } from '../auth.controller'
import { type UserEntity, type ReduxError } from '../types'

export const fetchUserById = createAsyncThunk<
UserEntity, string, { rejectValue: ReduxError }
>('users/fetchUserById', async (id, { dispatch, rejectWithValue }) => {
  try {
    const result = (await authController.getUser(id)).data
    return result
  } catch (e) {
    return rejectWithValue((e as AxiosError).serialize())
  }
})
