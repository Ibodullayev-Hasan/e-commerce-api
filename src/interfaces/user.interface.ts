import { Basket } from "src/basket/entities/basket.entity"

export interface IUser {
	id:string
	full_name:string
	email:string
	password:string
	role?:string
	basket:Basket
}