import { Schema, model, Document } from 'mongoose';
import mongoose = require('mongoose');

export interface IProductModel extends Document {
  name: string,
  type: string,
  size: string,
  category: string,
  oldPrice: number,
  price: number
 }

let ProductSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  category: { type: String, required: true },
  oldPrice: { type: Number, min: 0 },
  price: { type: Number, required: true, min: 0 },
  images: [{ path: String }]
});

ProductSchema.set('timestamps', true);

ProductSchema.set('toJSON', {
  virtuals: true,
  transform: (doc: any, ret: any) => {
    delete ret.__v;
    delete ret._id;
    delete ret.id;
  }
});

const product = model<IProductModel>('Product', ProductSchema, 'Product');

export { product as Product }
