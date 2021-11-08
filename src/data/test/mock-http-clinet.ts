import { HttpPostClient } from '../usercases/authentication/protocols/http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
    url?: string
    async post (url: any): Promise<void> {
      this.url = url
      return await Promise.resolve()
    }
}
