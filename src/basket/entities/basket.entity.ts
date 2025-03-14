import { User } from "src/entities";
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BasketItem } from "./basketItem.entitie";

@Entity("basket")
export class Basket {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@OneToOne(() => User, (user) => user.basket, { onDelete: "CASCADE" })
	@JoinColumn({ name: 'user_id' })
	user: User;

	@OneToMany(() => BasketItem, (basketItem) => basketItem.basket)
	items: BasketItem[];
}
