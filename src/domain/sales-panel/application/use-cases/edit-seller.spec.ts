import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeSeller } from 'test/factories/make-seller'
import { InMemorySellersRepository } from 'test/repositories/in-memory-sellers-repository'
import { EditSellerUseCase } from './edit-seller'
import { SellerAlreadyExistsError } from './errors/seller-already-exists-error'

let inMemorySellersRepository: InMemorySellersRepository
let fakeHasher: FakeHasher
let sut: EditSellerUseCase

describe('Edit Seller', () => {
  beforeEach(() => {
    inMemorySellersRepository = new InMemorySellersRepository()
    fakeHasher = new FakeHasher()

    sut = new EditSellerUseCase(
      inMemorySellersRepository,
    )
  })

  it('should be able to edit a seller', async () => {
    const newSeller = makeSeller(
      {},
      new UniqueEntityID('seller-1'),
    )

    await inMemorySellersRepository.create(newSeller)

    const sellerPassword = await fakeHasher.hash('123456')

    await sut.execute({
      sellerId: newSeller.id.toValue(),
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: sellerPassword,
      phone: '(11) 98899-9999'
    })

    expect(inMemorySellersRepository.items[0]).toMatchObject({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: sellerPassword,
      phone: '(11) 98899-9999'
    })
  })

  it('should not be able to edit a seller with an already registered email', async () => {
    const seller1 = makeSeller(
      {
        email: 'johndoe1@email.com',
      },
      new UniqueEntityID('seller-1'),
    )

    const seller2 = makeSeller(
      {
        email: 'johndoe2@email.com',
      },
      new UniqueEntityID('seller-2'),
    )

    await inMemorySellersRepository.create(seller1)
    await inMemorySellersRepository.create(seller2)

    const result = await sut.execute({
      sellerId: seller1.id.toValue(),
      name: seller1.name,
      email: 'johndoe2@email.com',
      password: seller1.password,
      phone: seller1.phone
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SellerAlreadyExistsError)
  })

  it('should not be able to edit a seller with an already registered phone', async () => {
    const seller1 = makeSeller(
      {
        phone: '(11) 98899-9999',
      },
      new UniqueEntityID('seller-1'),
    )

    const seller2 = makeSeller(
      {
        phone: '(12) 98899-9999',
      },
      new UniqueEntityID('seller-2'),
    )

    await inMemorySellersRepository.create(seller1)
    await inMemorySellersRepository.create(seller2)

    const result = await sut.execute({
      sellerId: seller1.id.toValue(),
      name: seller1.name,
      email: seller1.email,
      password: seller1.password,
      phone: '(12) 98899-9999'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(SellerAlreadyExistsError)
  })
})