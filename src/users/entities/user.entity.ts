import { Basket } from "src/basket/entities/basket.entity";
import { UserRole } from "src/enums";
import { IUser } from "src/interfaces";
import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User implements IUser {

	@PrimaryGeneratedColumn("uuid")
	id: string

	@Column({ type: "text" })
	full_name: string;

	@Column({ type: "text", unique: true })
	email: string;

	@Column({ type: "text" })
	password: string;

	@Column({ type: "varchar", default: UserRole.USER })
	role?: string;

	@OneToOne(() => Basket, (basket) => basket.user, { onDelete: "CASCADE" })
	basket: Basket;

	@OneToMany(() => Order, (order) => order.user, { cascade: true })
	orders: Order[]; 

}
