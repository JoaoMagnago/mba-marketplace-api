import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Seller } from '../../enterprise/entities/seller'
import { HashGenerator } from '../cryptography/hash-generator'
import { SellersRepository } from '../repositories/sellers-repository'
import { SellerAlreadyExistsError } from './error/seller-already-exists-error'

interface RegisterSellerUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
}

type RegisterSellerUseCaseResponse = Either<
  SellerAlreadyExistsError,
  {
    seller: Seller
  }
>

@Injectable()
export class RegisterSellerUseCase {
  constructor(
    private sellersRepository: SellersRepository,
    private hashGenerator: HashGenerator
  ) { }

  async execute({
    name,
    email,
    password,
    phone,
  }: RegisterSellerUseCaseRequest): Promise<RegisterSellerUseCaseResponse> {
    const sellerWithSameEmail = await this.sellersRepository.findByEmail(email)
    const sellerWithSamePhone = await this.sellersRepository.findByPhone(phone)

    if (sellerWithSameEmail || sellerWithSamePhone) {
      return left(new SellerAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const seller = Seller.create({
      name,
      email,
      password: hashedPassword,
      phone
    })

    await this.sellersRepository.create(seller)

    return right({
      seller,
    })
  }
}
