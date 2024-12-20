import { RegisterSellerUseCase } from '@/domain/sales-panel/application/use-cases/register-seller';
import { Public } from '@/infra/auth/public';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';

import { SellerAlreadyExistsError } from '@/domain/sales-panel/application/use-cases/errors/seller-already-exists-error';
import { z } from 'zod';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(
    private registerSeller: RegisterSellerUseCase
  ) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(
    @Body() body: CreateAccountBodySchema
  ) {
    const { name, email, password, phone } = body

    const result = await this.registerSeller.execute({
      name,
      email,
      password,
      phone,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case SellerAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
