import { type ServiceResponse } from '../api'
import { type Users } from '../../models'

export interface UserService {
  getUsers: () => Promise<ServiceResponse<Users>>
}
