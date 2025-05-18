import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name:       { type: String, required: true },
  category:   { type: String, index: true },
  price:      { type: Number, required: true },
  image:      String
}, { timestamps: true });

export default model('Product', productSchema);