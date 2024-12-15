import { SellersRepository } from "@/domain/sales-panel/application/repositories/sellers-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaSellersRepository } from "./prisma/repositories/prisma-sellers-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: SellersRepository,
      useClass: PrismaSellersRepository,
    },
  ],
  exports: [
    PrismaService,
    SellersRepository
  ],
})
export class DatabaseModule { }