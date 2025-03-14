import { Product, User } from "src/entities"

export interface IBasket {
	id: string
	quantity: number
	user: User
	product: Product
}