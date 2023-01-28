
import {UserService, AuthService} from '../services';
import * as i18next from 'i18next';

export default interface AppDependenciesProps {
  userService: UserService;
  authService: AuthService;
  translation: i18next.i18n;
}

// export type AppProps = RouteComponentProps;
