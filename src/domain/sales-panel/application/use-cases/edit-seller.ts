import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/generic-errors/resource-not-found-error";
import { Injectable } from "@nestjs/common";
import { Seller } from "../../enterprise/entities/seller";
import { SellersRepository } from "../repositories/sellers-repository";
import { SellerAlreadyExistsError } from "./errors/seller-already-exists-error";

interface EditSellerUseCaseRequest {
  sellerId: string
  name: string
  email: string
  password: string
  phone: string
}

type EditSellerUseCaseResponse = Either<
  ResourceNotFoundError | SellerAlreadyExistsError,
  { seller: Seller }
>

@Injectable()
export class EditSellerUseCase {
  constructor(private sellersRepository: SellersRepository) { }

  async execute({
    sellerId,
    name,
    email,
    password,
    phone
  }: EditSellerUseCaseRequest): Promise<EditSellerUseCaseResponse> {
    const seller = await this.sellersRepository.findById(sellerId)

    if (!seller) {
      return left(new ResourceNotFoundError())
    }

    const sellerWithSameEmail = await this.sellersRepository.findByEmail(email)

    if (sellerWithSameEmail) {
      return left(new SellerAlreadyExistsError(email, 'email'))
    }

    const sellerWithSamePhone = await this.sellersRepository.findByPhone(phone)

    if (sellerWithSamePhone) {
      return left(new SellerAlreadyExistsError(phone, 'phone'))
    }


    seller.name = name
    seller.email = email
    seller.password = password
    seller.phone = phone

    await this.sellersRepository.save(seller)

    return right({ seller })
  }
}