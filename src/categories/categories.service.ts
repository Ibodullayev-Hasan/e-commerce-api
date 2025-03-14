import { BadRequestException,  HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {  Repository } from 'typeorm';
import { Category } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categorieRepository: Repository<Category>
  ) { }

  // create Category
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const { name, description, parent } = createCategoryDto;

      let parentCategory: Category | null = null;
      if (parent) {
        parentCategory = await this.categorieRepository.findOne({ where: { id: parent as unknown as string } });

        if (!parentCategory) throw new NotFoundException(`Parent category not found: ${parent}`);
      }

      const newCategory = this.categorieRepository.create({
        name,
        description,
        parent: parentCategory,
      });

      return await this.categorieRepository.save(newCategory);
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST)
    }
  }

  // get all categories
  async findAll(): Promise<{ categorys: Category[] }> {
    try {
      const categorys: Category[] = await this.categorieRepository.find({
        relations: {
          parent: true,
          children: true,
          products: true
        }
      })

      return { categorys: categorys }
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST)
    }
  }

  // get one categorie
  async findOne(id: string): Promise<object> {
    try {
      const category = await this.categorieRepository.findOne({
        where: { id },
        relations: {
          parent: true,
          children: true,
          products: true
        }
      })

      if (!category) throw new NotFoundException(`Not found category`)

      return {
        category: category
      }
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST)
    }
  }


  // update categorie
  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<string> {
    try {
      const category: Category = await this.categorieRepository.findOne({ where: { id } })
      if (!category) throw new NotFoundException('Not found category')

      if (!Object.keys(updateCategoryDto).length) {
        throw new BadRequestException(`Yangilash uchun biror maydon kiritish zarur`);
      }

      const { affected } = await this.categorieRepository.update(id, updateCategoryDto)

      return affected && affected > 0 ? 'Muvaffaqiyatli yangilandi' : 'Yangilash amalga oshmadi';
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const category: Category = await this.categorieRepository.findOne({ where: { id } })
      if (!category) throw new NotFoundException('Not found category')

      const { affected } = await this.categorieRepository.delete(id)

      return affected && affected > 0 ? `Muvaffaqiyatli o'chirildi` : `O'chirish amalga oshmadi`;
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST)
    }
  }
}
