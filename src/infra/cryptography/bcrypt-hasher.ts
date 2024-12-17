import { HashGenerator } from "@/domain/sales-panel/application/cryptography/hash-generator";
import { HashComparer } from "@/domain/sales-panel/application/cryptography/hasher-comparer";
import { compare, hash } from "bcryptjs";

export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}