import { AxiosHttpClient } from './axios-http-client'
import { mockAxios } from '@/infra/test'
import { mockPostResquest } from '@/data/test'
import axios from 'axios'

jest.mock('axios')

type sutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): sutTypes => {
  return {
    sut: new AxiosHttpClient(),
    mockedAxios: mockAxios()
  }
}

describe('AxiosHttpClient', () => {
  test('Testando valores corretor URL, verbo e body', async () => {
    const request = mockPostResquest()
    const { sut, mockedAxios } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Testando valores de retorno statusCode e body', () => {
    const { sut, mockedAxios } = makeSut()
    const promise = sut.post(mockPostResquest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
