import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import faker from 'faker'
import { HttpPostClientParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockResponse = {
  data: faker.random.objectElement(),
  status: faker.random.number()
}
mockedAxios.post.mockResolvedValue(mockResponse)

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostResquest = (): HttpPostClientParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

describe('AxiosHttpClient', () => {
  test('Testando valores corretor URL, verbo e body', async () => {
    const request = mockPostResquest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Testando valores de retorno statusCode e body', async () => {
    const sut = makeSut()
    const httpResponse = await sut.post(mockPostResquest())
    expect(httpResponse).toEqual(
      {
        statusCode: mockResponse.status,
        body: mockResponse.data
      })
  })
})
