import { Module } from "@nestjs/common";

import { Encrypter } from "@/domain/sales-panel/application/cryptography/encrypter";
import { HashGenerator } from "@/domain/sales-panel/application/cryptography/hash-generator";
import { HashComparer } from "@/domain/sales-panel/application/cryptography/hasher-comparer";

import { BcryptHasher } from "./bcrypt-hasher";
import { JwtEncrypter } from "./jwt-encrypter";

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator]
})
export class CryptographyModule { }