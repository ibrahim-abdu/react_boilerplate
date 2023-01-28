import { type AxiosErrorSerialized } from 'axios'

export interface UserEntity {
  id?: number
  email?: string
  username?: string
}
export type ReduxError<T = any> = Partial<AxiosErrorSerialized<T>>
