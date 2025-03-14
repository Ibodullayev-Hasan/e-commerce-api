import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Basket, BasketItem, Product } from 'src/entities';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket) private basketRepo: Repository<Basket>,
    @InjectRepository(BasketItem) private basketItemRepo: Repository<BasketItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) { }

  // Savatga mahsulot qo‘shish
  async addToBasket(createBasketDto: CreateBasketDto, userId: string) {
    const { productId, quantity } = createBasketDto;

    let basket = await this.basketRepo.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });

    if (!basket) {
      basket = this.basketRepo.create({ user: { id: userId }, items: [] });
      await this.basketRepo.save(basket);
    }

    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Mahsulot topilmadi');

    let basketItem = basket.items.find(item => item.product.id === productId);
    if (basketItem) {
      basketItem.quantity += quantity;
    } else {
      basketItem = this.basketItemRepo.create({ basket, product, quantity });
    }

    await this.basketItemRepo.save(basketItem);

    return { message: 'Mahsulot savatga qo‘shildi', basketItem };
  }

  // Foydalanuvchi savatini olish
  async getUserBasket(userId: string) {
    const basket = await this.basketRepo.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });

    if (!basket) throw new NotFoundException('Savat topilmadi');

    return { items: basket.items };
  }

  // Savatdagi mahsulot miqdorini yangilash
  async update(userId: string, basketItemId: string, updateBasketDto: UpdateBasketDto) {
    if (updateBasketDto.quantity < 1) {
      throw new BadRequestException('Miqdori 1 dan kam bo‘lishi mumkin emas');
    }

    // `Promise.all()` bilan ikkita so‘rovni parallel bajarish
    const [basket, basketItem] = await Promise.all([
      this.basketRepo.findOne({
        where: { user: { id: userId } },
        relations: ['items', 'items.product'],
      }),
      this.basketItemRepo.findOne({
        where: { id: basketItemId },
        relations: ['basket', 'product'], // `basket` bilan bog‘langan ma’lumotlarni ham olish
      }),
    ]);

    if (!basket) throw new NotFoundException('Savat topilmadi');
    if (!basketItem || basketItem.basket.id !== basket.id) {
      throw new NotFoundException('Savatda bunday mahsulot mavjud emas');
    }

    // **Eski miqdorga yangi miqdorni qo‘shish**
    basketItem.quantity += updateBasketDto.quantity;
    const updatedBasketItem = await this.basketItemRepo.save(basketItem);

    return {
      message: 'Mahsulot miqdori yangilandi',
      updatedItem: updatedBasketItem, // Yangilangan mahsulotni qaytarish
    };
  }


  // Savatdan mahsulotni o‘chirish
  async remove(userId: string, basketItemId: string) {
    const basket = await this.basketRepo.findOne({
      where: { user: { id: userId } },
      relations: ['items'],
    });

    if (!basket) throw new NotFoundException('Savat topilmadi');

    const basketItem = await this.basketItemRepo.findOne({
      where: { id: basketItemId, basket: { id: basket.id } },
    });

    if (!basketItem) throw new NotFoundException('Savatda bunday mahsulot mavjud emas');

    await this.basketItemRepo.remove(basketItem);

    return { message: 'Mahsulot savatdan olib tashlandi' };
  }

  // Savatni tozalash
  async clear(userId: string) {
    const basket = await this.basketRepo.findOne({
      where: { user: { id: userId } },
      relations: ['items'],
    });

    if (!basket) throw new NotFoundException('Savat topilmadi');

    if (basket.items.length === 0) throw new BadRequestException('Savat allaqachon bo‘sh');

    await this.basketItemRepo.remove(basket.items);

    return { message: 'Savat tozalandi' };
  }
}
