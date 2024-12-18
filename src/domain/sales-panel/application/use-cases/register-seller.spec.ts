import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemorySellersRepository } from 'test/repositories/in-memory-sellers-repository'
import { SellerAlreadyExistsError } from './errors/seller-already-exists-error'
import { RegisterSellerUseCase } from './register-seller'

let inMemorySellersRepository: InMemorySellersRepository
let fakeHasher: FakeHasher

let sut: RegisterSellerUseCase

describe('Register Seller', () => {
  beforeEach(() => {
    inMemorySellersRepository = new InMemorySellersRepository()
    fakeHasher = new FakeHasher()

    sut = new RegisterSellerUseCase(inMemorySellersRepository, fakeHasher)
  })

  it('should be able to register a new seller', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '(12) 99979-6789'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      seller: inMemorySellersRepository.items[0]
    })
  })

  it('should not be able to register two sellers with same email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '(12) 99979-6789'
    })

    const response = await sut.execute({
      name: 'John Doe 2',
      email: 'johndoe@example.com',
      password: '1234567',
      phone: '(12) 99979-1234'
    })

    expect(response.value).toBeInstanceOf(SellerAlreadyExistsError)
  })

  it('should not be able to register two sellers with same phone', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '(12) 99979-6789'
    })

    const response = await sut.execute({
      name: 'John Doe 2',
      email: 'johndoe2@example.com',
      password: '1234567',
      phone: '(12) 99979-6789'
    })

    expect(response.value).toBeInstanceOf(SellerAlreadyExistsError)
  })

  it('should be hash seller password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '(12) 99979-6789'
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemorySellersRepository.items[0].password).toEqual(hashedPassword)
  })
})
