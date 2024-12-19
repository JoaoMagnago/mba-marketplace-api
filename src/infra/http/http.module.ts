import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'

import { AuthenticateSellerUseCase } from '@/domain/sales-panel/application/use-cases/authenticate-seller'
import { EditSellerUseCase } from '@/domain/sales-panel/application/use-cases/edit-seller'
import { RegisterSellerUseCase } from '@/domain/sales-panel/application/use-cases/register-seller'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { EditAccountController } from './controllers/edit-account.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule
    // , StorageModule
  ],
  controllers: [
    AuthenticateController,
    EditAccountController,
    CreateAccountController,
  ],
  providers: [
    AuthenticateSellerUseCase,
    EditSellerUseCase,
    RegisterSellerUseCase,
  ],
})
export class HttpModule { }