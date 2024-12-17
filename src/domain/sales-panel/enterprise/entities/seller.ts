import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface SellerProps {
  name: string
  email: string
  password: string
  phone: string
}

export class Seller extends Entity<SellerProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get phone() {
    return this.props.phone
  }

  static create(props: SellerProps, id?: UniqueEntityID) {
    const seller = new Seller(props, id)

    return seller
  }
}
