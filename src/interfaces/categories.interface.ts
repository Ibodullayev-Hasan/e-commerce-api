import { Category, Product, User } from "src/entities"

export interface ICategories {
	id: string
	name: string
	description: string
	image?: string
	parent?: Category
	children: Category[]
	products:Product[]
}