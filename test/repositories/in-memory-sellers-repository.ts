// import { DomainEvents } from '@/core/events/domain-events'

import { SellersRepository } from "@/domain/sales-panel/application/repositories/sellers-repository"
import { Seller } from "@/domain/sales-panel/enterprise/entities/seller"

export class InMemorySellersRepository implements SellersRepository {
  public items: Seller[] = []

  async create(seller: Seller) {
    this.items.push(seller)

    // DomainEvents.dispatchEventsForAggregate(seller.id)
  }

  async save(seller: Seller) {
    const itemIndex = this.items.findIndex((item) => item.id === seller.id)

    this.items[itemIndex] = seller
  }

  async findById(id: string) {
    const seller = this.items.find((item) => item.id.toString() === id)

    if (!seller) {
      return null
    }

    return seller
  }

  async findByEmail(email: string) {
    const seller = this.items.find((item) => item.email === email)

    if (!seller) {
      return null
    }

    return seller
  }

  async findByPhone(phone: string) {
    const seller = this.items.find((item) => item.phone === phone)

    if (!seller) {
      return null
    }

    return seller
  }
}
