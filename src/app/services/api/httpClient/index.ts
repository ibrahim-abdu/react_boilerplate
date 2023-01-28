import axios from 'axios'
import { ENV_API } from '../../../../env.config'
import { HttpClient } from './HttpClient'
export * from './HttpClient'

export const httpClient = new HttpClient({
  baseURL: ENV_API.base,
  API: axios.create()
})
