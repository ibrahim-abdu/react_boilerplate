
import { type UserService, type AuthService } from '../services'
import type * as i18next from 'i18next'

export default interface AppDependenciesProps {
  userService: UserService
  authService: AuthService
  translation: i18next.i18n
}

// export type AppProps = RouteComponentProps;
