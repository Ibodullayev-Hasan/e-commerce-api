import { Product } from "src/entities";
import { ICategories } from "src/interfaces/categories.interface";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category implements ICategories {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column({ default: "https://example.com/image.jpg" })
	image?: string;

	@ManyToOne(() => Category, (category) => category.children, { nullable: true, onDelete: 'CASCADE' })
	@JoinColumn({ name: 'parent_id' })
	parent?: Category;

	@OneToMany(() => Product, (product) => product.category)
	products: Product[];

	@OneToMany(() => Category, (category) => category.parent)
	children: Category[];
}
