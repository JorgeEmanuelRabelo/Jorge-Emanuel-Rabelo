import { AxiosHttpClient } from './axios-http-client'
import { mockAxios } from '@/infra/test'
import axios from 'axios'

type sutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

export const makeSutAxios = (): sutTypes => {
  return {
    sut: new AxiosHttpClient(),
    mockedAxios: mockAxios()
  }
}
