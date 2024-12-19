import { UseCaseError } from "@/core/errors/use-case-error";

export class SellerAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string, type: 'email' | 'phone') {
    super(`Seller ${type === 'phone' ? 'with phone' : ''} "${identifier}" already exists.`)
  }
}