import { type AxiosError, type AxiosErrorSerialized, type AxiosInstance, type AxiosPromise, type AxiosRequestConfig } from 'axios'
import { isNil } from 'lodash'
import pickBy from 'lodash/pickBy'
import queryString from 'query-string'

declare module 'axios' {
  export interface AxiosErrorSerialized<T = any> {
    response: {
      data?: T
      status?: number
    }
    message: string
  }

  export interface AxiosError {
    serialize: () => AxiosErrorSerialized
  }
}

interface HttpClientGlobalConfig {
  headers: Record<string, string>
}

const httpClientGlobalConfig: HttpClientGlobalConfig = {
  headers: {}
}

class HttpClient {
  private readonly baseURL: string

  private readonly API: AxiosInstance

  baseHeaders: Record<string, string> = {}

  constructor (obj: { API: AxiosInstance, baseURL: string }) {
    this.baseURL = obj.baseURL
    this.API = obj.API

    this.API.interceptors.response.use(
      (res) => res,
      (err) => {
        err.code = (Boolean(err.response)) && err.response.status.toString()
        if (err.response.status === 401 || err.response.status === 403) {
          // this is authentication error.
          // redirect to login page.
          if (window.location.pathname !== '/login-failed') {
            window.location.assign('/api/login?return=' + window.location.pathname)
          }
        }
        err.serialize = this.serializeError.bind(null, err)
        throw err
      }
    )
  }

  serializeError = (err: AxiosError): AxiosErrorSerialized => ({
    response: {
      data: err.response?.data,
      status: err.response?.status
    },
    message: err.message
  })

  getInterceptors = (): any => this.API.interceptors

  async get<T = any, Params extends object = object>(
    url: string,
    params?: Params,
    config: AxiosRequestConfig = {}
  ): AxiosPromise<T> {
    return await this.request({
      ...config,
      url,
      method: 'GET',
      params
    })
  }

  async post<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return await this.request({ ...config, url, method: 'POST', data })
  }

  async put<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return await this.request({ ...config, url, method: 'PUT', data })
  }

  patch = async <T extends Record<string, unknown> = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> => await this.request({
    ...config,
    url,
    data,
    method: 'PATCH'
  })

  async delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return await this.request({ ...config, url, method: 'DELETE' })
  }

  paramsSerializer = (_params: Record<string, unknown>): string => {
    const params = pickBy(_params, (val) => !!isNil(val) || val === 0 || val === false)
    return queryString.stringify(params as any)
  }

  private readonly isWithBaseURL = (url: string): boolean => url.startsWith('http')

  request = async (_obj: AxiosRequestConfig): Promise<any> => {
    const obj = _obj
    const { url = '' } = obj
    if (obj.paramsSerializer != null) { obj.paramsSerializer.serialize = this.paramsSerializer }

    obj.headers = {
      ...httpClientGlobalConfig.headers,
      ...obj.headers
    }

    const currentUrl = this.isWithBaseURL(url) ? url : this.baseURL + url

    return await this.API({ ...obj, url: currentUrl })
  }
}

export { HttpClient, httpClientGlobalConfig }
