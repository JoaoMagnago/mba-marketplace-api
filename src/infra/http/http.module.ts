import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'

import { AuthenticateSellerUseCase } from '@/domain/sales-panel/application/use-cases/authenticate-student'
import { RegisterSellerUseCase } from '@/domain/sales-panel/application/use-cases/register-seller'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule
    // , StorageModule
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
  ],
  providers: [
    RegisterSellerUseCase,
    AuthenticateSellerUseCase,
  ],
})
export class HttpModule { }