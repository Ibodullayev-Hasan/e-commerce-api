import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Product } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }


  // new product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const { category_id, ...productData } = createProductDto;

      const category = await this.categoryRepository.findOne({ where: { id: category_id } });

      if (!category) throw new NotFoundException(`Not found category_id: ${createProductDto.category_id}`)

      const existingProduct = await this.productRepository.findOne({
        where: {
          name: createProductDto.name,
          category: category
        }
      })

      if (existingProduct) throw new ConflictException(`Existing product`)

        const newProduct = this.productRepository.create({
          ...productData,
          category: { id: category.id }  
        });
        

      return await this.productRepository.save(newProduct)
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST)
    }
  }

  // all products
  async findAll(): Promise<Product[]> {
    try {
      const products: Product[] = await this.productRepository.find({
        relations: {
          category: true
        }
      })

      return products
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const products: Product = await this.productRepository.findOne({
        where: { id },
        relations: {
          category: true
        }
      })

      if (!products) throw new NotFoundException(`Not found products`)

      return products
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<string> {
    try {
      const product: Product = await this.productRepository.findOne({ where: { id } })
      if (!product) throw new NotFoundException('Not found product')

      if (!Object.keys(updateProductDto).length) {
        throw new BadRequestException(`Yangilash uchun biror maydon kiritish zarur`);
      }

      const { affected } = await this.productRepository.update(id, updateProductDto)

      return affected && affected > 0 ? 'Muvaffaqiyatli yangilandi' : 'Yangilash amalga oshmadi';
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string) {
    try {
      const product: Product = await this.productRepository.findOne({ where: { id } })
      if (!product) throw new NotFoundException('Not found product')

      const { affected } = await this.productRepository.delete(id)

      return affected && affected > 0 ? `Muvaffaqiyatli o'chirildi` : `O'chirish amalga oshmadi`;
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST)
    }
  }
}
