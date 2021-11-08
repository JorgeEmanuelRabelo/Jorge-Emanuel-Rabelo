import { HttpPostClient } from './protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  test('Chamar HttpPostClient com a URL', async () => {
    class HttpPostClientSpy implements HttpPostClient {
            url?: string
            async post (url: any): Promise<void> {
              this.url = url
              return await Promise.resolve()
            }
    }

    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
