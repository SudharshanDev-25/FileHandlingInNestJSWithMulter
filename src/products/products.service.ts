/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(dto: CreateProductDto, files: any): Promise<Product> {
    const product = new this.productModel({
      name: dto.name,
      description: dto.description,
      image: files?.image?.[0]?.filename,
      document: files?.document?.[0]?.filename,
      video: files?.video?.[0]?.filename,
      audio: files?.audio?.[0]?.filename,
    });

    return product.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find();
  }
}
