import { makeSutAuthentication } from './make-sut-authentication'
import { HttpStatusCode } from '@/data/protocols/http'
import { mockAccountModel, mockAuthentication, mockUrl } from '@/domain/test'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

describe('RemoteAuthentication', () => {
  test('Chamar HttpPostClient com a URL correta', async () => {
    const url = mockUrl.url
    const { sut, httpPostClientSpy } = makeSutAuthentication(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Chamar HttpPostClient com o body correto', async () => {
    const { sut, httpPostClientSpy } = makeSutAuthentication()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  test('Chamar HttpPostClient com credenciais invalidas retornando erro 401 (InvalidCredentialsError)', async () => {
    const { sut, httpPostClientSpy } = makeSutAuthentication()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Chamar HttpPostClient retornando erro 400 (UnexpectedError)', async () => {
    const { sut, httpPostClientSpy } = makeSutAuthentication()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Chamar HttpPostClient retornando erro 404 (UnexpectedError)', async () => {
    const { sut, httpPostClientSpy } = makeSutAuthentication()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Chamar HttpPostClient retornando erro 500 (UnexpectedError)', async () => {
    const { sut, httpPostClientSpy } = makeSutAuthentication()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Retornando AccountModel ao chamar HttpPostClient retornando 200', async () => {
    const { sut, httpPostClientSpy } = makeSutAuthentication()
    const httpResult = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.auth(mockAuthentication())
    expect(account).toEqual(httpResult)
  })
})
