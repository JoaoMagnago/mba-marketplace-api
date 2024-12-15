// import { SellerAlreadyExistsError } from '@/domain/forum/application/use-cases/errors/seller-already-exists-error'
// import { RegisterSellerUseCase } from '@/domain/forum/application/use-cases/register-seller'
// import { Public } from '@/infra/auth/public'
// import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  // BadRequestException,
  // Body,
  // ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
// import { z } from 'zod'

// const createAccountBodySchema = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   password: z.string(),
// })

// type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
// @Public()
export class CreateAccountController {
  constructor(
    // private registerSeller: RegisterSellerUseCase
  ) { }

  @Post()
  @HttpCode(201)
  // @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(
    // @Body() body: CreateAccountBodySchema
  ) {
    // const { name, email, password } = body

    // const result = await this.registerSeller.execute({
    //   name,
    //   email,
    //   password,
    // })

    // if (result.isLeft()) {
    //   const error = result.value

    //   switch (error.constructor) {
    //     case SellerAlreadyExistsError:
    //       throw new ConflictException(error.message)
    //     default:
    //       throw new BadRequestException(error.message)
    //   }
    // }
  }
}
