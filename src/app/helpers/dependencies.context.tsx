import React from 'react'
import type * as i18next from 'i18next'

import { UserServiceImpl, type UserService, type AuthService, AuthServiceImpl } from '../services'

import type AppDependenciesProps from './dependencies.props'
import i18n from './i18n'

const userService: UserService = new UserServiceImpl()
const authService: AuthService = new AuthServiceImpl()
const translation: i18next.i18n = i18n

export const getDependencies = (): AppDependenciesProps => {
  return {
    userService,
    translation,
    authService
  }
}

export const DIContext = React.createContext<AppDependenciesProps>(getDependencies())
