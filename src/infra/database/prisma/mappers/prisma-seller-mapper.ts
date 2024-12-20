import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Seller } from "@/domain/sales-panel/enterprise/entities/seller";
import { Prisma, User as PrismaUser } from "@prisma/client";


export class PrismaSellerMapper {
  static toDomain(raw: PrismaUser): Seller {
    return Seller.create({
      name: raw.name,
      email: raw.email,
      password: raw.password,
      phone: raw.phone,
      createdAt: raw.createdAt,
    }, new UniqueEntityID(raw.id))
  }

  static toPrisma(seller: Seller): Prisma.UserUncheckedCreateInput {
    return {
      id: seller.id.toString(),
      name: seller.name,
      email: seller.email,
      password: seller.password,
      phone: seller.phone,
      createdAt: seller.createdAt,
    }
  }
}