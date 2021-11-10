import faker from 'faker'
import { HttpPostClientParams } from '../protocols/http'

export const mockPostResquest = (): HttpPostClientParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
