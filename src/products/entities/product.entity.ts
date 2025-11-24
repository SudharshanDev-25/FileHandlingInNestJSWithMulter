import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  document: string;

  @Prop()
  video: string;

  @Prop()
  audio: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
