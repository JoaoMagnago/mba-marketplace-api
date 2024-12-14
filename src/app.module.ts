import { Module } from '@nestjs/common';
import { PrismaService } from './infra/database/prisma/prisma.service';

@Module({
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
