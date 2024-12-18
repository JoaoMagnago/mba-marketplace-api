import { Injectable } from "@nestjs/common";
// import { PrismaSellerMapper } from "../mappers/prisma-seller-mapper";
import { SellersRepository } from "@/domain/sales-panel/application/repositories/sellers-repository";
import { Seller } from "@/domain/sales-panel/enterprise/entities/seller";
import { PrismaSellerMapper } from "../mappers/prisma-seller-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaSellersRepository implements SellersRepository {
  constructor(private prisma: PrismaService) { }

  async create(seller: Seller): Promise<void> {
    const data = PrismaSellerMapper.toPrisma(seller)

    await this.prisma.user.create({
      data,
    })
  }

  async findByEmail(email: string): Promise<Seller | null> {
    const seller = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!seller) {
      return null
    }

    return PrismaSellerMapper.toDomain(seller)
  }

  async findByPhone(phone: string): Promise<Seller | null> {
    const seller = await this.prisma.user.findUnique({
      where: {
        phone
      }
    })

    if (!seller) {
      return null
    }

    return PrismaSellerMapper.toDomain(seller)
  }
} 