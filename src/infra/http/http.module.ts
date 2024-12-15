import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'

import { RegisterSellerUseCase } from '@/domain/sales-panel/application/use-cases/register-seller'
import { CreateAccountController } from './controllers/create-account.controller'

@Module({
  imports: [DatabaseModule
    // , CryptographyModule, StorageModule
  ],
  controllers: [
    CreateAccountController,
  ],
  providers: [
    RegisterSellerUseCase
  ],
})
export class HttpModule { }