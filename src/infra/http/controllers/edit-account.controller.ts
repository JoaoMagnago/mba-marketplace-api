import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put
} from '@nestjs/common';

import { EditSellerUseCase } from '@/domain/sales-panel/application/use-cases/edit-seller';
import { SellerAlreadyExistsError } from '@/domain/sales-panel/application/use-cases/errors/seller-already-exists-error';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const editAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editAccountBodySchema)

type EditAccountBodySchema = z.infer<typeof editAccountBodySchema>

@Controller('/accounts/:id')
export class EditAccountController {
  constructor(
    private editSeller: EditSellerUseCase
  ) { }

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditAccountBodySchema,
    @Param('id') sellerId: string
  ) {
    const { name, email, password, phone } = body

    const result = await this.editSeller.execute({
      sellerId,
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
