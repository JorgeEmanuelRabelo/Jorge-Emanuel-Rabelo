import { mockPostResquest } from '@/data/test'
import { makeSutAxios } from './make-sut-axios'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  test('Testando valores corretor URL, verbo e body', async () => {
    const request = mockPostResquest()
    const { sut, mockedAxios } = makeSutAxios()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Testando valores de retorno statusCode e body', () => {
    const { sut, mockedAxios } = makeSutAxios()
    const promise = sut.post(mockPostResquest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
