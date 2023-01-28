import { ApiBase } from '../../services/api/ApiBase'
import { API_ROUTES } from '../../services/api/constants'
import { type UserEntity } from './types'

class AuthController extends ApiBase {
  getUser = async (id: string): Promise<any> => await this.client.get<UserEntity>(API_ROUTES.userDetails(id))
}

export const authController = new AuthController()
