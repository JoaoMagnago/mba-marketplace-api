import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeSeller } from 'test/factories/make-seller'
import { InMemorySellersRepository } from 'test/repositories/in-memory-sellers-repository'
import { AuthenticateSellerUseCase } from './authenticate-seller'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

let inMemorySellersRepository: InMemorySellersRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter

let sut: AuthenticateSellerUseCase

describe('Authenticate Seller', () => {
  beforeEach(() => {
    inMemorySellersRepository = new InMemorySellersRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateSellerUseCase(inMemorySellersRepository, fakeHasher, fakeEncrypter)
  })

  it('should be able to authenticate a seller', async () => {
    const seller = makeSeller({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456')
    })

    inMemorySellersRepository.items.push(seller)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String)
    })
  })

  it('should not be able to authenticate a seller with wrong credentials', async () => {
    const seller = makeSeller({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456')
    })

    inMemorySellersRepository.items.push(seller)

    const wrongEmailResult = await sut.execute({
      email: 'johndoe1@example.com',
      password: '123456'
    })

    expect(wrongEmailResult.isLeft()).toBe(true)
    expect(wrongEmailResult.value).toBeInstanceOf(WrongCredentialsError)

    const wrongPasswordResult = await sut.execute({
      email: 'johndoe@example.com',
      password: '1234567'
    })

    expect(wrongPasswordResult.isLeft()).toBe(true)
    expect(wrongPasswordResult.value).toBeInstanceOf(WrongCredentialsError)
  })
})
