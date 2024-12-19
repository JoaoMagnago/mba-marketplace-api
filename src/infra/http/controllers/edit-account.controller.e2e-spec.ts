import { AppModule } from "@/infra/app.module"
import { DatabaseModule } from "@/infra/database/database.module"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import { INestApplication } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { SellerFactory } from "test/factories/make-seller"

describe('Edit account (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let sellerFactory: SellerFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [SellerFactory]
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    sellerFactory = moduleRef.get(SellerFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })
  test('[PUT] /accounts/:id', async () => {
    const user = await sellerFactory.makePrismaSeller()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const userId = user.id

    const response = await request(app.getHttpServer())
      .put(`/accounts/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        phone: '(12) 99999-9999'
      })

    console.log(response.body)

    expect(response.statusCode).toBe(204)

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'johndoe@example.com'
      }
    })

    expect(userOnDatabase).toBeTruthy()
  })
})