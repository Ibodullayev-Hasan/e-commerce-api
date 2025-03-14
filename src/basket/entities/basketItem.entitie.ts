import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Basket } from './basket.entity';
import { Product } from 'src/entities';

@Entity()
export class BasketItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Basket, (basket) => basket.items, { onDelete: 'CASCADE' })
  basket: Basket;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  product: Product;

  @Column({ default: 1 })
  quantity: number;
}
