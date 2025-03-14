import { Product, User } from 'src/entities';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';


@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.orders, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Product, product => product.orders)
  product: Product;

  @Column()
  quantity: number;

  @Column({ type: 'decimal' })
  total_price: number;

  @Column({ default: 'pending' }) // Status: pending, completed, cancelled
  status: string;
}
