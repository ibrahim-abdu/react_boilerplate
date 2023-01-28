
interface EnvApi {
  base: string
}

export const IS_DEV = process.env.NODE_ENV === 'development'

const getEnvApi = (): EnvApi => {
  return {
    base: '/api/'
  }
}

export const ENV_API: EnvApi = getEnvApi()
