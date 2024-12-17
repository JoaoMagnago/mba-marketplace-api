import { Seller } from "../../enterprise/entities/seller";

export abstract class SellersRepository {
  abstract create(seller: Seller): Promise<void>
  abstract findByEmail(email: string): Promise<Seller | null>
  abstract findByPhone(phone: string): Promise<Seller | null>
}