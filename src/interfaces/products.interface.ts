import { Basket } from "src/basket/entities/basket.entity"
import { Category } from "src/entities"

export interface IProduct {
	id: string
	name: string
	description: string
	price: number
	stock: number
	category: Category
	basket: Basket
	image?: string
}