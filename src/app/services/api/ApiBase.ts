import { httpClient, type HttpClient } from '../api/httpClient'

class ApiBase {
  client: HttpClient

  constructor (client: HttpClient = httpClient) {
    this.client = client
  }
}

export { ApiBase }
