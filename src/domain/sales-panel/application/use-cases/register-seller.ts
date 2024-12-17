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
  }: RegisterSellerUseCaseRequest): Promise<RegisterSellerUseCaseResponse> {
    const sudentWithSameEmail = await this.sellersRepository.findByEmail(email)

    if (sudentWithSameEmail) {
      return left(new SellerAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const seller = Seller.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.sellersRepository.create(seller)

    return right({
      seller,
    })
  }
}
