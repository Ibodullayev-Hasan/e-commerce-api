import { BasketItem } from "src/basket/entities/basketItem.entitie";
import { Category } from "src/entities";
import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";

@Entity("products")
export class Product {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column({ type: "float", default: 0 })
	price: number;

	@Column()
	stock: number;

	@Column({ default: "https://example.com/image.jpg" })
	image?: string;

	@ManyToOne(() => Category, (category) => category.products, { onDelete: "CASCADE" })
	@JoinColumn({ name: "category_id" }) // Foreign key bog‘lanishi
	category: Category;

	@OneToMany(() => BasketItem, (basketItem) => basketItem.product)
	baskets: BasketItem[];

	@OneToMany(() => Order, (order) => order.product, { cascade: true })
	orders: Order[];
}
