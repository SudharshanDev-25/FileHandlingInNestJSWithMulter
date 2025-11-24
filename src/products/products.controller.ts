import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ProductService } from './products.service';
import { multerProductOptions } from './config/multer.config';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('save')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'document', maxCount: 1 },
        { name: 'video', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
      ],
      multerProductOptions,
    ),
  )
  create(@Body() dto: CreateProductDto, @UploadedFiles() files: any) {
    return this.productService.create(dto, files);
  }

  @Get('get')
  findAll() {
    return this.productService.findAll();
  }
}
